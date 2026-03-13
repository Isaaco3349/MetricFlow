"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeMultiSend = exports.multiSendAbi = exports.MULTISEND_ADDRESS = void 0;
const viem_1 = require("viem");
exports.MULTISEND_ADDRESS = "0x8ae01fcf7c655655ff2c6ef907b8b4718ab4e17c";
exports.multiSendAbi = [
    {
        type: "function",
        name: "multiSend",
        inputs: [{ type: "bytes", name: "transactions" }]
    }
];
const encodeCall = (call) => {
    const data = (0, viem_1.toBytes)(call.data);
    const encoded = (0, viem_1.encodePacked)(["uint8", "address", "uint256", "uint256", "bytes"], [
        call.callType === "delegatecall" ? 1 : 0,
        call.to,
        call.value || 0n,
        BigInt(data.length),
        call.data
    ]);
    return encoded.slice(2);
};
const encodeMultiSend = (calls) => {
    if (!Array.isArray(calls)) {
        throw new Error("Invalid multiSend calls, should use an array of calls");
    }
    return `0x${calls.map((call) => encodeCall(call)).join("")}`;
};
exports.encodeMultiSend = encodeMultiSend;
//# sourceMappingURL=multisend.js.map