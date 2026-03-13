"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKernelImplementationAddress = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const constants_js_1 = require("../../constants.js");
const getKernelImplementationAddress = async (client, args) => {
    const { address } = args;
    const storageValue = await (0, utils_1.getAction)(client, actions_1.getStorageAt, "getStorageAt")({
        address,
        slot: constants_js_1.KERNEL_IMPLEMENTATION_SLOT
    });
    if (!storageValue) {
        throw new Error("Kernel implementation address not found");
    }
    const addressSlice = (0, utils_1.slice)(storageValue, 12);
    const addressHex = (0, utils_1.isHex)(addressSlice) ? addressSlice : (0, utils_1.toHex)(addressSlice);
    return (0, utils_1.getAddress)(addressHex);
};
exports.getKernelImplementationAddress = getKernelImplementationAddress;
//# sourceMappingURL=getKernelImplementationAddress.js.map