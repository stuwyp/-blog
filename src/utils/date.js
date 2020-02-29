/**
 * 传入时间戳，转换指定的时间格式
 * @param {Number} val      时间戳
 * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
 * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
 */
function switchTime(val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') {
  // 将字符串转换成数字
  const timeStamp = +new Date(val)

  // 如果转换成数字出错
  if (!timeStamp) {
    return val
  }
  let str
  // 得到时间字符串
  const dateStr = new Date(timeStamp)
  str = dateType.replace('YYYY', dateStr.getFullYear())
  str = str.replace('MM', (dateStr.getMonth() + 1 < 10 ? '0' : '') + (dateStr.getMonth() + 1))
  str = str.replace('DD', (dateStr.getDate() < 10 ? '0' : '') + dateStr.getDate())
  str = str.replace('hh', (dateStr.getHours() < 10 ? '0' : '') + dateStr.getHours())
  str = str.replace('mm', (dateStr.getMinutes() < 10 ? '0' : '') + dateStr.getMinutes())
  str = str.replace('ss', (dateStr.getSeconds() < 10 ? '0' : '') + dateStr.getSeconds())

  return str
}

/**
 * 时间显示
 */
function friendlyDate(val) {
  let time = typeof val === 'object' ? +val : +new Date(val)

  let now = +new Date()

  let space = now - time

  let str = ''
  const MIN = 60 * 1000 // 一分钟的毫秒数
  const HOUR = 60 * 60 * 1000 // 一小时的毫秒数
  const DAY = 60 * 60 * 1000 * 24 // 一天的毫秒数
  const WEEK = 60 * 60 * 1000 * 24 * 7 //一周的毫秒数

  switch (true) {
    case space < MIN:
      str = '刚刚'
      break
    case space < HOUR:
      str = Math.floor(space / MIN) + '分钟前'
      break
    case space < DAY:
      str = Math.floor(space / HOUR) + '小时前'
      break
    case space < WEEK:
      str = Math.floor(space / DAY) + '天前'
      break;
    default:
      if (switchTime(now, 'YYYY') === switchTime(time, 'YYYY')) {
        str = switchTime(time, 'MM月DD日')
      } else {
        str = switchTime(time, 'YYYY年MM月DD日')
      }
  }
  return str
}

/* eslint-disable no-new */
export default {
  install(Vue, options) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}
