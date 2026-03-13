export const getUserOperationGasPrice = async (client) => {
    const gasPrice = await client.request({
        method: "zd_getUserOperationGasPrice",
        params: []
    });
    return {
        maxFeePerGas: BigInt(gasPrice.standard.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(gasPrice.standard.maxPriorityFeePerGas)
    };
};
//# sourceMappingURL=getUserOperationGasPrice.js.map