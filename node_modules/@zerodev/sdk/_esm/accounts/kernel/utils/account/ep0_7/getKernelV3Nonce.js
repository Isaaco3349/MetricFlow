import { readContract } from "viem/actions";
import { getAction } from "viem/utils";
import { KernelV3AccountAbi } from "../../../abi/kernel_v_3_0_0/KernelAccountAbi.js";
export const getKernelV3Nonce = async (client, accountAddress) => {
    try {
        const nonce = await getAction(client, readContract, "readContract")({
            abi: KernelV3AccountAbi,
            address: accountAddress,
            functionName: "currentNonce",
            args: []
        });
        return nonce === 0 ? 1 : nonce;
    }
    catch (error) {
        return 1;
    }
};
//# sourceMappingURL=getKernelV3Nonce.js.map