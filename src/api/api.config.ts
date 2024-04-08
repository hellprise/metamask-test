export const getMainUrl = (path: string) => `${process.env.SERVER_URL}/users${path}`

export const getAuthUrl = (path: string) => `/auth/${path}`
export const getMetamaskUrl = (path: string) => `/eth/nonce/${path}`
