"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProviderSet = exports.setPimlicoAsProvider = void 0;
const setPimlicoAsProvider = (urlString) => {
    const url = new URL(urlString);
    const params = url.searchParams;
    if (params.has("bundlerProvider")) {
        params.set("bundlerProvider", "PIMLICO");
    }
    else if (params.has("paymasterProvider")) {
        params.set("paymasterProvider", "PIMLICO");
    }
    else {
        params.set("provider", "PIMLICO");
    }
    url.search = params.toString();
    return url.toString();
};
exports.setPimlicoAsProvider = setPimlicoAsProvider;
const isProviderSet = (urlString, provider) => {
    const url = new URL(urlString);
    const params = url.searchParams;
    const _provider = params.get("provider") ??
        params.get("bundlerProvider") ??
        params.get("paymasterProvider");
    if (_provider === provider)
        return true;
    return false;
};
exports.isProviderSet = isProviderSet;
//# sourceMappingURL=utils.js.map