export function floatToStringPrice(price: string): string {
	return parseFloat(parseFloat(price).toFixed(2)).toString()
}
