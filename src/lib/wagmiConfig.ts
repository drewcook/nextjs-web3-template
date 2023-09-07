import { configureChains, Connector, createConfig } from 'wagmi'
import { mainnet, optimism, sepolia } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { LedgerConnector } from 'wagmi/connectors/ledger'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

export const { chains, publicClient, webSocketPublicClient } = configureChains(
	// Support several networks
	[sepolia, optimism, mainnet],

	// Prefer Alchemy, then Infura, then fallback
	[
		alchemyProvider({ apiKey: `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_KEY}` }),
		infuraProvider({ apiKey: `${process.env.NEXT_PUBLIC_INFURA_RPC_KEY}` }),
		publicProvider(),
	],
)

// Setup wallet connectors with many options
const connectors: Connector[] = [
	new MetaMaskConnector({
		chains,
		// options: {
		// 	shimDisconnect: true,
		// },
	}),
	new LedgerConnector({
		chains,
		options: {
			projectId: `${process.env.NEXT_PUBLIC_LEDGER_PROJECT_ID}`,
		},
	}),
	// new WalletConnectLegacyConnector({
	// 	options: {
	// 		qrcode: true,
	// 	},
	// }),
	new WalletConnectConnector({
		chains,
		options: {
			projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`,
		},
	}),
	new InjectedConnector({
		chains,
		options: {
			name: 'Browser Wallet',
			shimDisconnect: true,
		},
	}),
]

// Stitch together the wagmi config
const wagmiConfig = createConfig({
	autoConnect: false,
	connectors,
	publicClient,
	webSocketPublicClient,
})

export default wagmiConfig
