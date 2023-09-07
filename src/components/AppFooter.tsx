'use client'
import { Box, Link, Typography } from '@mui/material'

const styles = {
	wrap: {
		p: 2,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '72px',
	},
}
export interface IAppFooterProps {}

export default function AppFooter(props: IAppFooterProps) {
	return (
		<Box sx={styles.wrap}>
			<Typography variant="caption">
				made with ♡ by{' '}
				<Link href="https://dco.dev" target="_blank" underline="always" color="inherit">
					dco
				</Link>
			</Typography>
			<Typography variant="caption">&copy;{new Date().getFullYear()}</Typography>
		</Box>
	)
}
