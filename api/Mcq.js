import axios from 'axios'

export const getMcqs = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getMcq = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const postMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const saveMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const submitMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const getSolvedMcqs = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getSolvedMcq = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)

export const startMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)
export const preCheckMcq = (url, data) => axios.post(url, data, { withCredentials: true }).then(res => res.data)