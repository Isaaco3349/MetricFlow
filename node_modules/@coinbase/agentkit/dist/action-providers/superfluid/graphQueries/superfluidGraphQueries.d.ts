import { SuperfluidAccountResponse } from "./types";
/**
 * Gets the current account outflows for the user
 *
 * @param userId - The user id of the account
 * @returns The data on the current streams from the agent
 */
export declare function getAccountOutflow(userId: string): Promise<SuperfluidAccountResponse | undefined>;
