// import axios from 'axios'
// let base = 'http://192.168.199.106:8080/test/'

// export const getLogDataReg = params => { return axios.post(`${base}diary/detail`, params) } // 获取日志记录

import http from './http'

// 获取日志记录
export const getLogDataReg = params => {
  return http({
    // url: 'app/get_log_data',
    url: 'app_log/get_log_data',
    params
  })
}

// 按时间查询不同接口不同合作方不同返回码的数量
export const getCodeStat = params => {
  return http({
    url: 'monitor/get_code_stat',
    params
  })
}

// 查询不同条件组合返回码的数量
export const getDayCallPartnerCodeCount = params => {
  return http({
    url: 'monitor/get_day_call_partner_code_count',
    params
  })
}
