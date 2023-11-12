// Utility for success responses
export const getSuccessResponse = (data: any, status = 200) => {
	return new Response(
		JSON.stringify({
			status: 'success',
			data,
		}),
		{
			status,
			headers: { 'Content-Type': 'application/json' },
		},
	)
}

// Utility for error responses
export const getErrorResponse = (status = 500, message: string, error: Error | null = null) => {
	return new Response(
		JSON.stringify({
			status: status < 500 ? 'fail' : 'error',
			message,
			error,
		}),
		{
			status,
			headers: { 'Content-Type': 'application/json' },
		},
	)
}
