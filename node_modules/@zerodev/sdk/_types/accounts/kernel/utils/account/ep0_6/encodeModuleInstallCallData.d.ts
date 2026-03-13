import { type Address, type Hex } from "viem";
import type { PluginInstallData } from "../../../../../types/kernel.js";
export declare const encodeModuleInstallCallData: ({ accountAddress, enableData, executor, selector, validAfter, validUntil, validator }: {
    accountAddress: Address;
} & {
    selector: `0x${string}`;
    executor: `0x${string}`;
    validator: `0x${string}`;
    validUntil: number;
    validAfter: number;
    enableData: `0x${string}`;
}) => Promise<Hex>;
//# sourceMappingURL=encodeModuleInstallCallData.d.ts.map