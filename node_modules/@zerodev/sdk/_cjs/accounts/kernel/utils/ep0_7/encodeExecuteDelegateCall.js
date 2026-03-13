"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteDelegateCall = void 0;
const constants_js_1 = require("../../../../constants.js");
const encodeExecuteCall_js_1 = require("./encodeExecuteCall.js");
const encodeExecuteDelegateCall = (args, options, includeHooks) => {
    return (0, encodeExecuteCall_js_1.encodeExecuteCall)(args, {
        callType: constants_js_1.CALL_TYPE.DELEGATE_CALL,
        execType: options.execType
    }, includeHooks);
};
exports.encodeExecuteDelegateCall = encodeExecuteDelegateCall;
//# sourceMappingURL=encodeExecuteDelegateCall.js.map