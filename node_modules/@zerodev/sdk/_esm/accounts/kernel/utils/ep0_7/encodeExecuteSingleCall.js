import { CALL_TYPE } from "../../../../constants.js";
import { encodeExecuteCall } from "./encodeExecuteCall.js";
export const encodeExecuteSingleCall = (args, options, includeHooks) => {
    return encodeExecuteCall(args, {
        callType: CALL_TYPE.SINGLE,
        execType: options.execType
    }, includeHooks);
};
//# sourceMappingURL=encodeExecuteSingleCall.js.map