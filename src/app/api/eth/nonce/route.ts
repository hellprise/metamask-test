// import { cookies } from "next/headers"
import { NextRequest } from "next/server"

export const runtime = "edge"
// export const runtime = "nodejs"

export async function POST(request: NextRequest) {
	// const cookieStore = cookies()
	const { searchParams } = new URL(request.url)
	const walletAddress = searchParams.get("walletAddress")

	if (!walletAddress) {
		return Response.json({ message: "Wallet address is required" }, { status: 400 })
	}

	// cookieStore.set("walletAddress", walletAddress)

	const generateRandomString = () => {
		return (
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15)
		)
	}

	return Response.json({ nonce: generateRandomString() })
}
