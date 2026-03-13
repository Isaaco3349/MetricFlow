"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteDelegateCall = void 0;
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("../../abi/KernelAccountAbi.js");
const encodeExecuteDelegateCall = (args) => {
    return (0, viem_1.encodeFunctionData)({
        abi: KernelAccountAbi_js_1.KernelExecuteAbi,
        functionName: "executeDelegateCall",
        args: [args.to, args.data || "0x"]
    });
};
exports.encodeExecuteDelegateCall = encodeExecuteDelegateCall;
//# sourceMappingURL=encodeExecuteDelegateCall.js.map