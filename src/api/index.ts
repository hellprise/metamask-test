import axios from "axios"

const axiosOptions = {
	baseURL: process.env.API_URL,
	headers: {
		"Content-Type": "application/json"
	}
}

const axiosClassic = axios.create(axiosOptions)

export { axiosClassic }
