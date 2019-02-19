import axios from 'axios'
import { Message, Loading } from 'element-ui'
import qs from 'qs'

/* 六合一 */
// let base = 'http://192.168.199.3/'
// let base = 'http://statb.maimob.net/'

/* JND */
// let base = 'http://192.168.199.3:8003/'
let base = 'http://admin.zhiputech.cn/'

export default function http (options) {
  let url = base + options.url
  let params = options.params
  let method = options.method ? options.method : 'post'

  return new Promise((resolve, reject) => {
    const loadingInstance = Loading.service({
      fullscreen: true,
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    axios({
      url,
      method,
      data: params,
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
      transformRequest: [function (data) {
        data = qs.stringify(params)
        return data
      }]
    }).then(res => {
      loadingInstance.close()
      resolve(res)
    }).catch(err => {
      loadingInstance.close()
      Message({
        message: '获取数据失败，请稍后重试',
        type: 'error',
        showClose: true
      })
      reject(err)
    })
  })
}
