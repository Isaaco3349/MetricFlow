import { isAddressEqual } from "viem";
import { entryPoint06Address } from "viem/account-abstraction";
import { deepHexlify } from "../../utils.js";
/**
 * Returns paymasterAndData & updated gas parameters required to sponsor a userOperation.
 */
export const sponsorUserOperation = async (client, args) => {
    const { userOperation: { chainId, entryPointAddress, context, 
    // @ts-ignore
    calls, 
    // @ts-ignore
    account, ..._userOperation } } = args;
    const response = await client.request({
        method: "zd_sponsorUserOperation",
        params: [
            {
                chainId: client.chain?.id,
                userOp: deepHexlify(_userOperation),
                entryPointAddress: entryPointAddress,
                gasTokenData: args.gasToken && {
                    tokenAddress: args.gasToken
                },
                shouldOverrideFee: args.shouldOverrideFee ?? false,
                shouldConsume: args.shouldConsume ?? true
            }
        ]
    });
    if (isAddressEqual(entryPointAddress, entryPoint06Address)) {
        return {
            paymasterAndData: response.paymasterAndData,
            preVerificationGas: BigInt(response.preVerificationGas),
            verificationGasLimit: BigInt(response.verificationGasLimit),
            callGasLimit: BigInt(response.callGasLimit),
            maxFeePerGas: response.maxFeePerGas
                ? BigInt(response.maxFeePerGas)
                : args.userOperation.maxFeePerGas,
            maxPriorityFeePerGas: response.maxPriorityFeePerGas
                ? BigInt(response.maxPriorityFeePerGas)
                : args.userOperation.maxPriorityFeePerGas
        };
    }
    const responseV07 = response;
    return {
        callGasLimit: BigInt(responseV07.callGasLimit),
        verificationGasLimit: BigInt(responseV07.verificationGasLimit),
        preVerificationGas: BigInt(responseV07.preVerificationGas),
        paymaster: responseV07.paymaster,
        paymasterVerificationGasLimit: BigInt(responseV07.paymasterVerificationGasLimit),
        paymasterPostOpGasLimit: BigInt(responseV07.paymasterPostOpGasLimit),
        paymasterData: responseV07.paymasterData,
        maxFeePerGas: response.maxFeePerGas
            ? BigInt(response.maxFeePerGas)
            : args.userOperation.maxFeePerGas,
        maxPriorityFeePerGas: response.maxPriorityFeePerGas
            ? BigInt(response.maxPriorityFeePerGas)
            : args.userOperation.maxPriorityFeePerGas
    };
};
//# sourceMappingURL=sponsorUserOperation.js.map