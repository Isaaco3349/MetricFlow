export type SuperfluidAccountResponse = {
    accounts: Account[];
};
type Account = {
    isSuperApp: boolean;
    inflows: Flow[];
    outflows: Flow[];
    accountTokenSnapshots: AccountTokenSnapshot[];
};
type Flow = {
    currentFlowRate: string;
    token: Token;
    receiver: Receiver;
};
type Token = {
    symbol?: string;
    id?: string;
};
type Receiver = {
    id: string;
};
type AccountTokenSnapshot = {
    token: Token;
    totalNumberOfActiveStreams: number;
    totalNetFlowRate: string;
};
export {};
