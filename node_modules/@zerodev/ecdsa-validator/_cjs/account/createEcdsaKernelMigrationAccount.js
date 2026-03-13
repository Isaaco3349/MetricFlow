"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonceKeyWithEncoding = exports.createEcdsaKernelMigrationAccount = void 0;
const sdk_1 = require("@zerodev/sdk");
const accounts_1 = require("@zerodev/sdk/accounts");
const actions_1 = require("@zerodev/sdk/actions");
const constants_1 = require("@zerodev/sdk/constants");
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const actions_2 = require("viem/actions");
const utils_1 = require("viem/utils");
const toECDSAValidatorPlugin_js_1 = require("../toECDSAValidatorPlugin.js");
const getKernelInitData = ({ entryPointVersion: _entryPointVersion, kernelVersion, validatorAddress, validatorData }) => {
    const validatorId = (0, viem_1.concatHex)([constants_1.VALIDATOR_TYPE.SECONDARY, validatorAddress]);
    if (kernelVersion === "0.3.0") {
        return (0, viem_1.encodeFunctionData)({
            abi: sdk_1.KernelV3InitAbi,
            functionName: "initialize",
            args: [validatorId, viem_1.zeroAddress, validatorData, "0x"]
        });
    }
    return (0, viem_1.encodeFunctionData)({
        abi: sdk_1.KernelV3_1AccountAbi,
        functionName: "initialize",
        args: [validatorId, viem_1.zeroAddress, validatorData, "0x", []]
    });
};
const getAccountInitCode = async ({ entryPointVersion, kernelVersion, validatorData, index, factoryAddress, validatorAddress }) => {
    const initializationData = getKernelInitData({
        entryPointVersion,
        kernelVersion,
        validatorAddress,
        validatorData
    });
    return (0, viem_1.encodeFunctionData)({
        abi: sdk_1.KernelFactoryStakerAbi,
        functionName: "deployWithFactory",
        args: [factoryAddress, initializationData, (0, viem_1.toHex)(index, { size: 32 })]
    });
};
const isKernelUpgraded = async (client, accountAddress, toKernelVersion) => {
    const kernelImplementation = await (0, actions_1.getKernelImplementationAddress)(client, {
        address: accountAddress
    });
    return (0, viem_1.isAddressEqual)(kernelImplementation, constants_1.KernelVersionToAddressesMap[toKernelVersion]
        .accountImplementationAddress);
};
async function createEcdsaKernelMigrationAccount(client, { entryPoint, signer, index = 0n, address, migrationVersion, pluginMigrations }) {
    if (entryPoint.version === "0.6") {
        throw new Error("EntryPointV0.6 is not supported for migration");
    }
    (0, sdk_1.validateKernelVersionWithEntryPoint)(entryPoint.version, migrationVersion.from);
    (0, sdk_1.validateKernelVersionWithEntryPoint)(entryPoint.version, migrationVersion.to);
    const fromAddresses = constants_1.KernelVersionToAddressesMap[migrationVersion.from];
    const fromValidatorAddress = (0, toECDSAValidatorPlugin_js_1.getValidatorAddress)(entryPoint, migrationVersion.from);
    const toValidatorAddress = (0, toECDSAValidatorPlugin_js_1.getValidatorAddress)(entryPoint, migrationVersion.to);
    const viemSigner = await (0, sdk_1.toSigner)({ signer });
    let chainId;
    const getMemoizedChainId = async () => {
        if (chainId)
            return chainId;
        chainId = client.chain
            ? client.chain.id
            : await (0, utils_1.getAction)(client, actions_2.getChainId, "getChainId")({});
        return chainId;
    };
    const generateInitCode = async () => {
        return getAccountInitCode({
            entryPointVersion: entryPoint.version,
            factoryAddress: fromAddresses.factoryAddress,
            index,
            kernelVersion: migrationVersion.from,
            validatorAddress: fromValidatorAddress,
            validatorData: viemSigner.address
        });
    };
    const getFactoryArgs = async () => {
        return {
            factory: fromAddresses.metaFactoryAddress ?? viem_1.zeroAddress,
            factoryData: await generateInitCode()
        };
    };
    let accountAddress = address ??
        (await (async () => {
            const { factory, factoryData } = await getFactoryArgs();
            return await (0, actions_1.getSenderAddress)(client, {
                factory,
                factoryData,
                entryPointAddress: entryPoint.address
            });
        })());
    let kernelUpgraded = await isKernelUpgraded(client, accountAddress, migrationVersion.to);
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
    const _entryPoint = {
        address: entryPoint?.address ?? account_abstraction_1.entryPoint07Address,
        abi: ((entryPoint?.version ?? "0.7") === "0.6"
            ? account_abstraction_1.entryPoint06Abi
            : account_abstraction_1.entryPoint07Abi),
        version: entryPoint?.version ?? "0.7"
    };
    return (0, account_abstraction_1.toSmartAccount)({
        kernelVersion: migrationVersion.to,
        kernelPluginManager: await (0, accounts_1.toKernelPluginManager)(client, {
            entryPoint,
            kernelVersion: migrationVersion.to,
            chainId: await getMemoizedChainId(),
            sudo: await (0, toECDSAValidatorPlugin_js_1.signerToEcdsaValidator)(client, {
                entryPoint,
                signer: viemSigner,
                kernelVersion: migrationVersion.to,
                validatorAddress: toValidatorAddress
            })
        }),
        factoryAddress: (await getFactoryArgs()).factory,
        generateInitCode,
        accountImplementationAddress: constants_1.KernelVersionToAddressesMap[migrationVersion.to]
            .accountImplementationAddress,
        encodeModuleInstallCallData: async () => {
            throw new Error("Not implemented");
        },
        nonceKeyManager: (0, viem_1.createNonceManager)({
            source: { get: () => 0, set: () => { } }
        }),
        client,
        entryPoint: _entryPoint,
        getFactoryArgs,
        async getAddress() {
            if (accountAddress)
                return accountAddress;
            const { factory, factoryData } = await getFactoryArgs();
            accountAddress = await (0, actions_1.getSenderAddress)(client, {
                factory,
                factoryData,
                entryPointAddress: entryPoint.address
            });
            return accountAddress;
        },
        async encodeDeployCallData(_tx) {
            throw new Error("Not implemented");
        },
        async encodeCalls(calls, callType) {
            await checkPluginInstallationStatus();
            const pluginInstallCalls = [];
            if (pluginCache.pendingPlugins.length > 0 &&
                entryPoint.version === "0.7") {
                for (const plugin of pluginCache.pendingPlugins) {
                    pluginInstallCalls.push((0, accounts_1.getPluginInstallCallData)(accountAddress, plugin));
                }
            }
            kernelUpgraded =
                kernelUpgraded ||
                    (await isKernelUpgraded(client, accountAddress, migrationVersion.to));
            let _calls = calls;
            if (!kernelUpgraded) {
                const implementation = constants_1.KernelVersionToAddressesMap[migrationVersion.to]
                    .accountImplementationAddress;
                const upgradeCall = {
                    to: accountAddress,
                    data: (0, viem_1.encodeFunctionData)({
                        abi: sdk_1.KernelV3AccountAbi,
                        functionName: "upgradeTo",
                        args: [implementation]
                    }),
                    value: 0n
                };
                if (!(0, viem_1.isAddressEqual)(fromValidatorAddress, toValidatorAddress)) {
                    const rootValidatorId = (0, viem_1.concatHex)([
                        constants_1.VALIDATOR_TYPE.SECONDARY,
                        (0, viem_1.pad)(toValidatorAddress, {
                            size: 20,
                            dir: "right"
                        })
                    ]);
                    const updateValidatorCall = {
                        to: accountAddress,
                        data: (0, viem_1.encodeFunctionData)({
                            abi: sdk_1.KernelV3_1AccountAbi,
                            functionName: "changeRootValidator",
                            args: [
                                rootValidatorId,
                                viem_1.zeroAddress,
                                viemSigner.address,
                                "0x"
                            ]
                        }),
                        value: 0n
                    };
                    _calls = [
                        upgradeCall,
                        updateValidatorCall,
                        ...pluginInstallCalls,
                        ...calls
                    ];
                }
                _calls = [upgradeCall, ...pluginInstallCalls, ...calls];
            }
            else {
                _calls = [...pluginInstallCalls, ...calls];
            }
            return (0, sdk_1.encodeCallDataEpV07)(_calls, callType);
        },
        async sign({ hash }) {
            return this.signMessage({ message: hash });
        },
        async signMessage({ message, useReplayableSignature }) {
            kernelUpgraded =
                kernelUpgraded ||
                    (await isKernelUpgraded(client, accountAddress, migrationVersion.to));
            const messageHash = (0, viem_1.hashMessage)(message);
            const version_ = kernelUpgraded
                ? migrationVersion.to
                : migrationVersion.from;
            const version = version_ === "0.3.0" ? "0.3.0-beta" : version_;
            const wrappedMessageHash = await (0, sdk_1.eip712WrapHash)(messageHash, {
                name: "Kernel",
                chainId: chainId,
                version,
                verifyingContract: accountAddress
            }, useReplayableSignature);
            let signature = await viemSigner.signMessage({
                message: { raw: wrappedMessageHash }
            });
            if (!(0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_WITH_VALIDATOR, version)) {
                return signature;
            }
            if (useReplayableSignature &&
                (0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_REPLAYABLE, version)) {
                signature = (0, viem_1.concatHex)([constants_1.MAGIC_VALUE_SIG_REPLAYABLE, signature]);
            }
            return (0, viem_1.concatHex)([constants_1.VALIDATOR_TYPE.SUDO, signature]);
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
            kernelUpgraded =
                kernelUpgraded ||
                    (await isKernelUpgraded(client, accountAddress, migrationVersion.to));
            const version_ = kernelUpgraded
                ? migrationVersion.to
                : migrationVersion.from;
            const version = version_ === "0.3.0" ? "0.3.0-beta" : version_;
            const wrappedMessageHash = await (0, sdk_1.eip712WrapHash)(typedHash, {
                name: "Kernel",
                chainId: chainId,
                version,
                verifyingContract: accountAddress
            });
            const signature = await viemSigner.signMessage({
                message: { raw: wrappedMessageHash }
            });
            if (!(0, sdk_1.hasKernelFeature)(sdk_1.KERNEL_FEATURES.ERC1271_WITH_VALIDATOR, version)) {
                return signature;
            }
            return (0, viem_1.concatHex)([constants_1.VALIDATOR_TYPE.SUDO, signature]);
        },
        async getNonce(_args) {
            const key = (0, exports.getNonceKeyWithEncoding)(fromValidatorAddress, _args?.key);
            return (0, actions_1.getAccountNonce)(client, {
                address: accountAddress,
                entryPointAddress: entryPoint.address,
                key
            });
        },
        async getStubSignature() {
            return constants_1.DUMMY_ECDSA_SIG;
        },
        async signUserOperation(parameters) {
            const { chainId = await getMemoizedChainId(), ...userOperation } = parameters;
            const hash = (0, account_abstraction_1.getUserOperationHash)({
                userOperation: {
                    ...userOperation,
                    sender: userOperation.sender ?? accountAddress,
                    signature: "0x"
                },
                entryPointAddress: entryPoint.address,
                entryPointVersion: entryPoint.version,
                chainId: chainId
            });
            const signature = await (0, actions_2.signMessage)(client, {
                account: viemSigner,
                message: { raw: hash }
            });
            return signature;
        }
    });
}
exports.createEcdsaKernelMigrationAccount = createEcdsaKernelMigrationAccount;
const getNonceKeyWithEncoding = (validatorAddress, nonceKey = 0n) => {
    if (nonceKey > viem_1.maxUint16)
        throw new Error("nonce key must be equal or less than 2 bytes(maxUint16) for Kernel version v0.7");
    const validatorMode = constants_1.VALIDATOR_MODE.DEFAULT;
    const validatorType = constants_1.VALIDATOR_TYPE.SUDO;
    const encoding = (0, viem_1.pad)((0, viem_1.concatHex)([
        validatorMode,
        validatorType,
        validatorAddress,
        (0, viem_1.toHex)(nonceKey, { size: 2 })
    ]), { size: 24 });
    return BigInt(encoding);
};
exports.getNonceKeyWithEncoding = getNonceKeyWithEncoding;
//# sourceMappingURL=createEcdsaKernelMigrationAccount.js.map