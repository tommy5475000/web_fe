import axios from 'axios'

const fetcher = axios.create({
    baseURL:"http://10.1.48.35:8168/api"
})
// const fetcher = axios.create({
//     baseURL:"http://10.1.49.30:8080/api"
// })

export default fetcher