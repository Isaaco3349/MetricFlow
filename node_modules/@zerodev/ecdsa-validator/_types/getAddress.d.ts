import type { EntryPointType, GetKernelVersion } from "@zerodev/sdk/types";
import { type Address, type Hex, type PublicClient } from "viem";
import type { EntryPointVersion } from "viem/account-abstraction";
export type GetKernelAddressFromECDSAParams<entryPointVersion extends EntryPointVersion> = {
    entryPoint: EntryPointType<entryPointVersion>;
    kernelVersion: GetKernelVersion<entryPointVersion>;
    eoaAddress: Address;
    index: bigint;
    hookAddress?: entryPointVersion extends "0.6" ? never : Address;
    hookData?: entryPointVersion extends "0.6" ? never : Hex;
    initConfig?: entryPointVersion extends "0.6" ? never : Hex[];
} & ({
    publicClient: PublicClient;
    initCodeHash?: never;
} | {
    publicClient?: never;
    initCodeHash: Hex;
});
export declare function getKernelAddressFromECDSA<entryPointVersion extends EntryPointVersion>(params: GetKernelAddressFromECDSAParams<entryPointVersion>): Promise<`0x${string}`>;
//# sourceMappingURL=getAddress.d.ts.map