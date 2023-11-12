import { getErrorResponse, getSuccessResponse } from '@/utils/serverResponses'

// GET /api
export async function GET(req: Request) {
	try {
		// Get params
		const { searchParams } = new URL(req.url)
		console.log({ searchParams })

		// Return success
		return getSuccessResponse(null)
	} catch (error: any) {
		return getErrorResponse(500, error.message, error)
	}
}

// POST /api
export async function POST(req: Request) {
	try {
		// Get params
		const params = await req.json()
		console.log({ params })

		// Return success
		return getSuccessResponse(null)
	} catch (error: any) {
		return getErrorResponse(500, error.message, error)
	}
}
