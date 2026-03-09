import axios from 'axios'

const fetcher = axios.create({
    baseURL:"http://10.1.48.35:8168/api"
})
// const fetcher = axios.create({
//     baseURL:"http://localhost:8168/api"
// })

export default fetcher