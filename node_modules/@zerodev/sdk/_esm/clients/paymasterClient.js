import { createClient } from "viem";
import { paymasterActions } from "viem/account-abstraction";
import { zerodevPaymasterActions } from "./decorators/kernel.js";
/**
 * Creates a ZeroDev-specific Paymaster Client with a given [Transport](https://viem.sh/docs/clients/intro.html) configured for a [Chain](https://viem.sh/docs/clients/chains.html).
 *
 * - Docs: https://docs.zerodev.app/meta-infra/getting-started/intro
 *
 * @param config - {@link PublicClientConfig}
 * @returns A ZeroDev Paymaster Client. {@link ZeroDevPaymasterClient}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const zerodevPaymasterClient = createZeroDevPaymasterClient({
 *   chain: mainnet,
 *   transport: http(`https://rpc.zerodev.app/api/v2/paymaster/${projectId}`),
 * })
 */
export const createZeroDevPaymasterClient = (parameters) => {
    const { key = "public", name = "ZeroDev Paymaster Client", transport } = parameters;
    const client = createClient({
        ...parameters,
        transport: (opts) => {
            return transport({
                ...opts,
                retryCount: 0
            });
        },
        key,
        name,
        type: "zerodevPaymasterClient"
    });
    return client.extend(paymasterActions).extend(zerodevPaymasterActions());
};
//# sourceMappingURL=paymasterClient.js.map