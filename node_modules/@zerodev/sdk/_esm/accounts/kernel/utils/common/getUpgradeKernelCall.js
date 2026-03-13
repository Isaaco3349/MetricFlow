import { encodeFunctionData } from "viem";
import { KernelVersionToAddressesMap } from "../../../../constants.js";
import { validateKernelVersionWithEntryPoint } from "../../../../utils.js";
import { KernelV3AccountAbi } from "../../abi/kernel_v_3_0_0/KernelAccountAbi.js";
export function getUpgradeKernelCall(account, kernelVersion) {
    validateKernelVersionWithEntryPoint(account.entryPoint.version, kernelVersion);
    const implementation = KernelVersionToAddressesMap[kernelVersion].accountImplementationAddress;
    return {
        to: account.address,
        data: encodeFunctionData({
            abi: KernelV3AccountAbi,
            functionName: "upgradeTo",
            args: [implementation]
        }),
        value: 0n
    };
}
//# sourceMappingURL=getUpgradeKernelCall.js.map