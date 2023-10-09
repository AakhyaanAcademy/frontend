import axios from "axios"

export const initiate = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const paymentDetails = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const paymentConfirmation = (url,data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)