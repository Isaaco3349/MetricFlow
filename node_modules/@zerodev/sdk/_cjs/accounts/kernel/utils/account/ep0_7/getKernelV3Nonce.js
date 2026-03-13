"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKernelV3Nonce = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const KernelAccountAbi_js_1 = require("../../../abi/kernel_v_3_0_0/KernelAccountAbi.js");
const getKernelV3Nonce = async (client, accountAddress) => {
    try {
        const nonce = await (0, utils_1.getAction)(client, actions_1.readContract, "readContract")({
            abi: KernelAccountAbi_js_1.KernelV3AccountAbi,
            address: accountAddress,
            functionName: "currentNonce",
            args: []
        });
        return nonce === 0 ? 1 : nonce;
    }
    catch (error) {
        return 1;
    }
};
exports.getKernelV3Nonce = getKernelV3Nonce;
//# sourceMappingURL=getKernelV3Nonce.js.map