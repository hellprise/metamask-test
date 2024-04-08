import { IUser } from "./user.interface"

export interface IAuthForm extends Pick<IUser, "username" | "password"> {}

export interface IMetamaskLoginResponse {
	address: string
	signature: string
}
