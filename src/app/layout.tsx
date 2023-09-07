import './globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { Box, ThemeProvider } from '@mui/material'
import type { Metadata } from 'next'

import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import theme from '@/lib/theme'

const styles = {
	main: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		p: 6,
		minHeight: 'calc(100vh - calc(64px + 72px))',
	},
}

export const metadata: Metadata = {
	title: 'Next DApp',
	description:
		'A template for building Ethereum-based dApps using Next.js, Material UI, Wagmi/Viem, and WalletConnect.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<ThemeProvider theme={theme}>
					<AppHeader />
					<Box component="main" sx={styles.main}>
						{children}
					</Box>
					<AppFooter />
				</ThemeProvider>
			</body>
		</html>
	)
}
