import { type KernelPluginManager } from "@zerodev/sdk";
import type { CallType, EntryPointType, GetEntryPointAbi, GetKernelVersion, PluginMigrationData, Signer } from "@zerodev/sdk/types";
import { type Address, type Assign, type EncodeDeployDataParameters, type Hex, type SignableMessage } from "viem";
import { type EntryPointVersion, type SmartAccount, type SmartAccountImplementation } from "viem/account-abstraction";
import type { SignAuthorizationReturnType } from "viem/accounts";
type SignMessageParameters = {
    message: SignableMessage;
    useReplayableSignature?: boolean;
};
export type KernelSmartAccount7702Implementation<entryPointVersion extends EntryPointVersion = "0.7"> = Assign<SmartAccountImplementation<GetEntryPointAbi<entryPointVersion>, entryPointVersion>, {
    sign: NonNullable<SmartAccountImplementation["sign"]>;
    encodeCalls: (calls: Parameters<SmartAccountImplementation["encodeCalls"]>[0], callType?: CallType | undefined) => Promise<Hex>;
    kernelVersion: GetKernelVersion<entryPointVersion>;
    kernelPluginManager: KernelPluginManager<entryPointVersion>;
    factoryAddress: Address | undefined;
    accountImplementationAddress: Address;
    generateInitCode: () => Promise<Hex>;
    encodeModuleInstallCallData: () => Promise<Hex>;
    encodeDeployCallData: ({ abi, args, bytecode }: EncodeDeployDataParameters) => Promise<Hex>;
    signMessage: (parameters: SignMessageParameters) => Promise<Hex>;
    signAuthorization: () => Promise<SignAuthorizationReturnType | undefined>;
}>;
export type Create7702KernelAccountReturnType<entryPointVersion extends EntryPointVersion = "0.7"> = SmartAccount<KernelSmartAccount7702Implementation<entryPointVersion>>;
export type Create7702KernelAccountParameters<entryPointVersion extends EntryPointVersion> = {
    signer: Signer;
    plugins?: Omit<KernelPluginManager<entryPointVersion>, "entryPoint" | "kernelVersion"> | KernelPluginManager<entryPointVersion>;
    entryPoint: EntryPointType<entryPointVersion>;
    accountImplementationAddress?: Address;
    kernelVersion: GetKernelVersion<entryPointVersion>;
    pluginMigrations?: PluginMigrationData[];
    eip7702Auth?: SignAuthorizationReturnType;
};
/**
 * Build a kernel smart account from a private key, that use the ECDSA signer behind the scene
 * @param client
 * @param privateKey
 * @param entryPoint
 * @param index
 * @param factoryAddress
 * @param accountImplementationAddress
 * @param ecdsaValidatorAddress
 * @param address
 */
export declare function create7702KernelAccount<entryPointVersion extends EntryPointVersion>(client: KernelSmartAccount7702Implementation["client"], { signer, plugins, entryPoint, accountImplementationAddress: _accountImplementationAddress, kernelVersion, pluginMigrations, eip7702Auth }: Create7702KernelAccountParameters<entryPointVersion>): Promise<Create7702KernelAccountReturnType<entryPointVersion>>;
export {};
//# sourceMappingURL=create7702KernelAccount.d.ts.map