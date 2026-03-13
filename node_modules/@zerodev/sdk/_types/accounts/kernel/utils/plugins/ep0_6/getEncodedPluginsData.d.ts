import { type Address, type Hex } from "viem";
import { type PluginValidityData } from "../../../../../types/index.js";
import type { Kernel2_0_plugins } from "./getPluginsEnableTypedData.js";
export declare const getEncodedPluginsData: ({ accountAddress, enableSignature, action, validator, validUntil, validAfter }: {
    accountAddress: Address;
    enableSignature: Hex;
} & Kernel2_0_plugins & PluginValidityData) => Promise<`0x${string}`>;
//# sourceMappingURL=getEncodedPluginsData.d.ts.map