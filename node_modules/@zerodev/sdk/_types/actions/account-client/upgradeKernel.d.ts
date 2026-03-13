import type { Chain, Client, Hash, Prettify, Transport } from "viem";
import { type SendUserOperationParameters, type SmartAccount } from "viem/account-abstraction";
import type { KERNEL_VERSION_TYPE } from "../../types/kernel.js";
export type UpgradeKernelParameters<account extends SmartAccount | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]> = Prettify<Partial<SendUserOperationParameters<account, accountOverride, calls>> & {
    kernelVersion: KERNEL_VERSION_TYPE;
}>;
export declare function upgradeKernel<account extends SmartAccount | undefined, chain extends Chain | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]>(client: Client<Transport, chain, account>, args: Prettify<UpgradeKernelParameters<account, accountOverride, calls>>): Promise<Hash>;
//# sourceMappingURL=upgradeKernel.d.ts.map