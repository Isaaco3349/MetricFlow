/// <reference types="node" />
import { EventEmitter } from "events";
import type { EIP1193Parameters, EIP1193RequestFn } from "viem";
import type { KernelAccountClient } from "../clients/kernelAccountClient.js";
export declare class KernelEIP1193Provider extends EventEmitter {
    private kernelClient;
    constructor(kernelClient: KernelAccountClient);
    request({ method, params }: EIP1193Parameters): ReturnType<EIP1193RequestFn>;
    private handleEthRequestAccounts;
    private handleEthAccounts;
    private handleEthSendTransaction;
    private handleEthSign;
    private handlePersonalSign;
    private handleEthSignTypedDataV4;
}
//# sourceMappingURL=KernelEIP1193Provider.d.ts.map