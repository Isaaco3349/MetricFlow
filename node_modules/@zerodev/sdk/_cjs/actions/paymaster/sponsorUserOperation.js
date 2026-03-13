"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sponsorUserOperation = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const utils_js_1 = require("../../utils.js");
const sponsorUserOperation = async (client, args) => {
    const { userOperation: { chainId, entryPointAddress, context, calls, account, ..._userOperation } } = args;
    const response = await client.request({
        method: "zd_sponsorUserOperation",
        params: [
            {
                chainId: client.chain?.id,
                userOp: (0, utils_js_1.deepHexlify)(_userOperation),
                entryPointAddress: entryPointAddress,
                gasTokenData: args.gasToken && {
                    tokenAddress: args.gasToken
                },
                shouldOverrideFee: args.shouldOverrideFee ?? false,
                shouldConsume: args.shouldConsume ?? true
            }
        ]
    });
    if ((0, viem_1.isAddressEqual)(entryPointAddress, account_abstraction_1.entryPoint06Address)) {
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
exports.sponsorUserOperation = sponsorUserOperation;
//# sourceMappingURL=sponsorUserOperation.js.map