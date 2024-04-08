import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

import { getMainUrl } from "@/api/api.config"

import { COOKIE_KEYS } from "@/shared/constants/common.constants"
import { IUser } from "@/shared/types/user.interface"

export async function POST(request: NextRequest, response: NextResponse) {
	const cookieStore = cookies()

	const requestData: IUser = await request.json()

	const users: IUser[] = await fetch(getMainUrl(``)).then(res => res.json())

	const isUserExists = users.some(user => user.username === requestData.username)

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

	const data = (await res.json()) as IUser

	cookieStore.set(COOKIE_KEYS.ID, data.id)

	return Response.json({
		user: data
	})
}
