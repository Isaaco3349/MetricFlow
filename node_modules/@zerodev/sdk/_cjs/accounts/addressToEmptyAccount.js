"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressToEmptyAccount = void 0;
const accounts_1 = require("viem/accounts");
function addressToEmptyAccount(address) {
    const account = (0, accounts_1.toAccount)({
        address,
        async signMessage() {
            throw new Error("Method not supported");
        },
        async signTransaction(_transaction) {
            throw new Error("Method not supported");
        },
        async signTypedData(_typedData) {
            throw new Error("Method not supported");
        }
    });
    return {
        ...account,
        publicKey: "0x",
        source: "empty"
    };
}
exports.addressToEmptyAccount = addressToEmptyAccount;
//# sourceMappingURL=addressToEmptyAccount.js.map