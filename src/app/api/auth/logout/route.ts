import { cookies } from "next/headers"

import { COOKIE_KEYS } from "@/shared/constants/common.constants"

export async function POST() {
	const cookieStore = cookies()

	cookieStore.delete(COOKIE_KEYS.ID)
	cookieStore.delete(COOKIE_KEYS.WALLET_ADDRESS)

	return Response.json({
		success: true,
		message: "You have been logged out"
	})
}
