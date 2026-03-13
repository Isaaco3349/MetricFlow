import { CALL_TYPE } from "../../../../constants.js";
import { encodeExecuteCall } from "./encodeExecuteCall.js";
export const encodeExecuteDelegateCall = (args, options, includeHooks) => {
    return encodeExecuteCall(args, {
        callType: CALL_TYPE.DELEGATE_CALL,
        execType: options.execType
    }, includeHooks);
};
//# sourceMappingURL=encodeExecuteDelegateCall.js.map