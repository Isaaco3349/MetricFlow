import { type Hex } from "viem";
import type { KernelSmartAccountImplementation } from "../kernel/createKernelAccount.js";
export declare const MULTISEND_ADDRESS = "0x8ae01fcf7c655655ff2c6ef907b8b4718ab4e17c";
export declare const multiSendAbi: {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
}[];
export declare const encodeMultiSend: (calls: Parameters<KernelSmartAccountImplementation<"0.6">["encodeCalls"]>[0]) => Hex;
//# sourceMappingURL=multisend.d.ts.map