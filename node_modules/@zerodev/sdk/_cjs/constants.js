"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KERNEL_7702_DELEGATION_ADDRESS = exports.getEntryPoint = exports.KERNEL_IMPLEMENTATION_SLOT = exports.KernelFactoryToInitCodeHashMap = exports.safeCreateCallAddress = exports.PLUGIN_TYPE = exports.EXEC_TYPE = exports.CALL_TYPE = exports.VALIDATOR_MODE = exports.VALIDATOR_TYPE = exports.KERNEL_NAME = exports.ONLY_ENTRYPOINT_HOOK_ADDRESS = exports.TOKEN_ACTION = exports.KERNEL_V3_3 = exports.KERNEL_V3_3_BETA = exports.KERNEL_V3_2 = exports.KERNEL_V3_1 = exports.KERNEL_V3_0 = exports.KERNEL_V2_4 = exports.KERNEL_V2_3 = exports.KERNEL_V2_2 = exports.KERNEL_V0_2 = exports.KernelVersionToAddressesMap = exports.FACTORY_ADDRESS_V0_6_INIT_CODE_HASH = exports.FACTORY_ADDRESS_V0_6 = exports.MAGIC_VALUE_SIG_REPLAYABLE = exports.DUMMY_ECDSA_SIG = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
exports.DUMMY_ECDSA_SIG = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
exports.MAGIC_VALUE_SIG_REPLAYABLE = "0x0555ad2729e8da1777a4e5020806f8bf7601c3db6bfe402f410a34958363a95a";
exports.FACTORY_ADDRESS_V0_6 = "0x5de4839a76cf55d0c90e2061ef4386d962E15ae3";
exports.FACTORY_ADDRESS_V0_6_INIT_CODE_HASH = "0xee9d8350bd899dd261db689aafd87eb8a30f085adbaff48152399438ff4eed73";
exports.KernelVersionToAddressesMap = {
    "0.0.2": {
        accountImplementationAddress: viem_1.zeroAddress,
        factoryAddress: "0xaee9762ce625e0a8f7b184670fb57c37bfe1d0f1"
    },
    "0.2.2": {
        accountImplementationAddress: "0x0DA6a956B9488eD4dd761E59f52FDc6c8068E6B5",
        factoryAddress: exports.FACTORY_ADDRESS_V0_6,
        initCodeHash: exports.FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
    },
    "0.2.3": {
        accountImplementationAddress: "0xD3F582F6B4814E989Ee8E96bc3175320B5A540ab",
        factoryAddress: exports.FACTORY_ADDRESS_V0_6,
        initCodeHash: exports.FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
    },
    "0.2.4": {
        accountImplementationAddress: "0xd3082872F8B06073A021b4602e022d5A070d7cfC",
        factoryAddress: exports.FACTORY_ADDRESS_V0_6,
        initCodeHash: exports.FACTORY_ADDRESS_V0_6_INIT_CODE_HASH
    },
    "0.3.0": {
        accountImplementationAddress: "0x94F097E1ebEB4ecA3AAE54cabb08905B239A7D27",
        factoryAddress: "0x6723b44Abeec4E71eBE3232BD5B455805baDD22f",
        metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
        initCodeHash: "0x6fe6e6ea30eddce942b9618033ab8429f9ddac594053bec8a6744fffc71976e2"
    },
    "0.3.1": {
        accountImplementationAddress: "0xBAC849bB641841b44E965fB01A4Bf5F074f84b4D",
        factoryAddress: "0xaac5D4240AF87249B3f71BC8E4A2cae074A3E419",
        metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
        initCodeHash: "0x85d96aa1c9a65886d094915d76ccae85f14027a02c1647dde659f869460f03e6"
    },
    "0.3.2": {
        accountImplementationAddress: "0xD830D15D3dc0C269F3dBAa0F3e8626d33CFdaBe1",
        factoryAddress: "0x7a1dBAB750f12a90EB1B60D2Ae3aD17D4D81EfFe",
        metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
        initCodeHash: "0xc7c48c9dd12de68b8a4689b6f8c8c07b61d4d6fa4ddecdd86a6980d045fa67eb"
    },
    "0.3.3": {
        accountImplementationAddress: "0xd6CEDDe84be40893d153Be9d467CD6aD37875b28",
        factoryAddress: "0x2577507b78c2008Ff367261CB6285d44ba5eF2E9",
        metaFactoryAddress: "0xd703aaE79538628d27099B8c4f621bE4CCd142d5",
        initCodeHash: "0xc452397f1e7518f8cea0566ac057e243bb1643f6298aba8eec8cdee78ee3b3dd"
    }
};
exports.KERNEL_V0_2 = "0.0.2";
exports.KERNEL_V2_2 = "0.2.2";
exports.KERNEL_V2_3 = "0.2.3";
exports.KERNEL_V2_4 = "0.2.4";
exports.KERNEL_V3_0 = "0.3.0";
exports.KERNEL_V3_1 = "0.3.1";
exports.KERNEL_V3_2 = "0.3.2";
exports.KERNEL_V3_3_BETA = "0.3.3";
exports.KERNEL_V3_3 = "0.3.3";
exports.TOKEN_ACTION = "0x2087C7FfD0d0DAE80a00EE74325aBF3449e0eaf1";
exports.ONLY_ENTRYPOINT_HOOK_ADDRESS = "0xb230f0A1C7C95fa11001647383c8C7a8F316b900";
exports.KERNEL_NAME = "Kernel";
exports.VALIDATOR_TYPE = {
    SUDO: "0x00",
    SECONDARY: "0x01",
    PERMISSION: "0x02",
    EIP7702: "0x00"
};
var VALIDATOR_MODE;
(function (VALIDATOR_MODE) {
    VALIDATOR_MODE["DEFAULT"] = "0x00";
    VALIDATOR_MODE["ENABLE"] = "0x01";
})(VALIDATOR_MODE || (exports.VALIDATOR_MODE = VALIDATOR_MODE = {}));
var CALL_TYPE;
(function (CALL_TYPE) {
    CALL_TYPE["SINGLE"] = "0x00";
    CALL_TYPE["BATCH"] = "0x01";
    CALL_TYPE["DELEGATE_CALL"] = "0xFF";
})(CALL_TYPE || (exports.CALL_TYPE = CALL_TYPE = {}));
var EXEC_TYPE;
(function (EXEC_TYPE) {
    EXEC_TYPE["DEFAULT"] = "0x00";
    EXEC_TYPE["TRY_EXEC"] = "0x01";
})(EXEC_TYPE || (exports.EXEC_TYPE = EXEC_TYPE = {}));
exports.PLUGIN_TYPE = {
    VALIDATOR: 1,
    EXECUTOR: 2,
    FALLBACK: 3,
    HOOK: 4,
    POLICY: 5,
    SIGNER: 6
};
exports.safeCreateCallAddress = "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
exports.KernelFactoryToInitCodeHashMap = {
    "0x5de4839a76cf55d0c90e2061ef4386d962E15ae3": "0xee9d8350bd899dd261db689aafd87eb8a30f085adbaff48152399438ff4eed73",
    "0x6723b44Abeec4E71eBE3232BD5B455805baDD22f": "0x6fe6e6ea30eddce942b9618033ab8429f9ddac594053bec8a6744fffc71976e2"
};
exports.KERNEL_IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const getEntryPoint = (entryPointVersion) => {
    if (entryPointVersion === "0.6")
        return {
            address: account_abstraction_1.entryPoint06Address,
            version: entryPointVersion
        };
    return {
        address: account_abstraction_1.entryPoint07Address,
        version: entryPointVersion
    };
};
exports.getEntryPoint = getEntryPoint;
exports.KERNEL_7702_DELEGATION_ADDRESS = "0xd6CEDDe84be40893d153Be9d467CD6aD37875b28";
//# sourceMappingURL=constants.js.map