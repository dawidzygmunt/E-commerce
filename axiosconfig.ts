import axios from "axios";


const baseURL = '/e-commerce'
console.log(process.env.AXIOS_BASE_URL);


const axiosInstance = axios.create({
  baseURL: baseURL
  
})


export default axiosInstance
