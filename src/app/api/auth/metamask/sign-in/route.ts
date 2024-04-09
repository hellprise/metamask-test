import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { getMainUrl } from "@/api/api.config"

import { COOKIE_KEYS } from "@/shared/constants/common.constants"
import { IMetamaskLoginResponse } from "@/shared/types/auth.interface"
import { IUser } from "@/shared/types/user.interface"

export const runtime = "edge"
// export const runtime = "nodejs"

export async function POST(request: NextRequest, response: NextResponse) {
	const cookieStore = cookies()

	const requestData: IMetamaskLoginResponse = await request.json()

	if (!requestData.address || !requestData.signature) {
		return Response.json(
			{ message: "Wallet address and signature is required" },
			{ status: 400 }
		)
	}

	const res = await fetch(getMainUrl(`?address=${requestData.address}`), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then(res => res.json() as Promise<IUser[]>)

	if (!res || res.length === 0)
		return NextResponse.json(
			{ message: "User with metamask not found", status: 404 },
			{ status: 404 }
		)

	cookieStore.set(COOKIE_KEYS.WALLET_ADDRESS, requestData.address)

	return Response.json(
		{
			user: { username: res[0].username, address: res[0].address },
			message: "Login via metamask successful"
		},
		{ status: 200 }
	)
}
