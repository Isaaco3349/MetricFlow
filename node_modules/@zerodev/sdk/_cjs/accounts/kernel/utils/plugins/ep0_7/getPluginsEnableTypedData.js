"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginsEnableTypedData = void 0;
const viem_1 = require("viem");
const constants_js_1 = require("../../../../../constants.js");
const getPluginsEnableTypedData = async ({ accountAddress, chainId, kernelVersion, action, hook, validator, validatorNonce }) => {
    return {
        domain: {
            name: "Kernel",
            version: kernelVersion === "0.3.0" ? "0.3.0-beta" : kernelVersion,
            chainId,
            verifyingContract: accountAddress
        },
        types: {
            Enable: [
                { name: "validationId", type: "bytes21" },
                { name: "nonce", type: "uint32" },
                { name: "hook", type: "address" },
                { name: "validatorData", type: "bytes" },
                { name: "hookData", type: "bytes" },
                { name: "selectorData", type: "bytes" }
            ]
        },
        message: {
            validationId: (0, viem_1.concat)([
                constants_js_1.VALIDATOR_TYPE[validator.validatorType],
                (0, viem_1.pad)(validator.getIdentifier(), { size: 20, dir: "right" })
            ]),
            nonce: validatorNonce,
            hook: hook?.getIdentifier() ?? viem_1.zeroAddress,
            validatorData: await validator.getEnableData(accountAddress),
            hookData: (await hook?.getEnableData(accountAddress)) ?? "0x",
            selectorData: (0, viem_1.concat)([
                action.selector,
                action.address,
                action.hook?.address ?? viem_1.zeroAddress,
                (0, viem_1.encodeAbiParameters)((0, viem_1.parseAbiParameters)("bytes selectorInitData, bytes hookInitData"), [constants_js_1.CALL_TYPE.DELEGATE_CALL, "0x0000"])
            ])
        },
        primaryType: "Enable"
    };
};
exports.getPluginsEnableTypedData = getPluginsEnableTypedData;
//# sourceMappingURL=getPluginsEnableTypedData.js.map