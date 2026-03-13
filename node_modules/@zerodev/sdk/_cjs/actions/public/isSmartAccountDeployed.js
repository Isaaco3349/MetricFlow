"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSmartAccountDeployed = void 0;
const actions_1 = require("viem/actions");
const utils_1 = require("viem/utils");
const isSmartAccountDeployed = async (client, address) => {
    const code = await (0, utils_1.getAction)(client, actions_1.getCode, "getCode")({
        address
    });
    const deployed = Boolean(code);
    return deployed;
};
exports.isSmartAccountDeployed = isSmartAccountDeployed;
//# sourceMappingURL=isSmartAccountDeployed.js.map