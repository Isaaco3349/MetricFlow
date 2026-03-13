import { encodeDeployData } from "viem";
import { EXEC_TYPE, safeCreateCallAddress } from "../../../../../constants.js";
import { encodeSafeCreateCall } from "../../common/encodeSafeCreateCall.js";
import { encodeExecuteDelegateCall } from "../../ep0_7/encodeExecuteDelegateCall.js";
export const encodeDeployCallData = (tx) => {
    const deployCalldataArgs = {
        to: safeCreateCallAddress,
        data: encodeSafeCreateCall([0n, encodeDeployData(tx)])
    };
    return encodeExecuteDelegateCall(deployCalldataArgs, {
        execType: EXEC_TYPE.DEFAULT
    });
};
//# sourceMappingURL=encodeDeployCallData.js.map