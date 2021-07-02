import axios from '../utils/axios'
import Api from '@/project.config/api'

export const getImgs = params => {
    return axios.get(Api.baseUrl, {
        params: {
            ...params,
            tableCode: 'CS_XWLBSX',
            whereSql: 'and XWLBSX_XWPT != ""',
            orderSql: 'order by XWLBSX_XWRQ desc',
        }
    })
}

export const getNotice = params => {
    return axios.get(Api.baseUrl, {
        params: {
            ...params,
            tableCode: 'CS_XWLBSX',
            whereSql: '',
            orderSql: 'order by XWLBSX_XWRQ desc'
        }
    })
}
