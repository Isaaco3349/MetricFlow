import type { Hex } from "viem";
export type TokenSymbolsMap = {
    1: "ABT" | "ACH" | "ADX" | "AGLD" | "AIOZ" | "ALEPH" | "ALI" | "ALICE" | "ALPHA" | "AMP" | "ANKR" | "ANT" | "APE" | "API3" | "ARB" | "ASM" | "AUDIO" | "AXL" | "AXS" | "BADGER" | "BAL" | "BIGTIME" | "BIT" | "BLUR" | "BLZ" | "BNT" | "BOND" | "BTRST" | "BUSD" | "CBETH" | "CELR" | "CHR" | "CHZ" | "COTI" | "COVAL" | "CQT" | "CRO" | "CRPT" | "CRV" | "CTSI" | "CUBE" | "CVC" | "CVX" | "DAI" | "DAR" | "DDX" | "DENT" | "DEXT" | "DIA" | "DPI" | "DYP" | "ELA" | "ELON" | "ENJ" | "ENS" | "ERN" | "EUL" | "EURC" | "FARM" | "FET" | "FIS" | "FORTH" | "FRAX" | "FTM" | "FXS" | "GAL" | "GFI" | "GHST" | "GLM" | "GNO" | "GODS" | "GRT" | "GTC" | "GUSD" | "HFT" | "HIGH" | "ILV" | "IMX" | "INDEX" | "INJ" | "INV" | "IOTX" | "JASMY" | "JUP" | "KEEP" | "KP3R" | "LCX" | "LDO" | "LINK" | "LOKA" | "LPT" | "LQTY" | "LRC" | "LUSD" | "MANA" | "MASK" | "MATH" | "MATIC" | "MCO2" | "MDT" | "METIS" | "MIM" | "MIR" | "MLN" | "MONA" | "MPL" | "MTL" | "MUSE" | "MXC" | "NCT" | "NEXO" | "NMR" | "OCEAN" | "OGN" | "ONEINCH" | "ORN" | "OXT" | "PAXG" | "PERP" | "PLA" | "POLS" | "POLY" | "POWR" | "PRIME" | "PRQ" | "PYUSD" | "QNT" | "QUICK" | "RAD" | "RAI" | "RARE" | "RARI" | "REN" | "REP" | "REQ" | "REVV" | "RLC" | "RLY" | "RNDR" | "SHIB" | "SNT" | "SOL" | "SPELL" | "STORJ" | "SUPER" | "SUSHI" | "SWFTC" | "SYLO" | "SYN" | "TBTC" | "TOKE" | "TONE" | "TRAC" | "TRB" | "TRIBE" | "TRU" | "TVK" | "UNI" | "USDC" | "USDT" | "VGX" | "WAMPL" | "WBTC" | "WETH" | "XCN" | "XSGD" | "YFI" | "YFII";
    5: "6TEST" | "USDC";
    10: "AAVE" | "CRV" | "DAI" | "ENS" | "FRAX" | "LDO" | "LINK" | "LUSD" | "OP" | "PEPE" | "PERP" | "RAI" | "UNI" | "USDC" | "USDT" | "WBTC" | "WETH";
    56: "AAVE" | "ADA" | "AVAX" | "BTCB" | "BUSD" | "CAKE" | "DAI" | "DOGE" | "DOT" | "ETH" | "FET" | "FRAX" | "FTM" | "HIGH" | "HOOK" | "LINK" | "MATIC" | "MBOX" | "MIM" | "SHIB" | "STG" | "TRON" | "TWT" | "UNI" | "USDC" | "USDT" | "WBNB" | "XRP";
    97: "6TEST" | "USDC";
    137: "AAVE" | "AGEUR" | "ANKR" | "BUSD" | "COMP" | "CRV" | "DAI" | "DPI" | "DYDX" | "FORT" | "FRAX" | "GHST" | "GNS" | "GRT" | "IOTX" | "LDO" | "LINK" | "MANA" | "MKR" | "MLN" | "ONEINCH" | "OXT" | "RNDR" | "SHIB" | "SNX" | "SUSHI" | "UNI" | "USDC" | "USDCe" | "USDT" | "VOXEL" | "WBTC" | "WETH";
    420: "ECO" | "6TEST" | "USDC";
    8453: "DAI" | "PRIME" | "TBTC" | "USDbC" | "USDC" | "WAMPL" | "WETH";
    42161: "AAVE" | "ARB" | "BADGER" | "BAL" | "CBETH" | "COMP" | "CRV" | "CTX" | "DAI" | "FRAX" | "GMX" | "GRT" | "KYBER" | "LDO" | "LINK" | "LPT" | "LUSD" | "MATIC" | "SNX" | "SPELL" | "SUSHI" | "TUSD" | "UNI" | "USDC" | "USDCe" | "USDT" | "WBTC" | "WETH";
    43113: "6TEST" | "USDC";
    43114: "BENQI" | "BUSDe" | "DAIe" | "EURC" | "JOE" | "MIM" | "PNG" | "STG" | "USDC" | "USDCe" | "USDT" | "USDTe" | "WAVAX" | "WBTC" | "WETH";
    80001: "6TEST" | "USDC";
    84531: "ECO" | "6TEST" | "USDC";
    84532: "6TEST";
    421613: "USDC" | "6TEST";
    421614: "6TEST";
    11155111: "6TEST" | "USDC";
    11155420: "6TEST";
};
export declare const gasTokenAddresses: {
    [chainId in keyof TokenSymbolsMap]: {
        [token in TokenSymbolsMap[chainId]]: Hex;
    };
};
//# sourceMappingURL=gasTokenAddresses.d.ts.map