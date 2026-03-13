import { type Address, type CustomSource } from "viem";
import type { KernelValidatorHook } from "../../../../../types/kernel.js";
import type { Kernel2_0_plugins } from "../ep0_6/getPluginsEnableTypedData.js";
export declare const getPluginsEnableTypedData: ({ accountAddress, chainId, kernelVersion, action, hook, validator, validatorNonce }: {
    accountAddress: Address;
    chainId: number;
    kernelVersion: string;
    validatorNonce: number;
    hook?: KernelValidatorHook | undefined;
} & Kernel2_0_plugins) => Promise<Parameters<CustomSource["signTypedData"]>[0]>;
//# sourceMappingURL=getPluginsEnableTypedData.d.ts.map