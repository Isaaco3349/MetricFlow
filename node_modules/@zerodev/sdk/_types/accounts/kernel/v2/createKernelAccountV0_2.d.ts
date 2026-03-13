import { type Address } from "viem";
import type { KernelPluginManager, KernelPluginManagerParams } from "../../../types/kernel.js";
import type { CreateKernelAccountReturnType, KernelSmartAccountImplementation } from "../createKernelAccount.js";
/**
 * Default addresses for kernel smart account
 */
export declare const KERNEL_ADDRESSES: {
    FACTORY_ADDRESS: Address;
    ENTRYPOINT_V0_6: Address;
};
/**
 * Build a kernel smart account from a private key, that use the ECDSA signer behind the scene
 * @param client
 * @param privateKey
 * @param entryPoint
 * @param index
 * @param factoryAddress
 * @param ecdsaValidatorAddress
 * @param deployedAccountAddress
 */
export declare function createKernelAccountV0_2(client: KernelSmartAccountImplementation["client"], { plugins, entryPoint, index, factoryAddress, address }: {
    plugins: Omit<KernelPluginManagerParams<"0.6">, "entryPoint" | "kernelVersion"> | KernelPluginManager<"0.6">;
    entryPoint: {
        address: Address;
        version: "0.6";
    };
    index?: bigint;
    factoryAddress?: Address;
    address?: Address;
}): Promise<CreateKernelAccountReturnType<"0.6">>;
//# sourceMappingURL=createKernelAccountV0_2.d.ts.map