/**
 * 时间显示
 */
import {switchTime} from "./index"

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

/* eslint-disable */
export default {
  install(Vue, options) {
    Vue.prototype.friendlyDate = friendlyDate
  }
}
/* eslint-disable */
