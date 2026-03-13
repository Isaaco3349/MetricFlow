"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteSingleCall = void 0;
const constants_js_1 = require("../../../../constants.js");
const encodeExecuteCall_js_1 = require("./encodeExecuteCall.js");
const encodeExecuteSingleCall = (args, options, includeHooks) => {
    return (0, encodeExecuteCall_js_1.encodeExecuteCall)(args, {
        callType: constants_js_1.CALL_TYPE.SINGLE,
        execType: options.execType
    }, includeHooks);
};
exports.encodeExecuteSingleCall = encodeExecuteSingleCall;
//# sourceMappingURL=encodeExecuteSingleCall.js.map