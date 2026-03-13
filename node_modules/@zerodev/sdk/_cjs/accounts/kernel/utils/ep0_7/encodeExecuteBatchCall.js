"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeExecuteBatchCall = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../constants.js");
const encodeExecuteCall_js_1 = require("./encodeExecuteCall.js");
const encodeExecuteBatchCall = (args, options, includeHooks) => {
    const calldata = (0, viem_1.encodeAbiParameters)([
        {
            name: "executionBatch",
            type: "tuple[]",
            components: [
                {
                    name: "target",
                    type: "address"
                },
                {
                    name: "value",
                    type: "uint256"
                },
                {
                    name: "callData",
                    type: "bytes"
                }
            ]
        }
    ], [
        args.map((arg) => {
            return {
                target: arg.to,
                value: arg.value || 0n,
                callData: arg.data || "0x"
            };
        })
    ]);
    return (0, encodeExecuteCall_js_1.encodeExecuteCall)({ calldata }, {
        callType: constants_js_1.CALL_TYPE.BATCH,
        execType: options.execType
    }, includeHooks);
};
exports.encodeExecuteBatchCall = encodeExecuteBatchCall;
//# sourceMappingURL=encodeExecuteBatchCall.js.map