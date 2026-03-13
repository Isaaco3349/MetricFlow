import { type Client } from "viem";
import type { EntryPointVersion } from "viem/account-abstraction";
import { type KernelPluginManager, type KernelPluginManagerParams } from "../../types/kernel.js";
export declare function isKernelPluginManager<entryPointVersion extends EntryPointVersion>(plugin: any): plugin is KernelPluginManager<entryPointVersion>;
export declare function toKernelPluginManager<entryPointVersion extends EntryPointVersion>(client: Client, { sudo, regular, hook, pluginEnableSignature, validatorInitData, action, validAfter, validUntil, entryPoint, kernelVersion, chainId, isPreInstalled }: KernelPluginManagerParams<entryPointVersion>): Promise<KernelPluginManager<entryPointVersion>>;
//# sourceMappingURL=toKernelPluginManager.d.ts.map