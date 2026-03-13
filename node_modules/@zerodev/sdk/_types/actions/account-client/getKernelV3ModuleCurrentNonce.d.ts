import type { Chain, Client, Transport } from "viem";
import type { SmartAccount } from "viem/account-abstraction";
export declare function getKernelV3ModuleCurrentNonce<TTransport extends Transport = Transport, TChain extends Chain | undefined = Chain | undefined, TAccount extends SmartAccount | undefined = SmartAccount | undefined>(client: Client<TTransport, TChain, TAccount>): Promise<number>;
//# sourceMappingURL=getKernelV3ModuleCurrentNonce.d.ts.map