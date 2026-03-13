import { type Address, type Client } from "viem";
import type { KERNEL_VERSION_TYPE } from "../../../../types/kernel.js";
export type AccountMetadata = {
    name: string;
    version: string;
    chainId: bigint;
};
export declare const accountMetadata: (client: Client, accountAddress: Address, kernelVersion: KERNEL_VERSION_TYPE, chainId?: number) => Promise<AccountMetadata>;
//# sourceMappingURL=accountMetadata.d.ts.map