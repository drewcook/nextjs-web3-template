'use client'
import { Grid, Paper, Typography } from '@mui/material'

import { useContract } from '@/components/ContractProvider'

const styles = {
	paper: {
		p: 4,
		textAlign: 'center',
	},
}

const Dashboard: React.FC = () => {
	const { erc20 } = useContract()

	console.log({ erc20 })

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Paper sx={styles.paper}>
						<Typography variant="h4" gutterBottom>
							Your Dashboard
						</Typography>
						<Typography>Put some info here</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper sx={styles.paper}>
						<Typography variant="h4" gutterBottom>
							More Information
						</Typography>
						<Typography>Put some info here</Typography>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default Dashboard
