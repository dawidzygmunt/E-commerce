import axios from "axios"

const baseURL = "/e-commerce"

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
})

export default axiosInstance
