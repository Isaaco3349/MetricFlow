"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeCreateCallAbi = void 0;
const viem_1 = require("viem");
exports.SafeCreateCallAbi = (0, viem_1.parseAbi)([
    "function performCreate(uint256 value, bytes memory deploymentData) public returns (address newContract)",
    "function performCreate2(uint256 value, bytes memory deploymentData, bytes32 salt) public returns (address newContract)"
]);
//# sourceMappingURL=SafeCreateCallAbi.js.map