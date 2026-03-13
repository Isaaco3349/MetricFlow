"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKernelAccountV1 = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const index_js_1 = require("../../../actions/public/index.js");
const multisend_js_1 = require("../../utils/multisend.js");
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
async function createKernelAccountV1(client, { signer, address, entryPoint, index = 0n }) {
    const viemSigner = {
        ...signer,
        signTransaction: (_, __) => {
            throw new Error("Smart account signer doesn't need to sign transactions");
        }
    };
    const chainId = await (0, actions_1.getChainId)(client);
    const generateInitCode = async () => {
        return (0, viem_1.encodeFunctionData)({
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
    let accountAddress = address ??
        (await (async () => {
            const { factory, factoryData } = await getFactoryArgs();
            return await (0, index_js_1.getSenderAddress)(client, {
                factory,
                factoryData,
                entryPointAddress: entryPoint.address
            });
        })());
    if (!accountAddress)
        throw new Error("Account address not found");
    const account = (0, accounts_1.toAccount)({
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
        address: entryPoint?.address ?? account_abstraction_1.entryPoint06Address,
        abi: account_abstraction_1.entryPoint06Abi,
        version: entryPoint?.version ?? "0.6"
    };
    return (0, account_abstraction_1.toSmartAccount)({
        ...account,
        generateInitCode,
        encodeModuleInstallCallData: async () => {
            throw new Error("Not implemented");
        },
        nonceKeyManager: (0, viem_1.createNonceManager)({
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
            accountAddress = await (0, index_js_1.getSenderAddress)(client, {
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
            return (0, index_js_1.getAccountNonce)(client, {
                address: accountAddress,
                entryPointAddress: entryPoint.address
            });
        },
        async signUserOperation(userOperation) {
            const hash = (0, account_abstraction_1.getUserOperationHash)({
                userOperation: {
                    ...userOperation,
                    sender: userOperation.sender ?? (await this.getAddress()),
                    signature: "0x"
                },
                entryPointAddress: entryPoint.address,
                entryPointVersion: entryPoint.version,
                chainId: chainId
            });
            const signature = await (0, actions_1.signMessage)(client, {
                account: viemSigner,
                message: { raw: hash }
            });
            return signature;
        },
        async encodeCalls(calls, callType) {
            if (calls.length > 1) {
                if (callType === "delegatecall") {
                    throw new Error("Cannot batch delegatecall");
                }
                const multiSendCallData = (0, viem_1.encodeFunctionData)({
                    abi: multisend_js_1.multiSendAbi,
                    functionName: "multiSend",
                    args: [(0, multisend_js_1.encodeMultiSend)(calls)]
                });
                return (0, viem_1.encodeFunctionData)({
                    abi: executeAndRevertAbi,
                    functionName: "executeAndRevert",
                    args: [multisend_js_1.MULTISEND_ADDRESS, 0n, multiSendCallData, 1n]
                });
            }
            const call = calls.length === 0 ? undefined : calls[0];
            if (!call) {
                throw new Error("No calls to encode");
            }
            if (!callType || callType === "call") {
                if (call.to.toLowerCase() === accountAddress.toLowerCase()) {
                    return call.data || "0x";
                }
                return (0, viem_1.encodeFunctionData)({
                    abi: executeAndRevertAbi,
                    functionName: "executeAndRevert",
                    args: [call.to, call.value || 0n, call.data, 0n]
                });
            }
            if (callType === "delegatecall") {
                return (0, viem_1.encodeFunctionData)({
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
exports.createKernelAccountV1 = createKernelAccountV1;
//# sourceMappingURL=createKernelAccountV1.js.map