"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteSingleCall = void 0;
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("../../abi/KernelAccountAbi.js");
const encodeExecuteSingleCall = (args) => {
    return (0, viem_1.encodeFunctionData)({
        abi: KernelAccountAbi_js_1.KernelExecuteAbi,
        functionName: "execute",
        args: [args.to, args.value || 0n, args.data || "0x", 0]
    });
};
exports.encodeExecuteSingleCall = encodeExecuteSingleCall;
//# sourceMappingURL=encodeExecuteSingleCall.js.map