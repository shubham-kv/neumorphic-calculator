export const isNumber = (str: string) =>
	!isNaN(str as unknown as number) && !isNaN(parseFloat(str))
