"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionSelector = void 0;
const viem_1 = require("viem");
const KernelAccountAbi_js_1 = require("../../abi/KernelAccountAbi.js");
const KernelAccountAbi_js_2 = require("../../abi/kernel_v_3_0_0/KernelAccountAbi.js");
const getActionSelector = (entryPointVersion) => {
    if (entryPointVersion === "0.6") {
        return (0, viem_1.toFunctionSelector)((0, viem_1.getAbiItem)({ abi: KernelAccountAbi_js_1.KernelAccountAbi, name: "execute" }));
    }
    else if (entryPointVersion === "0.7") {
        return (0, viem_1.toFunctionSelector)((0, viem_1.getAbiItem)({ abi: KernelAccountAbi_js_2.KernelV3AccountAbi, name: "execute" }));
    }
    else {
        throw new Error("Unsupported entry point version");
    }
};
exports.getActionSelector = getActionSelector;
//# sourceMappingURL=getActionSelector.js.map