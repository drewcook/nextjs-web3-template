import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { Abi, Address, getContract, GetContractReturnType, parseEther } from 'viem'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'

import { CONTRACTS } from '@/constants'

// Types
type TxHash = Address | undefined
type ContractReadArgs = { address: Address; abi: Abi; functionName: string; args?: unknown[] }
type ContractWriteArgs = { address: Address; abi: Abi; functionName: string; args: unknown[]; value?: number }
type ContractContextValues = {
	executeContractRead: (args: ContractReadArgs) => Promise<unknown>
	executeContractWrite: (args: ContractWriteArgs) => Promise<[unknown, TxHash]>
	txSuccess: boolean
	txError: string | null
	resetTxNotifications: () => void
	// TODO: Add in fields representing each contract being used
	nft: GetContractReturnType
}
type ContractProviderProps = {
	children: React.ReactNode
}

// Create context with initial values
const ContractContext = createContext<ContractContextValues>({
	executeContractRead: () => Promise.resolve(undefined),
	executeContractWrite: () => Promise.resolve([undefined, undefined]),
	txSuccess: false,
	txError: null,
	resetTxNotifications: () => {},
	nft: {} as GetContractReturnType,
})

// Context provider component
export const ContractProvider: React.FC<ContractProviderProps> = ({ children }: ContractProviderProps) => {
	// State
	const [txSuccess, setTxSuccess] = useState<boolean>(false)
	const [txError, setTxError] = useState<string | null>(null)
	const [nft, setNft] = useState<GetContractReturnType>({} as GetContractReturnType)

	// Hooks
	const publicClient = usePublicClient()
	const { data: walletClient } = useWalletClient()
	const { address: account } = useAccount()

	// Provide a way to reset notification states
	const resetTxNotifications = () => {
		setTxSuccess(false)
		setTxError(null)
	}

	// Provide contract read helper
	const executeContractRead = useCallback(
		async ({ address, abi, functionName, args }: ContractReadArgs): Promise<unknown> => {
			try {
				if (functionName === 'balance') return await publicClient.getBalance({ address })
				else
					return await publicClient.readContract({
						address,
						abi,
						functionName,
						args,
					})
			} catch (error: any) {
				throw error
			}
		},
		[publicClient],
	)

	// Provide contract write helper
	const executeContractWrite = useCallback(
		async ({ address, abi, functionName, args, value }: ContractWriteArgs): Promise<[unknown, TxHash]> => {
			try {
				const { request, result } = await publicClient.simulateContract({
					account,
					address,
					abi,
					functionName,
					args,
					value: value ? parseEther(`${value}`) : undefined,
				})
				const txHash = await walletClient?.writeContract(request)
				setTxSuccess(true)
				setTxError(null)
				return [result, txHash]
			} catch (error: any) {
				setTxSuccess(false)
				setTxError(error.message)
				throw error
			}
		},
		[publicClient, walletClient, account],
	)

	// Instantiate the contract instance(s) when a new wallet/public client is detected
	useEffect(() => {
		if (walletClient && publicClient) {
			setNft(
				getContract({
					address: CONTRACTS.SEPOLIA.NFT_COLLECTION.ADDRESS,
					abi: CONTRACTS.SEPOLIA.NFT_COLLECTION.ABI,
					publicClient,
					walletClient,
				}),
			)
		}
	}, [walletClient, publicClient])

	return (
		<ContractContext.Provider
			value={{
				nft,
				executeContractRead,
				executeContractWrite,
				txSuccess,
				txError,
				resetTxNotifications,
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
