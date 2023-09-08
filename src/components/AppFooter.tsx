'use client'
import { Box, Link, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

const styles = {
	wrap: {
		p: 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '72px',
		backgroundColor: grey[900],
	},
}

const AppFooter = () => {
	return (
		<Box sx={styles.wrap}>
			<Typography variant="caption">
				&copy;{new Date().getFullYear()}&nbsp;|&nbsp;made with ♡ by{' '}
				<Link href="https://dco.dev" target="_blank" underline="always" color="inherit">
					dco
				</Link>
			</Typography>
		</Box>
	)
}

export default AppFooter
