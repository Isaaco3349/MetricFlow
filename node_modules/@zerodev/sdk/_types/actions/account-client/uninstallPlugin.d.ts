import type { Chain, Client, Hash, Transport } from "viem";
import { type SendUserOperationParameters, type SmartAccount } from "viem/account-abstraction";
import type { KernelValidator, KernelValidatorHook } from "../../types/kernel.js";
export type UninstallPluginParameters<account extends SmartAccount | undefined = SmartAccount | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]> = Partial<SendUserOperationParameters<account, accountOverride, calls>> & {
    plugin: KernelValidator<string>;
    hook?: KernelValidatorHook;
};
export declare function uninstallPlugin<account extends SmartAccount | undefined, chain extends Chain | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]>(client: Client<Transport, chain, account>, args: UninstallPluginParameters<account, accountOverride, calls>): Promise<Hash>;
//# sourceMappingURL=uninstallPlugin.d.ts.map