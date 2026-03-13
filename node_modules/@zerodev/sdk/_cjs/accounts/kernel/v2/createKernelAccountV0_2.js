"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKernelAccountV0_2 = exports.KERNEL_ADDRESSES = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const index_js_1 = require("../../../actions/public/index.js");
const constants_js_1 = require("../../../constants.js");
const multisend_js_1 = require("../../utils/multisend.js");
const toKernelPluginManager_js_1 = require("../../utils/toKernelPluginManager.js");
const KernelAccountV2Abi_js_1 = require("./abi/KernelAccountV2Abi.js");
const KernelFactoryV2Abi_js_1 = require("./abi/KernelFactoryV2Abi.js");
const createCallAddress = "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
const createCallAbi = (0, viem_1.parseAbi)([
    "function performCreate(uint256 value, bytes memory deploymentData) public returns (address newContract)",
    "function performCreate2(uint256 value, bytes memory deploymentData, bytes32 salt) public returns (address newContract)"
]);
exports.KERNEL_ADDRESSES = {
    FACTORY_ADDRESS: "0xaee9762ce625e0a8f7b184670fb57c37bfe1d0f1",
    ENTRYPOINT_V0_6: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
};
const getAccountInitCode = async ({ index, factoryAddress, validatorAddress, enableData }) => {
    return (0, viem_1.concatHex)([
        factoryAddress,
        (0, viem_1.encodeFunctionData)({
            abi: KernelFactoryV2Abi_js_1.KernelFactoryV2Abi,
            functionName: "createAccount",
            args: [validatorAddress, enableData, index]
        })
    ]);
};
async function createKernelAccountV0_2(client, { plugins, entryPoint, index = 0n, factoryAddress = exports.KERNEL_ADDRESSES.FACTORY_ADDRESS, address }) {
    const kernelPluginManager = (0, toKernelPluginManager_js_1.isKernelPluginManager)(plugins)
        ? plugins
        : await (0, toKernelPluginManager_js_1.toKernelPluginManager)(client, {
            sudo: plugins.sudo,
            regular: plugins.regular,
            action: plugins.action,
            pluginEnableSignature: plugins.pluginEnableSignature,
            kernelVersion: "0.0.2",
            entryPoint
        });
    const generateInitCode = async () => {
        const validatorInitData = await kernelPluginManager.getValidatorInitData();
        return getAccountInitCode({
            index,
            factoryAddress,
            validatorAddress: validatorInitData.validatorAddress,
            enableData: validatorInitData.enableData
        });
    };
    const getFactoryArgs = async () => {
        return {
            factory: factoryAddress,
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
    const account = (0, accounts_1.toAccount)({
        address: accountAddress,
        async signMessage({ message }) {
            return kernelPluginManager.signMessage({
                message
            });
        },
        async signTransaction(_, __) {
            throw new Error("Smart account signer doesn't need to sign transactions");
        },
        async signTypedData(typedData) {
            const _typedData = typedData;
            const types = {
                EIP712Domain: (0, viem_1.getTypesForEIP712Domain)({
                    domain: _typedData.domain
                }),
                ..._typedData.types
            };
            (0, viem_1.validateTypedData)({
                domain: _typedData.domain,
                message: _typedData.message,
                primaryType: _typedData.primaryType,
                types: types
            });
            const typedHash = (0, viem_1.hashTypedData)(typedData);
            return kernelPluginManager.signMessage({
                message: {
                    raw: typedHash
                }
            });
        }
    });
    const _entryPoint = {
        address: entryPoint?.address ?? account_abstraction_1.entryPoint06Address,
        abi: account_abstraction_1.entryPoint06Abi,
        version: entryPoint?.version ?? "0.6"
    };
    let chainId;
    const getMemoizedChainId = async () => {
        if (chainId)
            return chainId;
        chainId = client.chain
            ? client.chain.id
            : await (0, utils_1.getAction)(client, actions_1.getChainId, "getChainId")({});
        return chainId;
    };
    return (0, account_abstraction_1.toSmartAccount)({
        kernelVersion: "0.0.2",
        client,
        entryPoint: _entryPoint,
        kernelPluginManager,
        factoryAddress,
        accountImplementationAddress: constants_js_1.KernelVersionToAddressesMap["0.0.2"].accountImplementationAddress,
        generateInitCode,
        encodeModuleInstallCallData: async () => {
            return await kernelPluginManager.encodeModuleInstallCallData(accountAddress);
        },
        nonceKeyManager: (0, viem_1.createNonceManager)({
            source: { get: () => 0, set: () => { } }
        }),
        async sign({ hash }) {
            return account.signMessage({ message: hash });
        },
        async signMessage(message) {
            return account.signMessage(message);
        },
        async signTypedData(typedData) {
            return account.signTypedData(typedData);
        },
        getFactoryArgs,
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
        async getNonce(_args) {
            const key = await kernelPluginManager.getNonceKey(accountAddress, _args?.key);
            return (0, index_js_1.getAccountNonce)(client, {
                address: accountAddress,
                entryPointAddress: entryPoint.address,
                key
            });
        },
        async signUserOperation(parameters) {
            const { chainId = await getMemoizedChainId(), ...userOperation } = parameters;
            return kernelPluginManager.signUserOperation({
                ...userOperation,
                sender: userOperation.sender ?? (await this.getAddress()),
                chainId
            });
        },
        async encodeDeployCallData(_tx) {
            return (0, viem_1.encodeFunctionData)({
                abi: KernelAccountV2Abi_js_1.KernelAccountV2Abi,
                functionName: "execute",
                args: [
                    createCallAddress,
                    0n,
                    (0, viem_1.encodeFunctionData)({
                        abi: createCallAbi,
                        functionName: "performCreate",
                        args: [
                            0n,
                            (0, viem_1.encodeDeployData)({
                                abi: _tx.abi,
                                bytecode: _tx.bytecode,
                                args: _tx.args
                            })
                        ]
                    }),
                    1
                ]
            });
        },
        async encodeCalls(calls, callType) {
            if (calls.length > 1) {
                const multiSendCallData = (0, viem_1.encodeFunctionData)({
                    abi: multisend_js_1.multiSendAbi,
                    functionName: "multiSend",
                    args: [(0, multisend_js_1.encodeMultiSend)(calls)]
                });
                return (0, viem_1.encodeFunctionData)({
                    abi: KernelAccountV2Abi_js_1.KernelAccountV2Abi,
                    functionName: "execute",
                    args: [multisend_js_1.MULTISEND_ADDRESS, 0n, multiSendCallData, 1]
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
                    abi: KernelAccountV2Abi_js_1.KernelAccountV2Abi,
                    functionName: "execute",
                    args: [call.to, call.value || 0n, call.data || "0x", 0]
                });
            }
            if (callType === "delegatecall") {
                return (0, viem_1.encodeFunctionData)({
                    abi: KernelAccountV2Abi_js_1.KernelAccountV2Abi,
                    functionName: "execute",
                    args: [call.to, 0n, call.data || "0x", 1]
                });
            }
            throw new Error("Invalid call type");
        },
        async getStubSignature(userOperation) {
            if (!userOperation) {
                throw new Error("No user operation provided");
            }
            return kernelPluginManager.getStubSignature(userOperation);
        }
    });
}
exports.createKernelAccountV0_2 = createKernelAccountV0_2;
//# sourceMappingURL=createKernelAccountV0_2.js.map