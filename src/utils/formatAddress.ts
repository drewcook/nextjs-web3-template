/**
 * Converts a long wallet address to a somewhat hidden one, showing the first two characters and the last 4 characters
 * @param address The wallet address abcdefg12345678
 * @returns An obfuscated address ab.................5678
 */
const formatAddress = (address: string | undefined): string => {
	if (!address) return ''
	return address.substring(0, 2) + '..........' + address.substring(address.length - 4)
}

// Variant, good for displaying longer hashes, like the commitment hash
export const formatAddressLong = (address: string): string => {
	if (!address) return ''
	return (
		address.substring(0, 6) +
		'................................................................................................' +
		address.substring(address.length - 4)
	)
}

export default formatAddress
