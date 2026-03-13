"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCallData = void 0;
const encodeExecuteBatchCall_js_1 = require("../../ep0_6/encodeExecuteBatchCall.js");
const encodeExecuteDelegateCall_js_1 = require("../../ep0_6/encodeExecuteDelegateCall.js");
const encodeExecuteSingleCall_js_1 = require("../../ep0_6/encodeExecuteSingleCall.js");
const encodeCallData = async (calls, callType) => {
    if (calls.length > 1) {
        if (callType === "delegatecall") {
            throw new Error("Cannot batch delegatecall");
        }
        return (0, encodeExecuteBatchCall_js_1.encodeExecuteBatchCall)(calls);
    }
    const call = calls.length === 0 ? undefined : calls[0];
    if (!call) {
        throw new Error("No calls to encode");
    }
    if (!callType || callType === "call") {
        return (0, encodeExecuteSingleCall_js_1.encodeExecuteSingleCall)(call);
    }
    if (callType === "delegatecall") {
        return (0, encodeExecuteDelegateCall_js_1.encodeExecuteDelegateCall)({
            to: call.to,
            data: call.data
        });
    }
    throw new Error("Invalid call type");
};
exports.encodeCallData = encodeCallData;
//# sourceMappingURL=encodeCallData.js.map