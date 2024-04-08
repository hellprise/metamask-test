import { IMetamaskLoginResponse } from "./auth.interface"

export interface IUser extends Partial<IMetamaskLoginResponse> {
	id: string
	username: string
	password?: string
}

export interface IMetamaskUser extends IMetamaskLoginResponse {
	username: string
}
