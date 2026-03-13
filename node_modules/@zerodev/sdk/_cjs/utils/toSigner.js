"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSigner = void 0;
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const actions_1 = require("viem/actions");
async function toSigner({ signer, address }) {
    if ("type" in signer &&
        (signer.type === "local" || signer.type === "smart")) {
        return signer;
    }
    let walletClient = undefined;
    if ("request" in signer && !signer?.account) {
        if (!address) {
            address = (await Promise.any([
                signer.request({
                    method: "eth_requestAccounts"
                }),
                signer.request({
                    method: "eth_accounts"
                })
            ]))[0];
        }
        if (!address) {
            throw new Error("address is required");
        }
        walletClient = (0, viem_1.createWalletClient)({
            account: address,
            transport: (0, viem_1.custom)(signer)
        });
    }
    if (!walletClient) {
        walletClient = signer;
    }
    return (0, accounts_1.toAccount)({
        address: walletClient.account.address,
        async signMessage({ message }) {
            return (0, actions_1.signMessage)(walletClient, { message });
        },
        async signTypedData(typedData) {
            const { primaryType, domain, message, types } = typedData;
            return (0, actions_1.signTypedData)(walletClient, {
                primaryType,
                domain,
                message,
                types
            });
        },
        async signTransaction(_) {
            throw new Error("Smart account signer doesn't need to sign transactions");
        },
        async signAuthorization(authorization) {
            return (0, actions_1.signAuthorization)(walletClient, authorization);
        }
    });
}
exports.toSigner = toSigner;
//# sourceMappingURL=toSigner.js.map