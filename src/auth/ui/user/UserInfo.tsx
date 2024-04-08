"use client"

import { Button } from "@/shared/components/ui"
import { useAuth } from "@/shared/hooks/useAuth"

export function UserInfo() {
	const { user, logout } = useAuth()

	const logoutUser = () => logout()

	return (
		user && (
			<div className="mb-5 flex items-center gap-x-5">
				<p className="text-sm font-medium">Hello, {user}</p>

				<Button
					onClick={logoutUser}
					size="sm"
				>
					Logout
				</Button>
			</div>
		)
	)
}
