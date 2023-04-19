// 导入request模块
import request from "@/untils/request.js";

// 轮播图
export const getSlideShowAPI = (banners) => {
  return request.get("/banner", {
    params: {
      banners,
    },
  });
};
// 推荐歌单
export const getMusicListAPI = (result) => {
  return request.get("/personalized", {
    params: {
      result,
    },
  });
};
// 独家放送
export const getOnlybroadcastAPI = (result) => {
  return request.get("/personalized/privatecontent", {
    parmas: {
      result,
    },
  });
};
// 最新专辑
export const getNewcollectionAPI = (result) => {
  return request.get("/personalized/newsong", {
    parmas: {
      result,
    },
  });
};
