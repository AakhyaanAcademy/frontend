import axios from 'axios'

export const getProgrammes = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getCourses = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getProgram = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getSubjects = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getChapters = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getTopics = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)
export const getTopic = (url) => axios.get(url, { withCredentials: true }).then(res => res.data)