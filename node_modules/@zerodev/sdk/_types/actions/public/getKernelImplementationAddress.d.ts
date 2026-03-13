import type { Address, Client } from "viem";
export type GetKernelImplementationAddressParams = {
    address: Address;
};
/**
 * Returns the address of the kernel implementation.
 *
 * @param client {@link client} that you created using viem's createPublicClient.
 * @param args {@link GetKernelImplementationAddressParams} address
 * @returns Address
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
 * const kernelImplementationAddress = await getKernelImplementationAddress(client, {
 *      address,
 * })
 *
 * // Return 0x0000000000000000000000000000000000000000
 */
export declare const getKernelImplementationAddress: (client: Client, args: GetKernelImplementationAddressParams) => Promise<Address>;
//# sourceMappingURL=getKernelImplementationAddress.d.ts.map