"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEncodedPluginsData = void 0;
const viem_1 = require("viem");
const index_js_1 = require("../../../../../types/index.js");
const getEncodedPluginsData = async ({ accountAddress, enableSignature, action, validator, validUntil, validAfter }) => {
    const enableData = await validator.getEnableData(accountAddress);
    const enableDataLength = enableData.length / 2 - 1;
    return (0, viem_1.concat)([
        index_js_1.ValidatorMode.enable,
        (0, viem_1.pad)((0, viem_1.toHex)(validUntil, { size: 6 }), { size: 6 }),
        (0, viem_1.pad)((0, viem_1.toHex)(validAfter), { size: 6 }),
        (0, viem_1.pad)(validator.address, { size: 20 }),
        (0, viem_1.pad)(action.address, { size: 20 }),
        (0, viem_1.pad)((0, viem_1.toHex)(enableDataLength), { size: 32 }),
        enableData,
        (0, viem_1.pad)((0, viem_1.toHex)(enableSignature.length / 2 - 1), { size: 32 }),
        enableSignature
    ]);
};
exports.getEncodedPluginsData = getEncodedPluginsData;
//# sourceMappingURL=getEncodedPluginsData.js.map