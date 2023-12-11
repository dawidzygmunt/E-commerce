import axios from "axios";


const baseURL = ''
console.log(process.env.AXIOS_BASE_URL);



const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  }
  
})



export default axiosInstance
