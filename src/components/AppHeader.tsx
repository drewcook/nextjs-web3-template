'use client'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'

import ConnectWalletButton from './ConnectWalletButton'

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

const AppHeader = () => {
	return (
		<Box sx={styles.wrap}>
			<AppBar position="static" elevation={0} sx={styles.appBar}>
				<Toolbar>
					<Typography variant="h6" sx={styles.toolBar}>
						LOGO GOES HERE
					</Typography>
					<ConnectWalletButton />
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default AppHeader
