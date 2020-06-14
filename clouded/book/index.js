0
const cloud = require('wx-server-sdk')
const axios = require('axios');
const doubanbook = require('doubanbook');

cloud.init()

async function getDoubanBook(isbn){
  const url = `https://search.douban.com/book/subject_search?search_text=${isbn}`;
  // 抓取网页数据
  let searchInfo = await axios.get(url);
  let reg = /window\.__DATA__ = "(.*)"/;
  if (reg.test(searchInfo.data)){
    let searchData = doubanbook(RegExp.$1)[0]
    return searchData
  }
}

// 云函数入口函数
exports.main = async (event, context) => {77
  const { isbn } = event;
  let bookInfo = await getDoubanBook(isbn);
  return { bookInfo };
}