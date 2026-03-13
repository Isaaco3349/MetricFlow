"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKernelV3ModuleCurrentNonce = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const KernelAccountAbi_js_1 = require("../../accounts/kernel/abi/kernel_v_3_0_0/KernelAccountAbi.js");
const index_js_1 = require("../../errors/index.js");
async function getKernelV3ModuleCurrentNonce(client) {
    const account_ = client.account;
    if (!account_)
        throw new index_js_1.AccountNotFoundError({
            docsPath: "/docs/actions/wallet/sendTransaction"
        });
    const account = (0, utils_1.parseAccount)(account_);
    try {
        const nonce = await (0, utils_1.getAction)(client, actions_1.readContract, "readContract")({
            abi: KernelAccountAbi_js_1.KernelV3AccountAbi,
            address: account.address,
            functionName: "currentNonce",
            args: []
        });
        return nonce;
    }
    catch (error) {
        return 1;
    }
}
exports.getKernelV3ModuleCurrentNonce = getKernelV3ModuleCurrentNonce;
//# sourceMappingURL=getKernelV3ModuleCurrentNonce.js.map