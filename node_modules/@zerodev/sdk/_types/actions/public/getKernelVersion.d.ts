import { type Address, type Client } from "viem";
import type { KERNEL_VERSION_TYPE } from "../../types/index.js";
export type GetKernelVersionParams = {
    address: Address;
};
/**
 * Returns the address of the kernel implementation.
 *
 * @param client {@link client} that you created using viem's createPublicClient.
 * @param args {@link GetKernelVersionParams} address
 * @returns KERNEL_VERSION_TYPE
 *
 * @example
 * import { createPublicClient } from "viem"
 * import { getKernelImplementationAddress } from "@zerodev/sdk/actions"
 *
 * const client = createPublicClient({
 *      chain: goerli,
 *      transport: http("https://goerli.infura.io/v3/your-infura-key")
 * })
 *
 * const kernelVersion = await getKernelVersion(client, {
 *      address,
 * })
 *
 * // Return "0.3.1"
 */
export declare const getKernelVersion: (client: Client, args: GetKernelVersionParams) => Promise<KERNEL_VERSION_TYPE | null>;
//# sourceMappingURL=getKernelVersion.d.ts.map