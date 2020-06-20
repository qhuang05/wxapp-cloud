const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')
const cheerio = require('cheerio')

cloud.init()

async function searchDoubanBook(isbn){
  const url = `https://search.douban.com/book/subject_search?search_text=${isbn}`;
  // 抓取网页数据
  const searchPage = await axios.get(url);
  const reg = /window\.__DATA__ = "(.*)"/;
  let searchData = '';
  if (reg.test(searchPage.data)){
    searchData = doubanbook(RegExp.$1)[0];
  }
  return searchData;
}

async function getDoubanBook(isbn){
    const searchData = await searchDoubanBook(isbn);
    const detailPage = await axios.get(searchData.url);
    console.log('detailPage', detailPage);
    const $ = cheerio.load(detailPage.data);
    let tags = [];
    $('#db-tags-section a.tag').each((i,v)=>{
        tags.push($(v).text())
    });
    let ret = {
        title: searchData.title,
        url: searchData.url,
        image: searchData.cover_url,
        summary: $('#link-report .intro').text(),
        rate: searchData.rating.value,
        tags,
        create_time: new Date().getTime()
    };
    return ret;
}
// getDoubanBook('9787121276576');

// 云函数入口函数
exports.main = async (event, context) => {
  const { isbn } = event;
  if(isbn){
      return getDoubanBook(isbn);
  } else{
      return {
          status: -1000,
          msg: '请扫描正确的图书'
      }
  }
}