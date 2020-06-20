const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
// const cherrio = require('cherrio')

cloud.init()

async function getDoubanBook(isbn){
  const url = `https://search.douban.com/book/subject_search?search_text=${isbn}`;
  // 抓取网页数据
  let searchInfo = await axios.get(url);
  console.log('searchInfo', searchInfo);
  let reg = /window\.__DATA__ = "(.*)"/;
  let searchData = '';
  if (reg.test(searchInfo.data)){
    searchData = doubanbook(RegExp.$1)[0];
  }
  return searchData;
}

getDoubanBook('9787121276576');
// 云函数入口函数
exports.main = async (event, context) => {
  const { isbn } = event;
  let bookInfo = await getDoubanBook(isbn);
  return { bookInfo };
}