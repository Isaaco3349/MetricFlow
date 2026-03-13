import { type Hex } from "viem";
import { CALL_TYPE } from "../../../../constants.js";
import { getExecMode } from "../../../../utils.js";
import type { CallArgs, DelegateCallArgs } from "../types.js";
export type EncodeExecuteOptions = Parameters<typeof getExecMode>[0];
type EncodeExecuteCallArgs<TOptions> = (TOptions extends {
    callType: CALL_TYPE.DELEGATE_CALL;
} ? DelegateCallArgs : CallArgs) | {
    calldata: Hex;
};
export declare const encodeExecuteCall: <TOptions extends {
    callType: CALL_TYPE;
    execType: import("../../../../constants.js").EXEC_TYPE;
}>(args: EncodeExecuteCallArgs<TOptions>, options: TOptions, includeHooks?: boolean) => `0x${string}`;
export {};
//# sourceMappingURL=encodeExecuteCall.d.ts.map