'use client'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import Link from 'next/link'
import { useState } from 'react'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

import formatAddress from '@/utils/formatAddress'

// import Link from 'next/link'
import ConnectWalletButton from './ConnectWalletButton'

const styles = {
	appBar: { backgroundColor: grey[900] },
	navigationMobileWrap: { flexGrow: 0, display: { xs: 'flex', md: 'none' }, mr: 1 },
	navigationMobileMenu: { display: { xs: 'block', md: 'none' } },
	navigationDesktopWrap: { flexGrow: 1, display: { xs: 'none', md: 'flex' } },
	logoMobile: {
		mr: 2,
		display: { xs: 'flex', md: 'none' },
		flexGrow: 1,
		fontFamily: 'monospace',
		fontWeight: 700,
		letterSpacing: '.3rem',
		color: 'inherit',
		textDecoration: 'none',
	},
	logoDesktop: {
		mr: 2,
		display: { xs: 'none', md: 'flex' },
		fontFamily: 'monospace',
		fontWeight: 700,
		letterSpacing: '.3rem',
		color: 'inherit',
		textDecoration: 'none',
	},
	navigationLink: { my: 2, color: 'white', display: 'block' },
	userConnectedButton: { px: 2, py: 0.75 },
	userAvatar: { ml: 1, width: '24px', height: '24px', flexGrow: 0, fontSize: '12px' },
	userMenu: { mt: '45px' },
}

const AppHeader = () => {
	const dappTitleText = 'WEB3DAPP'
	// Navigation Pages
	const pages = [
		{
			text: 'Dashboard',
			href: '/dashboard',
		},
	]
	const settings = ['Switch Network', 'Switch Wallet', 'Disconnect']
	// State
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	// Hooks
	const { address, isConnected } = useAccount()
	const { disconnect } = useDisconnect()
	const { data: ensName } = useEnsName({ address })
	const { data: ensAvatar } = useEnsAvatar({ name: ensName })
	const { open } = useWeb3Modal()

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = (setting: string) => {
		if (setting === 'Switch Network') open({ view: 'Networks' })
		if (setting === 'Switch Wallet') open()
		if (setting === 'Disconnect') disconnect()
		setAnchorElUser(null)
	}

	return (
		<AppBar position="static" elevation={0} sx={styles.appBar}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Mobile Navigation */}
					<Box sx={styles.navigationMobileWrap}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={styles.navigationMobileMenu}
						>
							{pages.map(page => (
								<Link key={page.text} href={page.href}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page.text}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>

					{/* Logo */}
					<Typography variant="h6" noWrap component="a" href="/" sx={styles.logoDesktop}>
						{dappTitleText}
					</Typography>
					<Typography variant="h5" noWrap component="a" href="/" sx={styles.logoMobile}>
						{dappTitleText}
					</Typography>

					{/* Desktop Navigation */}
					<Box sx={styles.navigationDesktopWrap}>
						{pages.map(page => (
							<Link key={page.text} href={page.href}>
								<Button onClick={handleCloseNavMenu} sx={styles.navigationLink}>
									{page.text}
								</Button>
							</Link>
						))}
					</Box>

					{/* Connected User Menu */}
					{isConnected ? (
						<>
							<Tooltip title="Open settings">
								<Button variant="outlined" onClick={handleOpenUserMenu} sx={styles.userConnectedButton}>
									<Typography variant="caption">{ensName || formatAddress(address)}</Typography>
									<Avatar alt="User ENS Avatar" src={`${ensAvatar}`} sx={styles.userAvatar} />
								</Button>
							</Tooltip>
							<Menu
								sx={styles.userMenu}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map(setting => (
									<MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</>
					) : (
						<ConnectWalletButton />
					)}
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default AppHeader
