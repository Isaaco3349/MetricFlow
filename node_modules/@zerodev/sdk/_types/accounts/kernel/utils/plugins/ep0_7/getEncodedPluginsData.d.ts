import { type Hex } from "viem";
import type { Action, KernelValidatorHook } from "../../../../../types/kernel.js";
export declare const getEncodedPluginsData: ({ enableSignature, userOpSignature, action, enableData, hook }: {
    enableSignature: Hex;
    userOpSignature: Hex;
    action: Action;
    enableData: Hex;
    hook?: KernelValidatorHook | undefined;
}) => Promise<`0x${string}`>;
//# sourceMappingURL=getEncodedPluginsData.d.ts.map