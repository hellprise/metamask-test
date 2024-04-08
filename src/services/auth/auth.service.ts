import { getAuthUrl, getMetamaskUrl } from "@/api/api.config"

import { generateId } from "@/shared/lib/genereteId"
import { IAuthForm } from "@/shared/types/auth.interface"
import { IMetamaskUser, IUser } from "@/shared/types/user.interface"

import { axiosClassic } from "@/api"

export const AuthService = {
	login: async (user: IAuthForm) => {
		const response = await axiosClassic
			.post<{ user: IAuthForm }>(getAuthUrl("login"), {
				...user
			})
			.then(res => res.data)

		return { user: response.user }
	},
	register: async (user: IAuthForm) => {
		const response = await axiosClassic.post<{ user: IUser }>(getAuthUrl("register"), {
			id: generateId(),
			...user
		})

		return { user: response.data.user }
	},
	loginViaMetamask: async (address: string, signature: string) => {
		const response = await axiosClassic.post<{
			user: Pick<IUser, "username" | "address">
			message: string
		}>(getAuthUrl(`metamask/sign-in`), {
			address,
			signature
		})

		return response.data
	},
	registerViaMetamask: async (data: IMetamaskUser) => {
		const response = await axiosClassic.post<{ user: IMetamaskUser & { id: string } }>(
			getAuthUrl(`metamask/sign-up`),
			data
		)

		return response.data
	},
	getRandomString: async (address: string) => {
		const response = await axiosClassic.post<{ nonce: string }>(
			getMetamaskUrl(`?walletAddress=${address}`)
		)

		return response.data
	},
	logout: async () => {
		const response = await axiosClassic.post<{ message: string }>(getAuthUrl(`logout`))

		return response.data
	}
}
