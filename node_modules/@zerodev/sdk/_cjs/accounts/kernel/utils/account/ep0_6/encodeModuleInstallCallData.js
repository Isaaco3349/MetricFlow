"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeModuleInstallCallData = void 0;
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("../../../abi/KernelAccountAbi.js");
const encodeCallData_js_1 = require("./encodeCallData.js");
const encodeModuleInstallCallData = async ({ accountAddress, enableData, executor, selector, validAfter, validUntil, validator }) => {
    return (0, encodeCallData_js_1.encodeCallData)([
        {
            to: accountAddress,
            value: 0n,
            data: (0, viem_1.encodeFunctionData)({
                abi: KernelAccountAbi_js_1.KernelAccountAbi,
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
exports.encodeModuleInstallCallData = encodeModuleInstallCallData;
//# sourceMappingURL=encodeModuleInstallCallData.js.map