import type { EntryPointVersion } from "viem/account-abstraction";
import type { CallType } from "../../../../../types/kernel.js";
import type { KernelSmartAccountImplementation } from "../../../createKernelAccount.js";
export declare const encodeCallData: <entryPointVersion extends EntryPointVersion = EntryPointVersion>(calls: readonly {
    to: `0x${string}`;
    data?: `0x${string}` | undefined;
    value?: bigint | undefined;
}[], callType?: CallType | undefined) => Promise<`0x${string}`>;
//# sourceMappingURL=encodeCallData.d.ts.map