"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeSafeCreateCall = void 0;
const viem_1 = require("viem");
const SafeCreateCallAbi_js_1 = require("../../abi/SafeCreateCallAbi.js");
const encodeSafeCreateCall = (args) => {
    return (0, viem_1.encodeFunctionData)({
        abi: SafeCreateCallAbi_js_1.SafeCreateCallAbi,
        functionName: "performCreate",
        args
    });
};
exports.encodeSafeCreateCall = encodeSafeCreateCall;
//# sourceMappingURL=encodeSafeCreateCall.js.map