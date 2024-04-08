"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import Web3 from "web3"

import { Button, Input } from "@/shared/components/ui"
import { IAuthForm } from "@/shared/types/auth.interface"

import { useAuth } from "../../../shared/hooks/useAuth"
import { FormType } from "../modal/modal.interface"
import { UserInfo } from "../user/UserInfo"

import { MetamaskButton } from "./metamask/MetamaskButton"

const staticText = {
	login: "Login",
	signup: "Register"
}

export function Form({ variant }: { variant: FormType }) {
	const [isMetamask, setIsMetamask] = useState(false)

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: "onChange"
	})

	const {
		register: createUser,
		registerViaMetamask,
		getRandomString,
		login,
		user
	} = useAuth()

	const onSubmit = async (data: IAuthForm) => {
		if (!isMetamask) {
			if (variant === "signup") createUser(data)
			else login(data)
		} else {
			if (variant === "signup") {
				try {
					if (window.ethereum) {
						const web3 = new Web3(window.ethereum)
						await window.ethereum.request({ method: "eth_requestAccounts" })
						const accounts = await web3.eth.getAccounts()

						const dataNonce = await getRandomString(accounts[0])

						const messageToSign = `Sign-up to TEST_APP ${dataNonce.nonce}`

						const metamaskSignature = await window.ethereum.request({
							method: "personal_sign",
							params: [messageToSign, accounts[0]]
						})

						registerViaMetamask({
							address: accounts[0],
							signature: metamaskSignature,
							username: data.username
						})
					} else {
						toast.error("Metamask not found")
					}
				} catch (error) {
					toast.error("Error during Metamask sign", {
						description: JSON.stringify(error)
					})
				}
			}
		}

		reset()
	}

	return (
		<div className="mt-5 space-y-3">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-3"
			>
				<Input
					placeholder="Enter a username"
					autoComplete="username"
					error={errors.username}
					type="text"
					{...register("username", {
						required: {
							value: true,
							message: "Username is required"
						},
						minLength: {
							value: 3,
							message: "Username must be at least 3 characters"
						},
						maxLength: {
							value: 20,
							message: "Username must be less than 20 characters"
						}
					})}
				/>

				{!isMetamask ? (
					<>
						<Input
							autoComplete="current-password"
							placeholder="Enter a password"
							error={errors.password}
							type="password"
							{...register("password", {
								required: {
									value: true,
									message: "Password is required"
								},
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters"
								}
							})}
						/>

						<Button
							type="submit"
							size="full"
						>
							{staticText[variant]}
						</Button>
					</>
				) : null}

				<MetamaskButton
					setIsMetamask={setIsMetamask}
					isMetamask={isMetamask}
					variant={variant}
				/>
			</form>

			{user && <UserInfo />}
		</div>
	)
}
