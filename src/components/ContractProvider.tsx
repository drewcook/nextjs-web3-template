import { createContext, useContext, useEffect, useState } from 'react'
import { getContract } from 'viem'
import { usePublicClient, useWalletClient } from 'wagmi'

import { erc20ABI, erc721ABI, erc1155ABI } from '../../abis'

// TODO: Update this to be an object relating to each contract being used
type ContractContextValues = {
	erc20: unknown
	erc721: unknown
	erc1155: unknown
}

const initialContextValue: ContractContextValues = {
	erc20: undefined,
	erc721: undefined,
	erc1155: undefined,
}

const ContractContext = createContext<ContractContextValues>(initialContextValue)

type ContractProviderProps = {
	children: React.ReactNode
}

// Context provider component
export const ContractProvider: React.FC<ContractProviderProps> = ({ children }: ContractProviderProps) => {
	// Constants
	const CONTRACT_1_ADDRESS = '0x'
	const CONTRACT_2_ADDRESS = '0x'
	const CONTRACT_3_ADDRESS = '0x'

	// State
	const [contract1, setContract1] = useState(initialContextValue.erc20)
	const [contract2, setContract2] = useState(initialContextValue.erc721)
	const [contract3, setContract3] = useState(initialContextValue.erc1155)

	// Hooks
	const publicClient = usePublicClient()
	const { data } = useWalletClient()

	// Instantiate the contract instance(s) when a wallet client is detected
	useEffect(() => {
		if (data) {
			// Only initialize on first recognition
			if (!contract1) {
				setContract1(
					getContract({
						address: CONTRACT_1_ADDRESS,
						abi: erc20ABI,
						publicClient,
						walletClient: data,
					}),
				)
			}
			if (!contract2) {
				setContract2(
					getContract({
						address: CONTRACT_2_ADDRESS,
						abi: erc721ABI,
						publicClient,
						walletClient: data,
					}),
				)
			}
			if (!contract3) {
				setContract3(
					getContract({
						address: CONTRACT_3_ADDRESS,
						abi: erc1155ABI,
						publicClient,
						walletClient: data,
					}),
				)
			}
		}
	}, [data]) /* eslint-disable-line react-hooks/exhaustive-deps */

	return (
		<ContractContext.Provider
			value={{
				erc20: contract1,
				erc721: contract2,
				erc1155: contract3,
			}}
		>
			{children}
		</ContractContext.Provider>
	)
}

// Context hook
export const useContract = () => {
	const context: ContractContextValues = useContext(ContractContext)
	if (context === undefined) {
		throw new Error('useContract must be used within a ContractProvider component.')
	}
	return context
}
