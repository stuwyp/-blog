export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    param2Json(search)
  )
}

export function param2Json(param) {
  return '{"' +
    decodeURIComponent(param)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
}

// export function formatTime(time, option) {
//   time = +time * 1000
//   const d = new Date(time)
//   const now = Date.now()
//
//   const diff = (now - d) / 1000
//
//   if (diff < 30) {
//     return '刚刚'
//   } else if (diff < 3600) {
//     // less 1 hour
//     return Math.ceil(diff / 60) + '分钟前'
//   } else if (diff < 3600 * 24) {
//     return Math.ceil(diff / 3600) + '小时前'
//   } else if (diff < 3600 * 24 * 2) {
//     return '1天前'
//   }
//   if (option) {
//     return parseTime(time, option)
//   } else {
//     return (
//       d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
//     )
//   }
// }
/**
 * 传入时间戳，转换指定的时间格式
 * @param {Number} val      时间戳
 * @param {String} dateType 要得到的时间格式 例如 YYYY-MM-DD hh:mm:ss
 * @return dataStr 例如 YYYY-MM-DD hh:mm:ss
 */
export function switchTime(val = +new Date(), dateType = 'YYYY-MM-DD hh:mm:ss') {
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

export function debounce(fn, wait) {
  let timer = null;
  console.log("???")
  return function () {
    if (timer !== null)
      clearTimeout(timer);//如果多次触发将上次记录延迟清除掉
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, wait);
  };
}


export function transformURL(url) {
  return process.env.BASE_API + url
}

export function genRandomStr() {
  return Math.random().toString(16).substring(2) + Date.now().toString(16)
}
