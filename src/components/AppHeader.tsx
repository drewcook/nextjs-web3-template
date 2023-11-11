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

import ConnectWalletButton from './ConnectWalletButton'

const styles = {
	appBar: { backgroundColor: grey[900] },
	navigationMobileWrap: { display: { xs: 'flex', md: 'none' }, flexGrow: 1, alignItems: 'center', mr: 1 },
	navigationMobileMenu: { display: { xs: 'block', md: 'none' } },
	navigationDesktopWrap: { display: { xs: 'none', md: 'flex' }, flexGrow: 1, alignItems: 'center' },
	logoMobile: {
		mx: 2,
		display: { xs: 'flex', md: 'none' },
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
	userMenuWrap: { flexGrow: 0 },
	userMenu: { mt: '45px' },
}

const AppHeader = () => {
	// App Title
	const dappTitleText = 'WEB3DAPP'

	// Navigation Pages
	const pages = [
		{
			text: 'Dashboard',
			href: '/dashboard',
		},
	]
	const userMenuItems = ['Switch Network', 'Switch Wallet', 'Disconnect']

	// State
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	// Hooks
	const { address, isConnected } = useAccount()
	const { disconnect } = useDisconnect()
	const { data: ensName } = useEnsName({ address })
	const { data: ensAvatar } = useEnsAvatar({ name: ensName })
	const { open } = useWeb3Modal()

	// Handlers
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

	// Components
	const MenuNavigationItems = pages.map(page => (
		<Link key={page.text} href={page.href}>
			<MenuItem onClick={handleCloseNavMenu}>
				<Typography textAlign="center">{page.text}</Typography>
			</MenuItem>
		</Link>
	))

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
							sx={styles.navigationMobileMenu}
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
						>
							{MenuNavigationItems}
						</Menu>
						<Link href="/">
							<Typography variant="h5" noWrap sx={styles.logoMobile}>
								{dappTitleText}
							</Typography>
						</Link>
					</Box>

					{/* Desktop Navigation */}
					<Box sx={styles.navigationDesktopWrap}>
						<Link href="/">
							<Typography variant="h5" noWrap sx={styles.logoDesktop}>
								{dappTitleText}
							</Typography>
						</Link>
						{MenuNavigationItems}
					</Box>

					{/* User Menu */}
					<Box sx={styles.userMenuWrap}>
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
									{userMenuItems.map(item => (
										<MenuItem key={item} onClick={() => handleCloseUserMenu(item)}>
											<Typography textAlign="center">{item}</Typography>
										</MenuItem>
									))}
								</Menu>
							</>
						) : (
							<ConnectWalletButton />
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default AppHeader
