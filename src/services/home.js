import axios from '../utils/axios'
import Api from '@/project.config/api'

export const test = params => {
    return axios.get(Api.test, { params })
}
