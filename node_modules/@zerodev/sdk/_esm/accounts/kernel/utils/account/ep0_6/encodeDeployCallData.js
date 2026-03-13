import { encodeDeployData } from "viem";
import { safeCreateCallAddress } from "../../../../../constants.js";
import { encodeSafeCreateCall } from "../../common/encodeSafeCreateCall.js";
import { encodeExecuteDelegateCall } from "../../ep0_6/encodeExecuteDelegateCall.js";
export const encodeDeployCallData = (tx) => {
    const deployCalldataArgs = {
        to: safeCreateCallAddress,
        data: encodeSafeCreateCall([0n, encodeDeployData(tx)])
    };
    return encodeExecuteDelegateCall(deployCalldataArgs);
};
//# sourceMappingURL=encodeDeployCallData.js.map