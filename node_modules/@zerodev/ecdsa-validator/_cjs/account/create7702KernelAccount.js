"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create7702KernelAccount = void 0;
const sdk_1 = require("@zerodev/sdk");
const accounts_1 = require("@zerodev/sdk/accounts");
const actions_1 = require("@zerodev/sdk/actions");
const constants_1 = require("@zerodev/sdk/constants");
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const actions_2 = require("viem/actions");
const utils_1 = require("viem/utils");
const toECDSAValidatorPlugin_js_1 = require("../toECDSAValidatorPlugin.js");
const getDefaultAddresses = (entryPointVersion, kernelVersion, { accountImplementationAddress, factoryAddress, metaFactoryAddress }) => {
    (0, sdk_1.validateKernelVersionWithEntryPoint)(entryPointVersion, kernelVersion);
    const addresses = constants_1.KernelVersionToAddressesMap[kernelVersion];
    if (!addresses) {
        throw new Error(`No addresses found for kernel version ${kernelVersion}`);
    }
    return {
        accountImplementationAddress: accountImplementationAddress ??
            addresses.accountImplementationAddress,
        factoryAddress: factoryAddress ?? addresses.factoryAddress,
        metaFactoryAddress: metaFactoryAddress ?? addresses.metaFactoryAddress ?? viem_1.zeroAddress
    };
};
async function create7702KernelAccount(client, { signer, plugins, entryPoint, accountImplementationAddress: _accountImplementationAddress, kernelVersion, pluginMigrations, eip7702Auth }) {
    const { accountImplementationAddress } = getDefaultAddresses(entryPoint.version, kernelVersion, {
        accountImplementationAddress: _accountImplementationAddress,
        factoryAddress: undefined,
        metaFactoryAddress: undefined
    });
    let chainId;
    let address;
    if (typeof signer === "object" && signer !== null && "account" in signer) {
        address = signer.account?.address;
    }
    const localAccount = await (0, sdk_1.toSigner)({ signer, address });
    const accountAddress = localAccount.address;
    const getMemoizedChainId = async () => {
        if (chainId)
            return chainId;
        chainId = client.chain
            ? client.chain.id
            : await (0, utils_1.getAction)(client, actions_2.getChainId, "getChainId")({});
        return chainId;
    };
    const kernelPluginManager = await (0, accounts_1.toKernelPluginManager)(client, {
        sudo: await (0, toECDSAValidatorPlugin_js_1.signerToEcdsaValidator)(client, {
            signer: localAccount,
            entryPoint,
            kernelVersion
        }),
        entryPoint,
        kernelVersion,
        chainId: await getMemoizedChainId()
    });
    const generateInitCode = async () => {
        return "0x";
    };
    const getFactoryArgs = async () => {
        return {
            factory: undefined,
            factoryData: undefined
        };
    };
    const signAuthorization = async () => {
        const code = await (0, actions_2.getCode)(client, { address: accountAddress });
        if (!code ||
            code.length === 0 ||
            !code
                .toLowerCase()
                .startsWith(`0xef0100${accountImplementationAddress.slice(2).toLowerCase()}`)) {
            if (eip7702Auth && !(0, viem_1.isAddressEqual)(eip7702Auth.address, accountImplementationAddress)) {
                throw new Error("EIP-7702 authorization delegate address does not match account implementation address");
            }
            const auth = eip7702Auth ?? await (0, actions_2.signAuthorization)(client, {
                account: localAccount,
                address: accountImplementationAddress,
                chainId: await getMemoizedChainId()
            });
            const verified = await (0, utils_1.verifyAuthorization)({
                authorization: auth,
                address: accountAddress
            });
            if (!verified) {
                throw new Error("Authorization verification failed");
            }
            return auth;
        }
        return undefined;
    };
    const _entryPoint = {
        address: entryPoint?.address ?? account_abstraction_1.entryPoint07Address,
        abi: ((entryPoint?.version ?? "0.7") === "0.6"
            ? account_abstraction_1.entryPoint06Abi
            : account_abstraction_1.entryPoint07Abi),
        version: entryPoint?.version ?? "0.7"
    };
    const pluginCache = {
        pendingPlugins: pluginMigrations || [],
        allInstalled: false
    };
    const checkPluginInstallationStatus = async () => {
        if (!pluginCache.pendingPlugins.length || pluginCache.allInstalled) {
            pluginCache.allInstalled = true;
            return;
        }
        const installationResults = await Promise.all(pluginCache.pendingPlugins.map((plugin) => (0, actions_1.isPluginInstalled)(client, {
            address: accountAddress,
            plugin
        })));
        pluginCache.pendingPlugins = pluginCache.pendingPlugins.filter((_, index) => !installationResults[index]);
        pluginCache.allInstalled = pluginCache.pendingPlugins.length === 0;
    };
    await checkPluginInstallationStatus();
    return (0, account_abstraction_1.toSmartAccount)({
        kernelVersion,
        kernelPluginManager,
        accountImplementationAddress,
        factoryAddress: undefined,
        generateInitCode,
        encodeModuleInstallCallData: async () => {
            return await kernelPluginManager.encodeModuleInstallCallData(accountAddress);
        },
        nonceKeyManager: (0, viem_1.createNonceManager)({
            source: { get: () => 0, set: () => { } }
        }),
        client,
        entryPoint: _entryPoint,
        getFactoryArgs,
        async getAddress() {
            return accountAddress;
        },
        signAuthorization,
        async encodeDeployCallData(_tx) {
            if (entryPoint.version === "0.6") {
                return (0, sdk_1.encodeDeployCallDataV06)(_tx);
            }
            return (0, sdk_1.encodeDeployCallDataV07)(_tx);
        },
        async encodeCalls(calls, callType) {
            await checkPluginInstallationStatus();
            if (pluginCache.pendingPlugins.length > 0 &&
                entryPoint.version === "0.7" &&
                kernelPluginManager.activeValidatorMode === "sudo") {
                const pluginInstallCalls = [];
                for (const plugin of pluginCache.pendingPlugins) {
                    pluginInstallCalls.push((0, accounts_1.getPluginInstallCallData)(accountAddress, plugin));
                }
                return (0, sdk_1.encodeCallDataEpV07)([...calls, ...pluginInstallCalls], callType, plugins?.hook ? true : undefined);
            }
            if (calls.length === 1 &&
                (!callType || callType === "call") &&
                calls[0].to.toLowerCase() === accountAddress.toLowerCase()) {
                return calls[0].data ?? "0x";
            }
            if (entryPoint.version === "0.6") {
                return (0, sdk_1.encodeCallDataEpV06)(calls, callType);
            }
            if (plugins?.hook) {
                return (0, sdk_1.encodeCallDataEpV07)(calls, callType, true);
            }
            return (0, sdk_1.encodeCallDataEpV07)(calls, callType);
        },
        async sign({ hash }) {
            return this.signMessage({ message: hash });
        },
        async signMessage({ message, useReplayableSignature }) {
            const messageHash = (0, viem_1.hashMessage)(message);
            const { name, chainId: metadataChainId, version } = await (0, sdk_1.accountMetadata)(client, accountAddress, kernelVersion, chainId);
            const wrappedMessageHash = await (0, sdk_1.eip712WrapHash)(messageHash, {
                name,
                chainId: Number(metadataChainId),
                version,
                verifyingContract: accountAddress
            }, useReplayableSignature);
            let signature = await kernelPluginManager.signMessage({
                message: { raw: wrappedMessageHash }
            });
            if (!(0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_WITH_VALIDATOR, version)) {
                return signature;
            }
            if (useReplayableSignature &&
                (0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_REPLAYABLE, version)) {
                signature = (0, viem_1.concatHex)([constants_1.MAGIC_VALUE_SIG_REPLAYABLE, signature]);
            }
            return (0, viem_1.concatHex)([kernelPluginManager.getIdentifier(), signature]);
        },
        async signTypedData(typedData) {
            const { message, primaryType, types: _types, domain } = typedData;
            const types = {
                EIP712Domain: (0, viem_1.getTypesForEIP712Domain)({
                    domain: domain
                }),
                ..._types
            };
            (0, viem_1.validateTypedData)({
                domain: domain,
                message: message,
                primaryType: primaryType,
                types: types
            });
            const typedHash = (0, viem_1.hashTypedData)(typedData);
            const { name, chainId: metadataChainId, version } = await (0, sdk_1.accountMetadata)(client, accountAddress, kernelVersion, chainId);
            const wrappedMessageHash = await (0, sdk_1.eip712WrapHash)(typedHash, {
                name,
                chainId: Number(metadataChainId),
                version,
                verifyingContract: accountAddress
            });
            const signature = await kernelPluginManager.signMessage({
                message: { raw: wrappedMessageHash }
            });
            if (!(0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_WITH_VALIDATOR, version)) {
                return signature;
            }
            return (0, viem_1.concatHex)([kernelPluginManager.getIdentifier(), signature]);
        },
        async getNonce(_args) {
            const key = await kernelPluginManager.getNonceKey(accountAddress, _args?.key);
            return (0, actions_1.getAccountNonce)(client, {
                address: accountAddress,
                entryPointAddress: entryPoint.address,
                key
            });
        },
        async getStubSignature(userOperation) {
            if (!userOperation) {
                throw new Error("No user operation provided");
            }
            return kernelPluginManager.getStubSignature(userOperation);
        },
        async signUserOperation(parameters) {
            const { chainId = await getMemoizedChainId(), ...userOperation } = parameters;
            return kernelPluginManager.signUserOperation({
                ...userOperation,
                sender: userOperation.sender ?? (await this.getAddress()),
                chainId
            });
        }
    });
}
exports.create7702KernelAccount = create7702KernelAccount;
//# sourceMappingURL=create7702KernelAccount.js.map