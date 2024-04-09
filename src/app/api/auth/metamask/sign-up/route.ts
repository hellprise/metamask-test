import { cookies } from "next/headers"
import { NextRequest } from "next/server"

import { getMainUrl } from "@/api/api.config"

import { COOKIE_KEYS } from "@/shared/constants/common.constants"
import { IMetamaskLoginResponse } from "@/shared/types/auth.interface"
import { IUser } from "@/shared/types/user.interface"

// export const runtime = "edge"
export const runtime = "nodejs"

export async function POST(request: NextRequest) {
	const cookieStore = cookies()

	const requestData: IMetamaskLoginResponse & { username: string } = await request.json()

	const users: IUser[] = await fetch(getMainUrl(``)).then(res => res.json())

	const isUserExists = users.some(
		user => user.username === requestData.username || user.address === requestData.address
	)

	if (isUserExists)
		return Response.json({ message: "User already exists" }, { status: 409 })

	const res = await fetch(getMainUrl(``), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(requestData)
	})

	const data = (await res.json()) as Omit<IUser, "password">

	cookieStore.set(COOKIE_KEYS.WALLET_ADDRESS, requestData.address)

	return Response.json({
		user: data
	})
}
