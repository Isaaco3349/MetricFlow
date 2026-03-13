import type { Chain, Client, Hash, Prettify, Transport } from "viem";
import { type SendUserOperationParameters, type SmartAccount } from "viem/account-abstraction";
export type InvalidateNonceParameters<account extends SmartAccount | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]> = Prettify<Partial<SendUserOperationParameters<account, accountOverride, calls>> & {
    nonceToSet: number;
}>;
export declare function invalidateNonce<account extends SmartAccount | undefined, chain extends Chain | undefined, accountOverride extends SmartAccount | undefined = undefined, calls extends readonly unknown[] = readonly unknown[]>(client: Client<Transport, chain, account>, args: Prettify<InvalidateNonceParameters<account, accountOverride, calls>>): Promise<Hash>;
//# sourceMappingURL=invalidateNonce.d.ts.map