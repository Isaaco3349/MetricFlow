import { encodeExecuteBatchCall } from "../../ep0_6/encodeExecuteBatchCall.js";
import { encodeExecuteDelegateCall } from "../../ep0_6/encodeExecuteDelegateCall.js";
import { encodeExecuteSingleCall } from "../../ep0_6/encodeExecuteSingleCall.js";
export const encodeCallData = async (calls, callType) => {
    if (calls.length > 1) {
        if (callType === "delegatecall") {
            throw new Error("Cannot batch delegatecall");
        }
        return encodeExecuteBatchCall(calls);
    }
    const call = calls.length === 0 ? undefined : calls[0];
    if (!call) {
        throw new Error("No calls to encode");
    }
    // Default to `call`
    if (!callType || callType === "call") {
        return encodeExecuteSingleCall(call);
    }
    if (callType === "delegatecall") {
        return encodeExecuteDelegateCall({
            to: call.to,
            data: call.data
        });
    }
    throw new Error("Invalid call type");
};
//# sourceMappingURL=encodeCallData.js.map