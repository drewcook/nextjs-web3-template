import LanguageIcon from '@mui/icons-material/Language'
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { Connector, useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import formatAddress from '@/utils/formatAddress'

const styles = {
	connectedText: {
		ml: 1,
		mr: 2,
	},
}

const ConnectWalletButton = (): JSX.Element => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const { address, isConnected } = useAccount()
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
	const { data: ensName } = useEnsName({ address })
	const { data: ensAvatar } = useEnsAvatar({ name: ensName })
	const { disconnect } = useDisconnect()

	const menuOpen = Boolean(anchorEl)

	const handleConnect = (connector: Connector) => {
		connect({ connector })
		setAnchorEl(null)
	}

	const handleDisconnectWallet = () => {
		disconnect()
	}

	if (isConnected) {
		console.log({ ensName })
		return (
			<Box>
				<Image src={ensAvatar ?? ''} alt="ENS Avatar" />
				<Typography variant="caption" sx={styles.connectedText}>
					Connected to {ensName ? ensName : formatAddress(address)}
				</Typography>
				{/* TODO: Add in small network status */}
				<Button variant="outlined" color="primary" onClick={handleDisconnectWallet}>
					Disconnect
				</Button>
			</Box>
		)
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
							<LanguageIcon />
						</ListItemIcon>
						<ListItemText>
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
