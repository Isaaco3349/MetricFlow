import { encodeFunctionData } from "viem";
import { KernelExecuteAbi } from "../../abi/KernelAccountAbi.js";
export const encodeExecuteDelegateCall = (args) => {
    return encodeFunctionData({
        abi: KernelExecuteAbi,
        functionName: "executeDelegateCall",
        args: [args.to, args.data || "0x"]
    });
};
//# sourceMappingURL=encodeExecuteDelegateCall.js.map