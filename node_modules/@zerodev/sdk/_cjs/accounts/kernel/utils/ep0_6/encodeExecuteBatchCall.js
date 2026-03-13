"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteBatchCall = void 0;
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("../../abi/KernelAccountAbi.js");
const encodeExecuteBatchCall = (args) => {
    return (0, viem_1.encodeFunctionData)({
        abi: KernelAccountAbi_js_1.KernelExecuteAbi,
        functionName: "executeBatch",
        args: [
            args.map((arg) => {
                return {
                    to: arg.to,
                    value: arg.value || 0n,
                    data: arg.data || "0x"
                };
            })
        ]
    });
};
exports.encodeExecuteBatchCall = encodeExecuteBatchCall;
//# sourceMappingURL=encodeExecuteBatchCall.js.map