<template>
  <div class="personalityBox">
    <!-- 轮播图 -->
    <div class="swiper">
      <!-- 轮播图背景模糊 -->
      <div class="backImg">
        <el-carousel height="300px" interval="3000">
          <el-carousel-item v-for="(item, index) in showImg" :key="index">
            <img class="backImgs" :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-carousel class="my-swipe" height="300px" interval="3000">
        <el-carousel-item v-for="(item, index) in showImg" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="musicList">
      <div class="listName">
        <p>推荐歌单</p>
      </div>
      <ul>
        <li
          v-for="(item, index) in MusicListNameUrl"
          :key="index"
          class="listLi"
          @click="goDetailPage(item)"
        >
          <div class="listDiv">
            <img class="listImg" :src="item.picUrl" alt="" />
          </div>
          <p class="listText">
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>
    <!-- 独家放送 -->
    <div class="onlyList">
      <div class="listName">
        <p>独家放送</p>
      </div>
      <div class="listImg">
        <div
          class="onlyBox"
          v-for="(item, index) in OnlyOnly"
          :key="index"
          @click="goMvPage(item)"
        >
          <div class="ob1">
            <img class="onlyImg" :src="item.sPicUrl" alt="" />
          </div>
          <p class="onlyText">
            {{ item.copywriter }}
          </p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="snewMusic">
      <div class="newMusicName">
        <p>最新音乐</p>
      </div>
      <div class="newMusicList">
        <ul>
          <li
            v-for="(item, index) in collection"
            :key="index"
            class="newMusicLi"
            @dblclick="playMusic(item)"
          >
            <div class="newMusicBox">
              <span class="newMusicNum">{{ index + 1 }}</span>
              <div class="newMusicImgBox">
                <img class="newMusicImg" :src="item.picUrl" alt="" />
                <i class="iconfont icon-bofang"></i>
              </div>
              <div class="newMusictext">
                <p class="singName">{{ item.name }}</p>
                <p class="singBoos">{{ item.song.album.artists[0].name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入封装的请求文件
import {
  getSlideShowAPI,
  getMusicListAPI,
  getOnlybroadcastAPI,
  getNewcollectionAPI,
} from "@/network/Personality.js";
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "Personality",
  data() {
    return {
      // 轮播图
      showImg: [],
      // 歌单名字
      MusicListNameUrl: [],
      // 独家
      OnlyOnly: [],
      // 最新专辑
      collection: [],
      // 歌曲url
      musicUrlList: "",
    };
  },
  created() {
    this.SlideShow();
    this.MusicList();
    this.OnlyPicName();
    this.NewCollection();
  },
  methods: {
    // 轮播图
    async SlideShow() {
      const { data: res } = await getSlideShowAPI(this.banners);
      // console.log(res);
      this.showImg = res.banners;
    },
    // 推荐歌单
    async MusicList() {
      const { data: res } = await getMusicListAPI(this.result);
      // console.log(res.result);
      // 选定从数组中的哪个数据开始到结束
      this.MusicListNameUrl = res.result.slice(0, 12);
      // console.log(this.MusicListNameUrl);
    },
    // 独家放送
    async OnlyPicName() {
      const { data: res } = await getOnlybroadcastAPI(this.result);
      // console.log(res.result);
      // 选定从数组中的哪个数据开始到结束
      this.OnlyOnly = res.result;
      // console.log(this.OnlyOnly);
    },
    // 最新音乐
    async NewCollection() {
      const { data: res } = await getNewcollectionAPI(this.result);
      // console.log(res);
      // 选定从数组中的哪个数据开始到结束
      this.collection = res.result;
      // console.log(this.collection);
    },
    // 双击播放音乐
    async playMusic(i) {
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/song/url?id=" + i.id
      );
      // console.log(res);
      this.musicUrlList = res.data[0].url;
      // console.log("双击", i);
      // 存储歌名歌手专辑封面到vuex
      this.$store.dispatch("asyncUpdateSongs", {
        name: i.name,
        user: i.song.album.artists[0].name,
        album: i.picUrl,
        songsUrl: this.musicUrlList,
      });
      // console.log(document.getElementsByTagName("a")[0].__vue__.$store);
    },
    // 跳转歌单详情页
    goDetailPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/playListDetail",
          query: { musicData: i },
        });
      }, 500);
    },
    // 跳转独家放送MV详情页
    goMvPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/MvPage",
          query: { onlyData: i },
        });
      }, 500);
    },
  },
};
</script>

<style lang="less">
.personalityBox {
  width: 100%;
  margin: 0 auto;
  margin-top: 75px;

  // 轮播图
  .swiper {
    width: 100%;
    border-radius: 20px;
    position: relative;
    .backImg {
      // 背景高斯模糊
      filter: blur(10px);
      .backImgs {
        width: 100%;
        height: 100%;
        border-radius: 30px;
      }
    }
    .my-swipe {
      position: absolute;
      top: 0;
      width: 100%;
      height: 300px;
      justify-content: center;
      text-align: center;
      img {
        width: 70%;
        height: 300px;
        border-radius: 30px;
      }
    }
  }
  // 推荐歌单
  .musicList {
    width: 100%;

    margin-top: 50px;
    // 标题
    .listName {
      margin-bottom: 10px;
      font-size: 25px;
      font-weight: 700;
      color: #f2cac9;
      border-bottom: 3px solid #f2cac9;
    }
    // 列表
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .listLi {
        width: 15%;
        height: 245px;
        margin-left: 20px;
        box-sizing: border-box;
        cursor: pointer;
        .listDiv {
          width: 100%;
          height: calc(100% - 45px);
          overflow: hidden;
          border-radius: 20px;
          // 图片
          .listImg {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            transition: 0.5s;
          }
        }
        // 文字
        .listText {
          width: 100%;
          height: 40px;
          margin-top: 5px;

          color: #f2cac9;
          // 溢出隐藏并省略号
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
    // 第一个和第六个取消左边距
    .listLi:first-child,
    .listLi:nth-child(7) {
      margin-left: 0;
    }
    .listLi:hover {
      .listImg {
        transform: scale(1.1);
      }
    }
  }
  // 独家放送
  .onlyList {
    width: 100%;

    margin-top: 50px;
    .listName {
      margin-bottom: 10px;
      font-size: 25px;
      font-weight: 700;
      color: #f2cac9;
      border-bottom: 3px solid #f2cac9;
    }
    .listImg {
      width: 100%;
      height: 250px;
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
      .onlyBox {
        width: 32%;
        height: 100%;
        .ob1 {
          width: 100%;
          height: 200px;
          border-radius: 20px;
          overflow: hidden;
          .onlyImg {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            transition: 0.5s;
          }
        }
        .onlyImg:hover {
          transform: scale(1.1);
        }
        .onlyText {
          width: 100%;
          height: 40px;
          margin-top: 5px;
          color: #f2cac9;
          display: -webkit-box;
          overflow: hidden;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .onlyBox:first-child {
        padding-left: 0;
      }
    }
  }
  // 最新音乐
  .snewMusic {
    width: 100%;
    height: 750px;
    margin-top: 30px;
    // 标题
    .newMusicName {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      font-size: 25px;
      font-weight: 700;
      color: #f2cac9;
      border-bottom: 3px solid #f2cac9;
    }
    // 列表总容器
    .newMusicList {
      width: 100%;
      height: calc(100% - 30px);
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        // 列表每个li
        .newMusicLi {
          width: 49%;
          height: 110px;
          transition: 0.5s;
          border-radius: 20px;
          cursor: pointer;
          // 每个li的内部盒子，号码、图片、歌名
          .newMusicBox {
            width: 100%;
            height: 100%;
            overflow: hidden;
            // 号码
            .newMusicNum {
              width: 30px;
              height: 110px;
              line-height: 110px;
              text-align: center;
              margin-left: 5px;
              box-sizing: border-box;
              font-size: 25px;
              color: #f2cac9;
              float: left;
            }
            // 图片盒子
            .newMusicImgBox {
              width: 100px;
              height: 110px;
              float: left;
              border-radius: 15px;
              overflow: hidden;

              position: relative;
              .newMusicImg {
                width: 100%;
                height: 100%;
                border-radius: 15px;
                transition: 0.5s;
              }
              // 播放按钮
              .iconfont {
                position: absolute;
                top: 35%;
                left: 35%;

                font-size: 30px;
                color: #f2cac9;
                font-weight: 700;
              }
            }
            // 音乐名字
            .newMusictext {
              width: 500px;
              height: 110px;
              margin-left: 20px;
              float: left;
              .singName {
                width: 100%;
                height: 80px;
                line-height: 40px;
                font-size: 25px;
                color: #f2cac9;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              .singBoos {
                width: 100%;
                height: 25px;
                line-height: 25px;
                margin-top: 5px;
                font-size: 20px;
                color: #f2cac9;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
        .newMusicLi:hover {
          box-shadow: 1px 1px 10px 1px #f2cac9;
          .newMusicImg {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
