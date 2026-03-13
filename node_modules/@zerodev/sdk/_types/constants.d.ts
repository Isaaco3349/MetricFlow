import { type Address, type Hex } from "viem";
import { type EntryPointVersion } from "viem/account-abstraction";
import type { EntryPointType, KERNEL_V2_VERSION_TYPE, KERNEL_V3_VERSION_TYPE, KERNEL_VERSION_TYPE } from "./types/kernel.js";
export declare const DUMMY_ECDSA_SIG = "0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c";
export declare const MAGIC_VALUE_SIG_REPLAYABLE = "0x0555ad2729e8da1777a4e5020806f8bf7601c3db6bfe402f410a34958363a95a";
export declare const FACTORY_ADDRESS_V0_6 = "0x5de4839a76cf55d0c90e2061ef4386d962E15ae3";
export declare const FACTORY_ADDRESS_V0_6_INIT_CODE_HASH = "0xee9d8350bd899dd261db689aafd87eb8a30f085adbaff48152399438ff4eed73";
export declare const KernelVersionToAddressesMap: {
    [key in KERNEL_VERSION_TYPE]: {
        accountImplementationAddress: Address;
        factoryAddress: Address;
        metaFactoryAddress?: key extends KERNEL_V3_VERSION_TYPE ? Address : never;
        initCodeHash?: Hex;
    };
};
export declare const KERNEL_V0_2: KERNEL_V2_VERSION_TYPE;
export declare const KERNEL_V2_2: KERNEL_V2_VERSION_TYPE;
export declare const KERNEL_V2_3: KERNEL_V2_VERSION_TYPE;
export declare const KERNEL_V2_4: KERNEL_V2_VERSION_TYPE;
export declare const KERNEL_V3_0: KERNEL_V3_VERSION_TYPE;
export declare const KERNEL_V3_1: KERNEL_V3_VERSION_TYPE;
export declare const KERNEL_V3_2: KERNEL_V3_VERSION_TYPE;
export declare const KERNEL_V3_3_BETA: KERNEL_V3_VERSION_TYPE;
export declare const KERNEL_V3_3: KERNEL_V3_VERSION_TYPE;
export declare const TOKEN_ACTION = "0x2087C7FfD0d0DAE80a00EE74325aBF3449e0eaf1";
export declare const ONLY_ENTRYPOINT_HOOK_ADDRESS = "0xb230f0A1C7C95fa11001647383c8C7a8F316b900";
export declare const KERNEL_NAME = "Kernel";
export declare const VALIDATOR_TYPE: {
    readonly SUDO: "0x00";
    readonly SECONDARY: "0x01";
    readonly PERMISSION: "0x02";
    readonly EIP7702: "0x00";
};
export declare enum VALIDATOR_MODE {
    DEFAULT = "0x00",
    ENABLE = "0x01"
}
export declare enum CALL_TYPE {
    SINGLE = "0x00",
    BATCH = "0x01",
    DELEGATE_CALL = "0xFF"
}
export declare enum EXEC_TYPE {
    DEFAULT = "0x00",
    TRY_EXEC = "0x01"
}
export declare const PLUGIN_TYPE: {
    VALIDATOR: number;
    EXECUTOR: number;
    FALLBACK: number;
    HOOK: number;
    POLICY: number;
    SIGNER: number;
};
export declare const safeCreateCallAddress = "0x9b35Af71d77eaf8d7e40252370304687390A1A52";
export declare const KernelFactoryToInitCodeHashMap: {
    [key: Address]: Hex;
};
export declare const KERNEL_IMPLEMENTATION_SLOT = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
export declare const getEntryPoint: <TEntryPointVersion extends EntryPointVersion>(entryPointVersion: TEntryPointVersion) => EntryPointType<TEntryPointVersion>;
export declare const KERNEL_7702_DELEGATION_ADDRESS = "0xd6CEDDe84be40893d153Be9d467CD6aD37875b28";
//# sourceMappingURL=constants.d.ts.map