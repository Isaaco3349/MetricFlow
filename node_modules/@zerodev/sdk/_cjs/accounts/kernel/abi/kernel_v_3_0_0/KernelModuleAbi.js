"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelModuleIsModuleInstalledAbi = exports.KernelModuleInstallAbi = exports.KernelModuleIsInitializedAbi = void 0;
exports.KernelModuleIsInitializedAbi = [
    {
        type: "function",
        name: "isInitialized",
        inputs: [
            { name: "smartAccount", type: "address", internalType: "address" }
        ],
        outputs: [{ name: "", type: "bool", internalType: "bool" }],
        stateMutability: "view"
    }
];
exports.KernelModuleInstallAbi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "moduleType",
                type: "uint256"
            },
            { internalType: "address", name: "module", type: "address" },
            { internalType: "bytes", name: "initData", type: "bytes" }
        ],
        stateMutability: "payable",
        type: "function",
        name: "installModule"
    }
];
exports.KernelModuleIsModuleInstalledAbi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "moduleType",
                type: "uint256"
            },
            { internalType: "address", name: "module", type: "address" },
            {
                internalType: "bytes",
                name: "additionalContext",
                type: "bytes"
            }
        ],
        stateMutability: "view",
        type: "function",
        name: "isModuleInstalled",
        outputs: [{ internalType: "bool", name: "", type: "bool" }]
    }
];
//# sourceMappingURL=KernelModuleAbi.js.map