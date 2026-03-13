import { entryPoint06Address } from "viem/account-abstraction";
import { deepHexlify } from "../../utils.js";
/**
 * Returns paymasterAndData & updated gas parameters required to sponsor a userOperation.
 */
export const estimateGasInERC20 = async (client, args) => {
    const response = await client.request({
        method: "stackup_getERC20TokenQuotes",
        params: [
            {
                chainId: client.chain?.id,
                userOp: {
                    ...deepHexlify(args.userOperation),
                    initCode: args.userOperation.initCode || "0x"
                },
                tokenAddress: args.gasTokenAddress,
                entryPointAddress: args.entryPoint ?? entryPoint06Address
            }
        ]
    });
    const result = {
        maxGasCostToken: response.maxGasCostToken,
        tokenDecimals: response.tokenDecimals
    };
    const amount = Number(result.maxGasCostToken) / 10 ** Number(result.tokenDecimals);
    return { amount };
};
//# sourceMappingURL=estimateGasInERC20.js.map