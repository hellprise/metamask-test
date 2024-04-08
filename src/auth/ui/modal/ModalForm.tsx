"use client"

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from "@/shared/components/ui"
import { useSearch } from "@/shared/hooks/useSearch"

import { Form } from "../form/Form"

import { FormType } from "./modal.interface"

interface FormProps {
	toggleForm: (variant: FormType) => void
}

export function ModalForm() {
	const { createQueryString, router, pathname, searchParams } = useSearch()

	// const formVariant = searchParams.get("v") as FormType | null

	const toggleForm = (variant: FormType) => {
		router.push(`${pathname}?${createQueryString("v", variant)}`)
	}

	return (
		<Dialog>
			<Tabs defaultValue="login">
				<TabsList className="bg-transparent">
					<DialogTrigger asChild>
						<TabsTrigger
							value="login"
							asChild
						>
							<Button
								className="rounded-md px-4 py-2 text-black"
								onClick={() => toggleForm("login")}
								variant="outline"
							>
								Login
							</Button>
						</TabsTrigger>
					</DialogTrigger>

					<DialogTrigger asChild>
						<TabsTrigger
							value="signup"
							asChild
						>
							<Button
								className="ml-3 rounded-md px-4 py-2 text-black"
								onClick={() => toggleForm("signup")}
								variant="outline"
							>
								Register
							</Button>
						</TabsTrigger>
					</DialogTrigger>
				</TabsList>

				<FormWrapper toggleForm={toggleForm} />
			</Tabs>
		</Dialog>
	)
}

function FormWrapper({ toggleForm }: FormProps) {
	return (
		<DialogContent>
			<TabsList className="p-2">
				<TabsTrigger
					onClick={() => toggleForm("login")}
					value="login"
				>
					Login
				</TabsTrigger>

				<TabsTrigger
					onClick={() => toggleForm("signup")}
					value="signup"
				>
					Register
				</TabsTrigger>
			</TabsList>

			<TabsContent value="login">
				<DialogHeader className="">
					<DialogTitle>Welcome back</DialogTitle>
					<DialogDescription>
						We&apos;ve saved your seat at the winning table.
					</DialogDescription>
				</DialogHeader>

				<Form variant="login" />
			</TabsContent>

			<TabsContent value="signup">
				<DialogHeader>
					<DialogTitle>Create an account</DialogTitle>
					<DialogDescription>
						Join the thrill, the casino where anything is possible!
					</DialogDescription>
				</DialogHeader>

				<Form variant="signup" />
			</TabsContent>
		</DialogContent>
	)
}
