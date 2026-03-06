# ⚡ MetricFlow

> **Turn Farcaster likes & recasts into automatic on-chain rewards on Base.**

[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=flat&logo=coinbase)](https://base.org)
[![Powered by AgentKit](https://img.shields.io/badge/Powered%20by-AgentKit-0052FF?style=flat)](https://github.com/coinbase/agentkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

**Website:** https://isaaco3349.github.io/MetricFlow  
**GitHub:** https://github.com/isaaco3349/MetricFlow

---

## 🎯 What is MetricFlow?

MetricFlow is an agentic system that monitors your Farcaster casts in real time. When someone **likes or recasts** your post, the agent automatically:

1. ✅ **Sends them ETH on Base** as a reward
2. ✅ **Adds them to an allowlist** for future drops, gating, or airdrops
3. ✅ **Attributes every transaction** to your Builder Code via ERC-8021

No manual work. No middlemen. Fully automated and onchain.

---

## 🗺️ Architecture

```
Farcaster Cast (someone likes/recasts)
         │
         ▼
 Neynar Webhook ──► MetricFlow Server (Express)
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
     Allowlist Service          Reward Engine
     (adds to JSON file)    (sends ETH via AgentKit)
                                        │
                                        ▼
                              Base Chain ✅ (ERC-8021 attributed)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- [Neynar](https://neynar.com) account (free)
- [Coinbase Developer Platform](https://portal.cdp.coinbase.com) account (free)
- [ngrok](https://ngrok.com) for local webhook exposure

### 1. Clone & Install
```bash
git clone https://github.com/isaaco3349/MetricFlow.git
cd MetricFlow
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Fill in your `.env`:

| Variable | Where to get it |
|---|---|
| `NEYNAR_API_KEY` | [dev.neynar.com](https://dev.neynar.com) |
| `NEYNAR_WEBHOOK_SECRET` | Neynar dashboard → Webhooks |
| `CDP_API_KEY_NAME` | [portal.cdp.coinbase.com](https://portal.cdp.coinbase.com) |
| `CDP_API_KEY_PRIVATE_KEY` | Same as above |

### 3. Run Setup Wizard
```bash
npm run setup
```

This generates your Base wallet and prints your address.

### 4. Fund Your Wallet
Get free testnet ETH at [portal.cdp.coinbase.com/products/faucet](https://portal.cdp.coinbase.com/products/faucet)

### 5. Start MetricFlow
```bash
npm run dev
```

---

## ⚙️ Configuration

| Variable | Default | Description |
|---|---|---|
| `NETWORK_ID` | `base-sepolia` | `base` for mainnet, `base-sepolia` for testnet |
| `REWARD_AMOUNT_WEI` | `100000000000000` | ETH reward per engagement (0.0001 ETH) |
| `DRY_RUN` | `false` | Log actions without sending transactions |

---

## 🔗 ERC-8021 Attribution

Every transaction MetricFlow sends includes the ERC-8021 builder attribution suffix. This means:

- MetricFlow appears on the **Base Leaderboard**
- Every reward sent = **onchain credit** for the builder
- Future Base rewards distributed based on **Weekly Transacting Users (WTUs)**

Builder Code: `bc_5s50punj`  
App ID: `69a9396d0050dd24efcc1e16`

---

## 📂 Project Structure

```
MetricFlow/
├── index.html              ← Project website (GitHub Pages)
├── src/
│   ├── agent/
│   │   ├── wallet.ts       ← CDP wallet + ERC-8021 attribution
│   │   └── rewardEngine.ts ← Core reward logic
│   ├── services/
│   │   ├── neynar.ts       ← Farcaster webhook parsing
│   │   └── allowlist.ts    ← Allowlist management
│   ├── types/index.ts      ← TypeScript types
│   ├── utils/
│   │   ├── config.ts       ← Environment validation
│   │   └── logger.ts       ← Structured logging
│   ├── webhooks/server.ts  ← Express webhook server
│   └── index.ts            ← Main entrypoint
├── scripts/setup.ts        ← First-run setup wizard
├── .env.example
└── package.json
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [Base](https://base.org) | L2 chain — where rewards land |
| [Coinbase AgentKit](https://github.com/coinbase/agentkit) | On-chain transactions |
| [Neynar](https://neynar.com) | Farcaster API & webhooks |
| TypeScript + Express | Agent runtime |

---

## 🗺️ Roadmap

- [ ] ERC-20 token rewards
- [ ] NFT minting for top engagers
- [ ] Dashboard UI for monitoring
- [ ] Cooldown periods per user
- [ ] Multi-cast monitoring

---

## 📄 License

MIT © [isaaco3349](https://github.com/isaaco3349)

---

*Built with ❤️ on Base · Powered by Coinbase AgentKit*
