import { concat, pad, toHex } from "viem";
import { ValidatorMode } from "../../../../../types/index.js";
export const getEncodedPluginsData = async ({ accountAddress, enableSignature, action, validator, validUntil, validAfter }) => {
    const enableData = await validator.getEnableData(accountAddress);
    const enableDataLength = enableData.length / 2 - 1;
    return concat([
        ValidatorMode.enable,
        pad(toHex(validUntil, { size: 6 }), { size: 6 }), // 6 bytes 4 - 10
        pad(toHex(validAfter), { size: 6 }), // 6 bytes 10 - 16
        pad(validator.address, { size: 20 }), // 20 bytes 16 - 36
        pad(action.address, { size: 20 }), // 20 bytes 36 - 56
        pad(toHex(enableDataLength), { size: 32 }), // 32 bytes 56 - 88
        enableData, // 88 - 88 + enableData.length
        pad(toHex(enableSignature.length / 2 - 1), { size: 32 }), // 32 bytes 88 + enableData.length - 120 + enableData.length
        enableSignature // 120 + enableData.length - 120 + enableData.length + enableSignature.length
    ]);
};
//# sourceMappingURL=getEncodedPluginsData.js.map