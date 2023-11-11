import { Abi, Address, getAddress } from 'viem'
import { sepolia } from 'wagmi'

import { simpleNftAbi } from '../../abis/SimpleNFT'

export type ContractABIPair = {
	ADDRESS: Address
	ABI: Abi
}

type ContractDeployments = {
	NFT_COLLECTION: ContractABIPair
}

// TODO: Add in contract deployments and their ABIs for each network supported
const SEPOLIA: ContractDeployments = {
	// SimpleNFT: https://sepolia.etherscan.io/address/0x096FbFe07E9e0f56d2Ef77270B1450579711E076
	NFT_COLLECTION: {
		ADDRESS: getAddress('0x096FbFe07E9e0f56d2Ef77270B1450579711E076', sepolia.id),
		ABI: simpleNftAbi,
	},
}

const CONTRACTS = {
	SEPOLIA,
}

export default CONTRACTS
