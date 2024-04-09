import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { getMainUrl } from "@/api/api.config"

import { COOKIE_KEYS } from "@/shared/constants/common.constants"
import { IAuthForm } from "@/shared/types/auth.interface"
import { IUser } from "@/shared/types/user.interface"

// export const runtime = "edge"
// export const runtime = "nodejs"

export async function POST(request: NextRequest, response: NextResponse) {
	const cookieStore = cookies()

	const requestData: IAuthForm = await request.json()

	const res = await fetch(getMainUrl(`?username=${requestData.username}`), {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		}
	}).then(res => res.json() as Promise<IUser[]>)

	if (!res || res.length === 0)
		return NextResponse.json({ message: "User not found", status: 404 }, { status: 404 })

	const isSamePassword = requestData.password === res[0].password

	if (!isSamePassword)
		return Response.json({ message: "Wrong password", status: 401 }, { status: 401 })

	cookieStore.set(COOKIE_KEYS.ID, res[0].id)

	return Response.json(
		{
			user: res[0]
		},
		{
			status: 200
		}
	)
}
