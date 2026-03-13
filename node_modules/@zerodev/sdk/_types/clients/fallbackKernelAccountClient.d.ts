import type { Chain, Client, RpcSchema, Transport } from "viem";
import type { SmartAccount } from "viem/account-abstraction";
import type { KernelAccountClient } from "./kernelAccountClient.js";
export declare const createFallbackKernelAccountClient: <transport extends Transport, chain extends Chain | undefined = undefined, account extends SmartAccount | undefined = undefined, client extends Client | undefined = undefined, rpcSchema extends RpcSchema | undefined = undefined>(clients: KernelAccountClient<transport, chain, account, client, rpcSchema>[], onError?: ((error: Error, clientUrl: string) => Promise<void>) | undefined) => KernelAccountClient<transport, chain, account, client, rpcSchema>;
//# sourceMappingURL=fallbackKernelAccountClient.d.ts.map