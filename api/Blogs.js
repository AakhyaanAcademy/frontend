import axios from "axios"
export const getBlogs = (url) => axios.get(url).then(res => res.data)
export const getBlog = (url) => axios.get(url).then(res => res.data)