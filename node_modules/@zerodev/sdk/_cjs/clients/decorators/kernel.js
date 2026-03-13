"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kernelAccountClientActions = exports.zerodevPaymasterActions = void 0;
const getKernelV3ModuleCurrentNonce_js_1 = require("../../actions/account-client/getKernelV3ModuleCurrentNonce.js");
const getUserOperationGasPrice_js_1 = require("../../actions/account-client/getUserOperationGasPrice.js");
const invalidateNonce_js_1 = require("../../actions/account-client/invalidateNonce.js");
const sendTransaction_js_1 = require("../../actions/account-client/sendTransaction.js");
const signMessage_js_1 = require("../../actions/account-client/signMessage.js");
const signTypedData_js_1 = require("../../actions/account-client/signTypedData.js");
const upgradeKernel_js_1 = require("../../actions/account-client/upgradeKernel.js");
const writeContract_js_1 = require("../../actions/account-client/writeContract.js");
const index_js_1 = require("../../actions/index.js");
const estimateGasInERC20_js_1 = require("../../actions/paymaster/estimateGasInERC20.js");
const sponsorUserOperation_js_1 = require("../../actions/paymaster/sponsorUserOperation.js");
const zerodevPaymasterActions = () => (client) => ({
    sponsorUserOperation: async (args) => (0, sponsorUserOperation_js_1.sponsorUserOperation)(client, {
        ...args
    }),
    estimateGasInERC20: async (args) => (0, estimateGasInERC20_js_1.estimateGasInERC20)(client, args)
});
exports.zerodevPaymasterActions = zerodevPaymasterActions;
function kernelAccountClientActions() {
    return (client) => ({
        signUserOperation: (args) => (0, index_js_1.signUserOperation)(client, args),
        getUserOperationGasPrice: async () => (0, getUserOperationGasPrice_js_1.getUserOperationGasPrice)(client),
        uninstallPlugin: async (args) => (0, index_js_1.uninstallPlugin)(client, args),
        changeSudoValidator: async (args) => (0, index_js_1.changeSudoValidator)(client, args),
        invalidateNonce: async (args) => (0, invalidateNonce_js_1.invalidateNonce)(client, args),
        getKernelV3ModuleCurrentNonce: async () => (0, getKernelV3ModuleCurrentNonce_js_1.getKernelV3ModuleCurrentNonce)(client),
        upgradeKernel: async (args) => (0, upgradeKernel_js_1.upgradeKernel)(client, args),
        sendTransaction: (args) => (0, sendTransaction_js_1.sendTransaction)(client, args),
        signMessage: (args) => (0, signMessage_js_1.signMessage)(client, args),
        signTypedData: (args) => (0, signTypedData_js_1.signTypedData)(client, args),
        writeContract: (args) => (0, writeContract_js_1.writeContract)(client, args)
    });
}
exports.kernelAccountClientActions = kernelAccountClientActions;
//# sourceMappingURL=kernel.js.map