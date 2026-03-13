import { type RequiredBy } from "viem";
import type { KernelValidator, PluginMigrationData } from "../../../../../types/index.js";
import type { Action, EntryPointType, KERNEL_V3_VERSION_TYPE, KernelValidatorHook } from "../../../../../types/kernel.js";
export declare const getValidatorPluginInstallModuleData: ({ plugin, entryPoint, kernelVersion, hook, action }: {
    plugin: RequiredBy<Partial<KernelValidator>, "address" | "getEnableData">;
    entryPoint: EntryPointType<"0.7">;
    kernelVersion: KERNEL_V3_VERSION_TYPE;
    hook?: KernelValidatorHook | undefined;
    action?: Pick<Action, "selector"> | undefined;
}) => Promise<PluginMigrationData>;
//# sourceMappingURL=getValidatorPluginInstallModuleData.d.ts.map