"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZeroDevPaymasterClient = void 0;
const viem_1 = require("viem");
const account_abstraction_1 = require("viem/account-abstraction");
const kernel_js_1 = require("./decorators/kernel.js");
const createZeroDevPaymasterClient = (parameters) => {
    const { key = "public", name = "ZeroDev Paymaster Client", transport } = parameters;
    const client = (0, viem_1.createClient)({
        ...parameters,
        transport: (opts) => {
            return transport({
                ...opts,
                retryCount: 0
            });
        },
        key,
        name,
        type: "zerodevPaymasterClient"
    });
    return client.extend(account_abstraction_1.paymasterActions).extend((0, kernel_js_1.zerodevPaymasterActions)());
};
exports.createZeroDevPaymasterClient = createZeroDevPaymasterClient;
//# sourceMappingURL=paymasterClient.js.map