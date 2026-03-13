"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KernelEIP1193Provider = void 0;
const events_1 = require("events");
const viem_1 = require("viem");
class KernelEIP1193Provider extends events_1.EventEmitter {
    constructor(kernelClient) {
        super();
        Object.defineProperty(this, "kernelClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.kernelClient = kernelClient;
    }
    async request({ method, params = [] }) {
        switch (method) {
            case "eth_requestAccounts":
                return this.handleEthRequestAccounts();
            case "eth_accounts":
                return this.handleEthAccounts();
            case "eth_sendTransaction":
                return this.handleEthSendTransaction(params);
            case "eth_sign":
                return this.handleEthSign(params);
            case "personal_sign":
                return this.handlePersonalSign(params);
            case "eth_signTypedData":
            case "eth_signTypedData_v4":
                return this.handleEthSignTypedDataV4(params);
            default:
                return this.kernelClient.transport.request({ method, params });
        }
    }
    async handleEthRequestAccounts() {
        if (!this.kernelClient.account) {
            return [];
        }
        return [this.kernelClient.account.address];
    }
    async handleEthAccounts() {
        if (!this.kernelClient.account) {
            return [];
        }
        return [this.kernelClient.account.address];
    }
    async handleEthSendTransaction(params) {
        const [tx] = params;
        return this.kernelClient.sendTransaction({
            ...tx,
            value: tx.value ? (0, viem_1.hexToBigInt)(tx.value) : undefined
        });
    }
    async handleEthSign(params) {
        if (!this.kernelClient?.account) {
            throw new Error("account not connected!");
        }
        const [address, message] = params;
        if (address.toLowerCase() !==
            this.kernelClient.account.address.toLowerCase()) {
            throw new Error("cannot sign for address that is not the current account");
        }
        return this.kernelClient.signMessage({
            message,
            account: this.kernelClient.account
        });
    }
    async handlePersonalSign(params) {
        if (!this.kernelClient?.account) {
            throw new Error("account not connected!");
        }
        const [message, address] = params;
        if (address.toLowerCase() !==
            this.kernelClient.account.address.toLowerCase()) {
            throw new Error("cannot sign for address that is not the current account");
        }
        return this.kernelClient.signMessage({
            message,
            account: this.kernelClient.account
        });
    }
    async handleEthSignTypedDataV4(params) {
        if (!this.kernelClient?.account) {
            throw new Error("account not connected!");
        }
        const [address, typedDataJSON] = params;
        const typedData = JSON.parse(typedDataJSON);
        if (address.toLowerCase() !==
            this.kernelClient.account.address.toLowerCase()) {
            throw new Error("cannot sign for address that is not the current account");
        }
        return this.kernelClient.signTypedData({
            account: this.kernelClient.account,
            domain: typedData.domain,
            types: typedData.types,
            message: typedData.message,
            primaryType: typedData.primaryType
        });
    }
}
exports.KernelEIP1193Provider = KernelEIP1193Provider;
//# sourceMappingURL=KernelEIP1193Provider.js.map