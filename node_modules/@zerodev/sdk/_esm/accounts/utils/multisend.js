import { encodePacked, toBytes } from "viem";
export const MULTISEND_ADDRESS = "0x8ae01fcf7c655655ff2c6ef907b8b4718ab4e17c";
export const multiSendAbi = [
    {
        type: "function",
        name: "multiSend",
        inputs: [{ type: "bytes", name: "transactions" }]
    }
];
const encodeCall = (call) => {
    const data = toBytes(call.data);
    const encoded = encodePacked(["uint8", "address", "uint256", "uint256", "bytes"], [
        call.callType === "delegatecall" ? 1 : 0,
        call.to,
        call.value || 0n,
        BigInt(data.length),
        call.data
    ]);
    return encoded.slice(2);
};
export const encodeMultiSend = (calls) => {
    if (!Array.isArray(calls)) {
        throw new Error("Invalid multiSend calls, should use an array of calls");
    }
    return `0x${calls.map((call) => encodeCall(call)).join("")}`;
};
//# sourceMappingURL=multisend.js.map