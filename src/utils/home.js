import { getNews } from "../api/router"

// 主页展示的部分信息源栏目id
export const homeNaviIds = {
    'main': 218,
    'sub_1': 212,
    'sub_2': 213,
    'sub_3': 217
}

export let main_url = '';

//新闻数
const news_count = 5 

/**
 * @description 转化日期提取年月日
 */
export function getYMD(date) {
  let arr = date.split(' ')[0].split('-');
  return {
    year: arr[0],
    month: arr[1],
    day: arr[2]
  };
}


/**
 * @description 获得主页主要部分的新闻列表
 * @returns {Array} newslist
 */
export async function fetchMainNewsList() {
    let newsList = await getNews(homeNaviIds['main'],news_count)
                   .then(res => res.rows.map(item => ({id:item.id, title:item.newsTitle, time:getYMD(item.newsTime), detail:item,})));
    console.debug(newsList)    
               return newsList; 
}

/**
 * @description 获取主页次要部分的新闻列表
 * @param {string} id 
 * @returns 
 */
export async function fetchSubNewsList(id) {
    let title = ''
    let newsList = await getNews(id, news_count)
    .then(res => { 
        title = res.rows[0]?.naviName;
        return res.rows.map(item => ({id:item.id, title:item.newsTitle, detail:item}))
  });  
     return {
        title,
        news:newsList}; 
}