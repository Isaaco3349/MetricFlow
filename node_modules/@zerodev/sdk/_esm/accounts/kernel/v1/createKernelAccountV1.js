import { createNonceManager, encodeFunctionData } from "viem";
import { entryPoint06Abi, entryPoint06Address, getUserOperationHash, toSmartAccount } from "viem/account-abstraction";
import { toAccount } from "viem/accounts";
import { getChainId, signMessage } from "viem/actions";
import { getAccountNonce, getSenderAddress } from "../../../actions/public/index.js";
import { MULTISEND_ADDRESS, encodeMultiSend, multiSendAbi } from "../../utils/multisend.js";
const createAccountAbi = [
    {
        inputs: [
            { internalType: "address", name: "_owner", type: "address" },
            { internalType: "uint256", name: "_index", type: "uint256" }
        ],
        name: "createAccount",
        outputs: [
            {
                internalType: "contract EIP1967Proxy",
                name: "proxy",
                type: "address"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    }
];
const executeAndRevertAbi = [
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "value", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
            { internalType: "enum Operation", name: "operation", type: "uint8" }
        ],
        name: "executeAndRevert",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
const KERNEL_V1_ADDRESSES = {
    FACTORY_ADDRESS: "0x4E4946298614FC299B50c947289F4aD0572CB9ce",
    ENTRYPOINT_V0_6: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
};
export async function createKernelAccountV1(client, { signer, address, entryPoint, index = 0n }) {
    const viemSigner = {
        ...signer,
        signTransaction: (_, __) => {
            throw new Error("Smart account signer doesn't need to sign transactions");
        }
    };
    // Fetch chain id
    const chainId = await getChainId(client);
    const generateInitCode = async () => {
        return encodeFunctionData({
            abi: createAccountAbi,
            functionName: "createAccount",
            args: [signer.address, index]
        });
    };
    const getFactoryArgs = async () => {
        return {
            factory: KERNEL_V1_ADDRESSES.FACTORY_ADDRESS,
            factoryData: await generateInitCode()
        };
    };
    // Fetch account address and chain id
    let accountAddress = address ??
        (await (async () => {
            const { factory, factoryData } = await getFactoryArgs();
            // Get the sender address based on the init code
            return await getSenderAddress(client, {
                factory,
                factoryData,
                entryPointAddress: entryPoint.address
            });
        })());
    if (!accountAddress)
        throw new Error("Account address not found");
    const account = toAccount({
        address: accountAddress,
        async signMessage({ message }) {
            return viemSigner.signMessage({ message });
        },
        async signTransaction(_, __) {
            throw new Error("Smart account signer doesn't need to sign transactions");
        },
        async signTypedData(typedData) {
            return viemSigner.signTypedData(typedData);
        }
    });
    const _entryPoint = {
        address: entryPoint?.address ?? entryPoint06Address,
        abi: entryPoint06Abi,
        version: entryPoint?.version ?? "0.6"
    };
    return toSmartAccount({
        ...account,
        generateInitCode,
        encodeModuleInstallCallData: async () => {
            throw new Error("Not implemented");
        },
        nonceKeyManager: createNonceManager({
            source: { get: () => 0, set: () => { } }
        }),
        async sign({ hash }) {
            return account.signMessage({ message: hash });
        },
        async signMessage({ message }) {
            return account.signMessage({ message });
        },
        async signTypedData(typedData) {
            return viemSigner.signTypedData(typedData);
        },
        async getAddress() {
            if (accountAddress)
                return accountAddress;
            const { factory, factoryData } = await getFactoryArgs();
            // Get the sender address based on the init code
            accountAddress = await getSenderAddress(client, {
                factory,
                factoryData,
                entryPointAddress: entryPoint.address
            });
            return accountAddress;
        },
        getFactoryArgs,
        client,
        entryPoint: _entryPoint,
        async getNonce() {
            return getAccountNonce(client, {
                address: accountAddress,
                entryPointAddress: entryPoint.address
            });
        },
        async signUserOperation(userOperation) {
            const hash = getUserOperationHash({
                userOperation: {
                    ...userOperation,
                    sender: userOperation.sender ?? (await this.getAddress()),
                    signature: "0x"
                },
                entryPointAddress: entryPoint.address,
                entryPointVersion: entryPoint.version,
                chainId: chainId
            });
            const signature = await signMessage(client, {
                account: viemSigner,
                message: { raw: hash }
            });
            return signature;
        },
        // async getInitCode() {
        //     if (smartAccountDeployed) return "0x"
        //     smartAccountDeployed = await isSmartAccountDeployed(
        //         client,
        //         accountAddress
        //     )
        //     if (smartAccountDeployed) return "0x"
        //     return generateInitCode()
        // },
        async encodeCalls(calls, callType) {
            if (calls.length > 1) {
                if (callType === "delegatecall") {
                    throw new Error("Cannot batch delegatecall");
                }
                // Encode a batched call using multiSend
                const multiSendCallData = encodeFunctionData({
                    abi: multiSendAbi,
                    functionName: "multiSend",
                    args: [encodeMultiSend(calls)]
                });
                return encodeFunctionData({
                    abi: executeAndRevertAbi,
                    functionName: "executeAndRevert",
                    args: [MULTISEND_ADDRESS, 0n, multiSendCallData, 1n]
                });
            }
            const call = calls.length === 0 ? undefined : calls[0];
            if (!call) {
                throw new Error("No calls to encode");
            }
            // Default to `call`
            if (!callType || callType === "call") {
                if (call.to.toLowerCase() === accountAddress.toLowerCase()) {
                    return call.data || "0x";
                }
                return encodeFunctionData({
                    abi: executeAndRevertAbi,
                    functionName: "executeAndRevert",
                    args: [call.to, call.value || 0n, call.data, 0n]
                });
            }
            if (callType === "delegatecall") {
                return encodeFunctionData({
                    abi: executeAndRevertAbi,
                    functionName: "executeAndRevert",
                    args: [call.to, call.value || 0n, call.data, 1n]
                });
            }
            throw new Error("Invalid call type");
        },
        async getStubSignature() {
            return "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
        }
    });
}
//# sourceMappingURL=createKernelAccountV1.js.map