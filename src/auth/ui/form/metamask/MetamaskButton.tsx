import Image from "next/image"
import { toast } from "sonner"
import Web3 from "web3"

import { Button } from "@/shared/components/ui"

import { useAuth } from "../../../../shared/hooks/useAuth"
import { FormType } from "../../modal/modal.interface"

declare global {
	interface Window {
		ethereum?: any
	}
}

interface MetamaskButtonProps {
	setIsMetamask: (value: boolean) => void
	isMetamask: boolean
	variant: FormType
}

export const MetamaskButton = ({
	setIsMetamask,
	isMetamask,
	variant
}: MetamaskButtonProps) => {
	const { getRandomString, loginViaMetamask } = useAuth()

	const connectAndSign = async (e: any) => {
		e.preventDefault()

		try {
			if (window.ethereum) {
				const web3 = new Web3(window.ethereum)
				await window.ethereum.request({ method: "eth_requestAccounts" })
				const accounts = await web3.eth.getAccounts()

				const data = await getRandomString(accounts[0])

				const messageToSign =
					variant === "login"
						? `Sign-in to TEST_APP ${data.nonce} with that wallet`
						: `Sign-up to TEST_APP ${data.nonce}`

				const metamaskSignature = await window.ethereum.request({
					method: "personal_sign",
					params: [messageToSign, accounts[0]]
				})

				loginViaMetamask({ address: accounts[0], signature: metamaskSignature })
			} else {
				toast.error("Будь ласка, встановіть Metamask для використання цієї функції")
			}
		} catch (error) {
			toast.error("Помилка під час підпису повідомлення:", {
				description: JSON.stringify(error)
			})
		}
	}

	return (
		<section>
			{variant === "signup" ? (
				!isMetamask ? (
					<Button
						onClick={() => setIsMetamask(true)}
						className="gap-x-3"
						variant="outline"
						size="full"
					>
						<Image
							src="/metamask.svg"
							alt="metamask icon"
							height={24}
							width={24}
						/>
						Metamask
					</Button>
				) : (
					<Button
						className="gap-x-3"
						// variant={isMetamask ? "default" : "outline"}
						variant="default"
						// type={isMetamask ? "submit" : "button"}
						type="submit"
						size="full"
					>
						Register
					</Button>
				)
			) : (
				<Button
					variant={isMetamask ? "default" : "outline"}
					type={isMetamask ? "submit" : "button"}
					onClick={connectAndSign}
					className="gap-x-3"
					size="full"
				>
					{isMetamask ? (
						"Register"
					) : (
						<>
							<Image
								src="/metamask.svg"
								alt="metamask icon"
								height={24}
								width={24}
							/>
							Metamask
						</>
					)}
				</Button>
			)}
		</section>
	)
}
