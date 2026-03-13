"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeDeployCallData = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../../constants.js");
const encodeSafeCreateCall_js_1 = require("../../common/encodeSafeCreateCall.js");
const encodeExecuteDelegateCall_js_1 = require("../../ep0_6/encodeExecuteDelegateCall.js");
const encodeDeployCallData = (tx) => {
    const deployCalldataArgs = {
        to: constants_js_1.safeCreateCallAddress,
        data: (0, encodeSafeCreateCall_js_1.encodeSafeCreateCall)([0n, (0, viem_1.encodeDeployData)(tx)])
    };
    return (0, encodeExecuteDelegateCall_js_1.encodeExecuteDelegateCall)(deployCalldataArgs);
};
exports.encodeDeployCallData = encodeDeployCallData;
//# sourceMappingURL=encodeDeployCallData.js.map