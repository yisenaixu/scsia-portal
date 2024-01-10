export let main_url = ''

/**
 * @description 转化日期提取年月日
 */
export function getYMD(date) {
  let arr = date.split(' ')[0].split('-')
  return {
    year: arr[0],
    month: arr[1],
    day: arr[2],
  }
}
