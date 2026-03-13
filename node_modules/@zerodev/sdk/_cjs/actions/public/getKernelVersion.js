"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKernelVersion = void 0;
const viem_1 = require("viem");
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const constants_js_1 = require("../../constants.js");
const getKernelVersion = async (client, args) => {
    const { address } = args;
    const storageValue = await (0, utils_1.getAction)(client, actions_1.getStorageAt, "getStorageAt")({
        address,
        slot: constants_js_1.KERNEL_IMPLEMENTATION_SLOT
    });
    if (!storageValue) {
        throw new Error("Kernel version not found");
    }
    const addressSlice = (0, utils_1.slice)(storageValue, 12);
    const addressHex = (0, utils_1.isHex)(addressSlice) ? addressSlice : (0, utils_1.toHex)(addressSlice);
    const kernelImplementationAddress = (0, utils_1.getAddress)(addressHex);
    if ((0, utils_1.isAddressEqual)(kernelImplementationAddress, viem_1.zeroAddress)) {
        return null;
    }
    const kernelVersion = Object.keys(constants_js_1.KernelVersionToAddressesMap).find((version) => (0, utils_1.isAddressEqual)(constants_js_1.KernelVersionToAddressesMap[version]
        .accountImplementationAddress, kernelImplementationAddress));
    if (!kernelVersion) {
        return null;
    }
    return kernelVersion;
};
exports.getKernelVersion = getKernelVersion;
//# sourceMappingURL=getKernelVersion.js.map