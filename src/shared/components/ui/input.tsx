import * as React from "react"
import { FieldError } from "react-hook-form"

import { cn } from "@/shared/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: FieldError
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, error, type, ...props }, ref) => {
		return (
			<fieldset>
				<input
					className={cn(
						"flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
						className
					)}
					type={type}
					ref={ref}
					{...props}
				/>

				{error && (
					<p className="mt-1.5 animate-fade text-xs font-medium text-red-500">
						{error.message}
					</p>
				)}
			</fieldset>
		)
	}
)
Input.displayName = "Input"

export { Input }
