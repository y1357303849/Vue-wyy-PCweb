// 导入request模块
import request from '@/untils/request.js'


// 轮播图
export const getSlideShowAPI = (imageUrl, index) => {
  return request.get("/banner", {
    params: {
      imageUrl,
      index
    }
  })
}
// 推荐歌单
export const getMusicListAPI = (name, picUrl) => {
  return request.get("/personalized", {
    params: {
      name,
      picUrl
    }
  })
}
// 独家放送
export const getOnlybroadcastAPI = (sPicUrl, copywriter) => {
  return request.get("/personalized/privatecontent", {
    parmas: {
      sPicUrl,
      copywriter
    }
  })
}
// 最新专辑
export const getNewcollectionAPI = (name, blurPicUrl, artist) => {
  return request.get("/album/newest", {
    parmas: {
      name,
      blurPicUrl,
      artist
    }
  })
}