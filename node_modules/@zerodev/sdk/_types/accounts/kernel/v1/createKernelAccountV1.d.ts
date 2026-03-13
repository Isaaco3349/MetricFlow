import { type Account, type Address, type Assign, type Chain, type EIP1193Provider, type Hex, type LocalAccount, type OneOf, type Transport, type WalletClient } from "viem";
import { type SmartAccount, type SmartAccountImplementation } from "viem/account-abstraction";
import type { CallType, GetEntryPointAbi } from "../../../types/kernel.js";
export type KernelSmartAccountV1Implementation = Assign<SmartAccountImplementation<GetEntryPointAbi<"0.6">, "0.6">, {
    sign: NonNullable<SmartAccountImplementation["sign"]>;
    encodeCalls: (calls: Parameters<SmartAccountImplementation["encodeCalls"]>[0], callType?: CallType | undefined) => Promise<Hex>;
    generateInitCode: () => Promise<Hex>;
    encodeModuleInstallCallData: () => Promise<Hex>;
}>;
export type CreateKernelAccountV1ReturnType = SmartAccount<KernelSmartAccountV1Implementation>;
export declare function createKernelAccountV1(client: KernelSmartAccountV1Implementation["client"], { signer, address, entryPoint, index }: {
    signer: OneOf<EIP1193Provider | WalletClient<Transport, Chain | undefined, Account> | LocalAccount>;
    entryPoint: {
        address: Address;
        version: "0.6";
    };
    address?: Address;
    index?: bigint;
}): Promise<CreateKernelAccountV1ReturnType>;
//# sourceMappingURL=createKernelAccountV1.d.ts.map