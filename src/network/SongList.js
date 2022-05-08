// 导入request模块
import request from '@/untils/request.js'

// 歌单列表
export const getSongListAPI = (name, coverImgUrl) => {
  return request.get("/top/playlist", {
    params: {
      name,
      coverImgUrl
    }
  })
}
// 歌单分类
export const getSongClassifyAPI = (sub) => {
  return request.get("/playlist/catlist", {
    params: {
      sub
    }
  })
}