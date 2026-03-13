import { encodeFunctionData } from "viem";
import { KernelExecuteAbi } from "../../abi/KernelAccountAbi.js";
export const encodeExecuteBatchCall = (args) => {
    return encodeFunctionData({
        abi: KernelExecuteAbi,
        functionName: "executeBatch",
        args: [
            args.map((arg) => {
                return {
                    to: arg.to,
                    value: arg.value || 0n,
                    data: arg.data || "0x"
                };
            })
        ]
    });
};
//# sourceMappingURL=encodeExecuteBatchCall.js.map