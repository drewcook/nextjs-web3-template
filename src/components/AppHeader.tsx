'use client'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const styles = {
	wrap: {
		flexGrow: 1,
		height: '64px',
	},
	appBar: {},
	toolBar: {
		flexGrow: 1,
	},
}

export interface IAppHeaderProps {}

export default function AppHeader(props: IAppHeaderProps) {
	const handleConnectWallet = () => {
		console.log('hello')
	}

	return (
		<Box sx={styles.wrap}>
			<AppBar position="static" elevation={0} sx={styles.appBar}>
				<Toolbar>
					<Typography variant="h6" sx={styles.toolBar}>
						LOGO GOES HERE
					</Typography>
					<Button variant="contained" color="primary" onClick={handleConnectWallet}>
						Connect Wallet
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
