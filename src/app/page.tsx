import { Suspense } from "react"

import { ModalForm } from "@/auth/ui/modal/ModalForm"

export default function Home() {
	return (
		<main className="flex h-dvh flex-col items-center justify-center bg-gray-50">
			<Suspense
				fallback={
					<div>
						<h1>Loading...</h1>
					</div>
				}
			>
				<ModalForm />
			</Suspense>
		</main>
	)
}
