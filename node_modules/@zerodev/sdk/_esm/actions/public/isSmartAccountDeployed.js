import { getCode } from "viem/actions";
import { getAction } from "viem/utils";
export const isSmartAccountDeployed = async (client, address) => {
    const code = await getAction(client, getCode, "getCode")({
        address
    });
    const deployed = Boolean(code);
    return deployed;
};
//# sourceMappingURL=isSmartAccountDeployed.js.map