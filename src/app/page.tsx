import { Paper, Typography } from '@mui/material'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Next DApp',
	description:
		'A template for building Ethereum-based dApps using Next.js, Material UI, Wagmi/Viem, and WalletConnect.',
}

const styles = {
	paper: {
		p: 4,
		textAlign: 'center',
	},
}

const DefaultPage = () => {
	return (
		<Paper sx={styles.paper}>
			<Typography variant="h4" gutterBottom>
				Home Page
			</Typography>
			<Typography>Put some info here</Typography>
		</Paper>
	)
}

export default DefaultPage
