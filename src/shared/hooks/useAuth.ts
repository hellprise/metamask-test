"use client"

import { useMutation } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { AuthService } from "@/services/auth/auth.service"

import { STORAGE_KEYS } from "@/shared/constants/common.constants"
import { saveToStorage } from "@/shared/lib/saveToStorage"
import { IAuthForm, IMetamaskLoginResponse } from "@/shared/types/auth.interface"
import { IMetamaskUser } from "@/shared/types/user.interface"

export const useAuth = () => {
	const [user, setUser] = useState<string | undefined>(undefined)

	const { mutateAsync: register, isSuccess } = useMutation({
		mutationKey: ["register"],
		mutationFn: (user: IAuthForm) => AuthService.register(user),
		onSuccess: data => {
			saveToStorage<string>(STORAGE_KEYS.USER, data.user.username)
			toast.success("User created")
		},
		onError: (error: any) => {
			toast.error(error.response.data.message)
		}
	})

	const { mutateAsync: login, isSuccess: isSuccessLogin } = useMutation({
		mutationKey: ["login"],
		mutationFn: (user: IAuthForm) => AuthService.login(user),
		onSuccess: data => {
			saveToStorage<string>(STORAGE_KEYS.USER, data.user.username)
			toast.success("Successfully logged in")
		},
		onError: (error: any) => {
			toast.error(error.response.data.message)
		}
	})

	const { mutateAsync: getRandomString, data } = useMutation({
		mutationKey: ["getRandomString"],
		mutationFn: (address: string) => AuthService.getRandomString(address),
		onSuccess: () => {
			localStorage.setItem(STORAGE_KEYS.IS_METAMASK, JSON.stringify(true))
		},
		onError: () => {
			toast.error("Could not get nonce")
		}
	})

	const { mutateAsync: loginViaMetamask, isSuccess: isLoginMetamaskSuccess } =
		useMutation({
			mutationKey: ["login via metamask"],
			mutationFn: (data: IMetamaskLoginResponse) =>
				AuthService.loginViaMetamask(data.address, data.signature),
			onSuccess: data => {
				saveToStorage<string>(STORAGE_KEYS.USER, data.user.username)
				toast.success(data.message)
			},
			onError: () => {
				toast.error("User not logged in via metamask")
			}
		})

	const { mutateAsync: registerViaMetamask, isSuccess: isRegisterMetamaskSuccess } =
		useMutation({
			mutationKey: ["register via metamask"],
			mutationFn: (data: IMetamaskUser) => AuthService.registerViaMetamask(data),
			onSuccess: data => {
				saveToStorage<string>(STORAGE_KEYS.USER, data.user.username)
				toast.success("User created via metamask")
			},
			onError: (error: any) => {
				toast.error(error.response.data.message)
			}
		})

	const { mutateAsync: logout, isSuccess: isLogoutSuccess } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => AuthService.logout(),
		onSuccess: data => {
			localStorage.removeItem(STORAGE_KEYS.USER)
			localStorage.removeItem(STORAGE_KEYS.IS_METAMASK)
			toast.success(data.message)
		},
		onError: () => {
			toast.error("Something went wrong")
		}
	})

	useEffect(() => {
		const user = localStorage.getItem(STORAGE_KEYS.USER)

		if (user) setUser(JSON.parse(user))
		else setUser(undefined)
	}, [
		user,
		isSuccess,
		isLogoutSuccess,
		isRegisterMetamaskSuccess,
		isSuccessLogin,
		isLoginMetamaskSuccess
	])

	// return {
	// 	register,
	// 	login,
	// 	loginViaMetamask,
	// 	registerViaMetamask,
	// 	getRandomString,
	// 	logout,
	// 	user,
	// 	nonce: data?.nonce
	// }
	return useMemo(() => {
		return {
			register,
			login,
			loginViaMetamask,
			registerViaMetamask,
			getRandomString,
			logout,
			user,
			nonce: data?.nonce
		}
	}, [
		data?.nonce,
		getRandomString,
		login,
		loginViaMetamask,
		logout,
		register,
		registerViaMetamask,
		user
	])
}
