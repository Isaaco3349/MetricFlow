import { type Address, type CustomSource } from "viem";
import type { Action, KernelValidator, PluginValidityData } from "../../../../../types/index.js";
export type Kernel2_0_plugins = {
    validator: KernelValidator;
    action: Action;
};
export declare const getPluginsEnableTypedData: ({ accountAddress, chainId, kernelVersion, action, validator, validUntil, validAfter }: {
    accountAddress: Address;
    chainId: number;
    kernelVersion: string;
} & Kernel2_0_plugins & PluginValidityData) => Promise<Parameters<CustomSource["signTypedData"]>[0]>;
//# sourceMappingURL=getPluginsEnableTypedData.d.ts.map