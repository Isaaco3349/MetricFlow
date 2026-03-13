"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFallbackKernelAccountClient = void 0;
const createFallbackKernelAccountClient = (clients, onError) => {
    function createFallbackMethod(prop) {
        return async (...args) => {
            for (let i = 0; i < clients.length; i++) {
                try {
                    const method = Reflect.get(clients[i], prop);
                    if (typeof method === "function") {
                        return await method(...args);
                    }
                }
                catch (error) {
                    console.error(`Action ${String(prop)} failed with client ${clients[i].transport.url}, trying next if available.`);
                    if (onError !== undefined) {
                        await onError(error, clients[i].transport.url);
                    }
                    if (i === clients.length - 1) {
                        throw error;
                    }
                }
            }
        };
    }
    const proxyClient = new Proxy(clients[0], {
        get(_target, prop, receiver) {
            if (prop === "extend") {
                return (fn) => {
                    const modifications = fn(proxyClient);
                    for (const [key, modification] of Object.entries(modifications)) {
                        if (typeof modification === "function") {
                            ;
                            proxyClient[key] = async (...args) => {
                                return modification(...args);
                            };
                        }
                        else {
                            console.error(`Expected a function for modification of ${key}, but received type ${typeof modification}`);
                        }
                    }
                    return proxyClient;
                };
            }
            const value = Reflect.get(_target, prop, receiver);
            if (typeof value === "function") {
                return createFallbackMethod(prop);
            }
            return value;
        }
    });
    return proxyClient;
};
exports.createFallbackKernelAccountClient = createFallbackKernelAccountClient;
//# sourceMappingURL=fallbackKernelAccountClient.js.map