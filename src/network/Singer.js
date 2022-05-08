// 导入request模块
import request from '@/untils/request.js'

// 歌手列表
export const getWholeListAPI = (artists) => {
  return request.get("/artist/list", {
    params: {
      artists
    }
  })
}