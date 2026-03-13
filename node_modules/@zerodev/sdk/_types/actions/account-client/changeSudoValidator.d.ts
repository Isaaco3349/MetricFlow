import { type Chain, type Client, type Hash, type Prettify, type Transport } from "viem";
import { type SendUserOperationParameters, type SmartAccount } from "viem/account-abstraction";
import type { KernelValidator, KernelValidatorHook } from "../../types/kernel.js";
export type ChangeSudoValidatorParameters<account extends SmartAccount | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]> = Prettify<Partial<SendUserOperationParameters<account, accountOverride, calls>> & {
    sudoValidator: KernelValidator<string>;
    hook?: KernelValidatorHook;
}>;
export declare function changeSudoValidator<account extends SmartAccount | undefined, chain extends Chain | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]>(client: Client<Transport, chain, account>, args: Prettify<ChangeSudoValidatorParameters<account, accountOverride, calls>>): Promise<Hash>;
//# sourceMappingURL=changeSudoValidator.d.ts.map