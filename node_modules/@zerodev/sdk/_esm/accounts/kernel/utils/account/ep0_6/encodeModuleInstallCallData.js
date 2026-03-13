import { encodeFunctionData } from "viem";
import { KernelAccountAbi } from "../../../abi/KernelAccountAbi.js";
import { encodeCallData } from "./encodeCallData.js";
export const encodeModuleInstallCallData = async ({ accountAddress, enableData, executor, selector, validAfter, validUntil, validator }) => {
    return encodeCallData([
        {
            to: accountAddress,
            value: 0n,
            data: encodeFunctionData({
                abi: KernelAccountAbi,
                functionName: "setExecution",
                args: [
                    selector,
                    executor,
                    validator,
                    validUntil,
                    validAfter,
                    enableData
                ]
            })
        }
    ], "call");
};
//# sourceMappingURL=encodeModuleInstallCallData.js.map