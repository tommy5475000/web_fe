import axios from 'axios'

const fetcher = axios.create({
    baseURL:"http://mapinv.ddns.net:8080/api"
})
// const fetcher = axios.create({
//     baseURL:"http://10.1.49.30:8080/api"
// })

export default fetcher