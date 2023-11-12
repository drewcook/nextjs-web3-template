'use client'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

import { useContract } from '@/components/ContractProvider'

const styles = {
	paper: {
		p: 4,
		textAlign: 'center',
	},
	button: {
		display: 'block',
		my: 2,
		mx: 'auto',
	},
}

const Dashboard: React.FC = () => {
	// Hooks
	const { nft, executeContractRead, executeContractWrite } = useContract()
	const { isConnected } = useAccount()
	const { open } = useWeb3Modal()

	// Handlers
	const handleMint = async () => {
		try {
			if (!isConnected) return open()

			const [result, hash] = await executeContractWrite({
				address: nft.address,
				abi: nft.abi,
				functionName: 'mint',
				args: ['exampleTokenURI'],
			})

			console.log({ result, hash })
		} catch (e) {
			console.error(e)
		}
	}

	const handleGetName = async () => {
		try {
			const result = await executeContractRead({ address: nft.address, abi: nft.abi, functionName: 'name' })
			console.log({ result })
		} catch (e) {
			console.error(e)
		}
	}

	const handleGetTokenURI = async (tokenId: number) => {
		try {
			const result = await executeContractRead({
				address: nft.address,
				abi: nft.abi,
				functionName: 'tokenURI',
				args: [tokenId],
			})
			console.log({ result })
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Paper sx={styles.paper}>
						<Typography variant="h4" gutterBottom>
							Your Dashboard
						</Typography>
						<Typography gutterBottom>Put some info here</Typography>
						<Button onClick={handleMint} variant="outlined" sx={styles.button}>
							Mint NFT
						</Button>
						{nft.address && (
							<>
								<Button onClick={handleGetName} variant="outlined" sx={styles.button}>
									Get NFT Name
								</Button>
								<Button onClick={() => handleGetTokenURI(1)} variant="outlined" sx={styles.button}>
									Get TokenURI
								</Button>
							</>
						)}
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
