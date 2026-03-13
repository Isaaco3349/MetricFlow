"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOperationGasPrice = void 0;
const getUserOperationGasPrice = async (client) => {
    const gasPrice = await client.request({
        method: "zd_getUserOperationGasPrice",
        params: []
    });
    return {
        maxFeePerGas: BigInt(gasPrice.standard.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.standard.maxPriorityFeePerGas)
    };
};
exports.getUserOperationGasPrice = getUserOperationGasPrice;
//# sourceMappingURL=getUserOperationGasPrice.js.map