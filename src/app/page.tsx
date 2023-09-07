import { Box } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next DApp',
	description:
		'A template for building Ethereum-based dApps using Next.js, Material UI, Wagmi/Viem, and WalletConnect.',
}

const DefaultPage = () => {
	return <Box>I&apos;m a page, edit me</Box>
}

export default DefaultPage
