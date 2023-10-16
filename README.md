# Nextjs Web3 Template

This is a template for building a robust frontend application designed to interact with Ethereum-based smart contracts.

It uses the following features:

- Next 13
- React 18
- TypeScript
- Material UI
- Emotion
- Viem
- Wagmi
- WalletConnect v3
- Infura & Alchemy RPC Providers
- ESLint
- Prettier
- Commitlint
- Yarn
- Husky Git Hooks

## Getting Started

### Prerequisites

This template relies on WalletConnect and an RPC provider to connect to Ethereum-compatible networks. Therefore, you must perform the following steps prior to running the app locally:

1. **WalletConnect Project ID** - Set up a new [WalletConnect Project](https://cloud.walletconnect.com/) to obtain the Project ID. Add it to `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` in the `.env` file.
2. **Infura RPC API Key** - For a simple setup, create a new [Infura API Key](https://app.infura.io/dashboard), and add it to `NEXT_PUBLIC_INFURA_RPC_KEY` in the `.env` file.
3. **Alternate: Alchemy RPC API Key** - If you prefer to use Alchemy as an RPC provider instead of Infura, set up a new [Alchemy API Key](https://dashboard.alchemyapi.io/) for the network that you wish to use, and add it to `NEXT_PUBLIC_ALCHEMY_RPC_KEY` in the `.env` file.

### Running the App Locally

1. Install dependencies: `yarn install`
2. Setup environment variables: `cp .env .env.local`
   1. Update values with appropriate keys
   2. Or, comment them out in `src/lib/wagmiConfig.ts`
3. Run development server: `yarn dev`
4. Open browser: `http://localhost:3000`
   1. It will hot reload on each file save
5. Start editing: `src/app/page.tsx`
