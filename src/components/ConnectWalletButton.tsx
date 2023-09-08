import LanguageIcon from '@mui/icons-material/Language'
import { Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { Connector, useConnect } from 'wagmi'

const styles = {
	button: {
		py: 1,
	},
	walletText: {
		pl: 1,
	},
}

const ConnectWalletButton = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

	const menuOpen = Boolean(anchorEl)

	const handleConnect = (connector: Connector) => {
		connect({ connector })
		setAnchorEl(null)
	}

	return (
		<>
			{error && (
				<Typography color="error" mr={2}>
					{error.message}
				</Typography>
			)}
			<Button
				id="connect-wallet-button"
				variant="contained"
				color="primary"
				size="small"
				sx={styles.button}
				onClick={e => setAnchorEl(e.currentTarget)}
				aria-controls={menuOpen ? 'wallet-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={menuOpen ? 'true' : undefined}
			>
				Connect Wallet
			</Button>
			<Menu
				id="wallet-menu"
				anchorEl={anchorEl}
				open={menuOpen}
				onClose={() => setAnchorEl(null)}
				MenuListProps={{
					'aria-labelledby': 'connect-wallet-button',
				}}
			>
				{connectors.map(connector => (
					<MenuItem key={connector.id} onClick={() => handleConnect(connector)}>
						<ListItemIcon>
							{connector.name === 'MetaMask' && <Image src="/metamask.png" alt="mm" width="36" height="36" />}
							{connector.name === 'Ledger' && <Image src="/ledger.png" alt="mm" width="36" height="36" />}
							{connector.name === 'WalletConnect' && <Image src="/walletconnect.png" alt="mm" width="36" height="36" />}
							{connector.name === 'Browser Wallet' && <LanguageIcon fontSize="large" />}
						</ListItemIcon>
						<ListItemText sx={styles.walletText}>
							{connector.name}
							{!connector.ready && ' (unsupported)'}
							{isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
						</ListItemText>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}

export default ConnectWalletButton
