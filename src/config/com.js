export var dateFormatter = function (date, time) {
  /**
   * @description date类型日期格式化
   * @argument {date} date: 要格式化的日期
   * @argument {int} time: 返回YYYY-MM-DD还是YYYY-MM-DD HH:MM:SS，time != undefined则返回全格式
   * @returns 格式化后的字符型日期
   */
  if (date === undefined || date === '') {
    return ''
  }
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  if (time !== undefined) {
    // 返回YYYY-MM-DD HH:MM:SS
    var hours = date.getHours()
    hours = hours < 10 ? ('0' + hours) : hours
    var minute = date.getMinutes()
    minute = minute < 10 ? ('0' + minute) : minute
    var second = date.getSeconds()
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + hours + ':' + minute + ':' + second
  }
  return y + '-' + m + '-' + d
}

export function validateMobileNo (val) {
  return /^1[3456789]\d{9}$/.test(val)
}
