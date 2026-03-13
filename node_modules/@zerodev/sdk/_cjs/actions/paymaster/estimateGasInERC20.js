"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateGasInERC20 = void 0;
const account_abstraction_1 = require("viem/account-abstraction");
const utils_js_1 = require("../../utils.js");
const estimateGasInERC20 = async (client, args) => {
    const response = await client.request({
        method: "stackup_getERC20TokenQuotes",
        params: [
            {
                chainId: client.chain?.id,
                userOp: {
                    ...(0, utils_js_1.deepHexlify)(args.userOperation),
                    initCode: args.userOperation.initCode || "0x"
                },
                tokenAddress: args.gasTokenAddress,
                entryPointAddress: args.entryPoint ?? account_abstraction_1.entryPoint06Address
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
exports.estimateGasInERC20 = estimateGasInERC20;
//# sourceMappingURL=estimateGasInERC20.js.map