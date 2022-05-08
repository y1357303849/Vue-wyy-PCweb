<template>
  <div class="leftBox">
    <!-- 列表选项 -->
    <div class="listBox">
      <ul>
        <li>
          <router-link to="/personality" class="listLi">
            <i class="iconfont icon-yinyue"></i>
            <span class="text">个性推荐</span>
          </router-link>
        </li>
        <li>
          <router-link to="/songlist" class="listLi">
            <i class="iconfont icon-yinleliebiao-"></i>
            <span class="text">歌单</span>
          </router-link>
        </li>
        <li>
          <router-link to="/top" class="listLi">
            <i class="iconfont icon-paihangbang"></i>
            <span class="text">排行榜</span>
          </router-link>
        </li>
        <li>
          <router-link to="/singer" class="listLi">
            <i class="iconfont icon-personal"></i>
            <span class="text">歌手</span>
          </router-link>
        </li>
        <li>
          <router-link to="/mv" class="listLi">
            <i class="iconfont icon-MV"></i>
            <span class="text">MV</span>
          </router-link>
        </li>
        <li>
          <router-link to="newmusic" class="listLi">
            <i class="iconfont icon-yinle_2"></i>
            <span class="text">最新音乐</span>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 底部歌曲信息 -->
    <div class="bottomSongBox">
      <div class="songImgBox">
        <img src="@/assets/img/无语狗.gif" alt="" />
      </div>
      <div class="songDetailBox">
        <div class="singName">解药</div>
        <div class="singerName">高高高</div>
      </div>
    </div>
  </div>
</template>

<script>
import Personality from "@/components/content/Personality/Personality.vue";

export default {
  name: "LeftBox",
  components: {
    Personality,
  },
};
</script>

<style lang="less">
// 大盒子
.leftBox {
  width: 200px;
  height: 100%;
  position: fixed;
  top: 50px;
  left: 0;
  // 固定左侧导航栏
  .listBox {
    width: 200px;
    height: 700px;
    background-color: #4b2e2b;
    position: relative;
    // 去除router-link的下划线
    .router-link-active {
      text-decoration: none;
    }
    a {
      text-decoration: none;
    }
    // 列表样式
    .listLi {
      color: #f2cac9;
      width: 100%;
      height: 50px;
      line-height: 50px;
      .iconfont {
        font-size: 25px;
        padding: 10px;
      }
      span {
        font-weight: 600;
      }
    }
    li:hover {
      background-color: #964d22;
    }
  }
  // 底部歌曲信息
  .bottomSongBox {
    width: 200px;
    height: 100px;
    position: absolute;
    // top: 100px;
    bottom: 120px;
    .songImgBox {
      width: 40%;
      height: 100%;
      float: left;
      text-align: center;
      img {
        margin-top: 10px;
        width: 90%;
        height: 80%;
        border-radius: 10px;
      }
    }
    // 歌手歌名
    .songDetailBox {
      width: 60%;
      float: left;
      color: #f2cac9;
      .singName {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 5px;
        box-sizing: border-box;
        font-weight: 900;
      }
      .singerName {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 5px;
        box-sizing: border-box;
        font-weight: 900;
      }
    }
  }
}
</style>