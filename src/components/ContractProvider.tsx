import { createContext, useContext, useEffect, useState } from 'react'

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
	const [contract1, setContract1] = useState(initialContextValue.erc20)
	const [contract2, setContract2] = useState(initialContextValue.erc721)
	const [contract3, setContract3] = useState(initialContextValue.erc1155)

	// Instantiate the contract instance(s) on mount
	useEffect(() => {
		const contractInstance1 = null
		const contractInstance2 = null
		const contractInstance3 = null
		setContract1(contractInstance1)
		setContract2(contractInstance2)
		setContract3(contractInstance3)
	}, [])

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
