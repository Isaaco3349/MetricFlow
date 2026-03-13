"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginsEnableTypedData = void 0;
const viem_1 = require("viem");
const getPluginsEnableTypedData = async ({ accountAddress, chainId, kernelVersion, action, validator, validUntil, validAfter }) => {
    return {
        domain: {
            name: "Kernel",
            version: kernelVersion,
            chainId,
            verifyingContract: accountAddress
        },
        types: {
            ValidatorApproved: [
                { name: "sig", type: "bytes4" },
                { name: "validatorData", type: "uint256" },
                { name: "executor", type: "address" },
                { name: "enableData", type: "bytes" }
            ]
        },
        message: {
            sig: action.selector,
            validatorData: (0, viem_1.hexToBigInt)((0, viem_1.concatHex)([
                (0, viem_1.pad)((0, viem_1.toHex)(validUntil ?? 0), {
                    size: 6
                }),
                (0, viem_1.pad)((0, viem_1.toHex)(validAfter ?? 0), {
                    size: 6
                }),
                validator.address
            ]), { size: 32 }),
            executor: action.address,
            enableData: await validator.getEnableData(accountAddress)
        },
        primaryType: "ValidatorApproved"
    };
};
exports.getPluginsEnableTypedData = getPluginsEnableTypedData;
//# sourceMappingURL=getPluginsEnableTypedData.js.map