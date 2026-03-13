import { encodeFunctionData } from "viem";
import { SafeCreateCallAbi } from "../../abi/SafeCreateCallAbi.js";
export const encodeSafeCreateCall = (args) => {
    return encodeFunctionData({
        abi: SafeCreateCallAbi,
        functionName: "performCreate",
        args
    });
};
//# sourceMappingURL=encodeSafeCreateCall.js.map