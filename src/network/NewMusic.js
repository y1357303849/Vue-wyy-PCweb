// 导入request模块
import request from '@/untils/request.js'

// 最新音乐
export const getNewMusicAPI = (result) => {
  return request.get("/personalized/newsong?limit=100", {
    params: {
      result
    }
  })
}