import { encodeAbiParameters } from "viem";
import { CALL_TYPE } from "../../../../constants.js";
import { encodeExecuteCall } from "./encodeExecuteCall.js";
export const encodeExecuteBatchCall = (args, options, includeHooks) => {
    const calldata = encodeAbiParameters([
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
    return encodeExecuteCall({ calldata }, {
        callType: CALL_TYPE.BATCH,
        execType: options.execType
    }, includeHooks);
};
//# sourceMappingURL=encodeExecuteBatchCall.js.map