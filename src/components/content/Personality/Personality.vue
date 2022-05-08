<template>
  <div class="personalityBox">
    <!-- 轮播图 -->
    <div class="swiper">
      <!-- 轮播图背景模糊 -->
      <!-- <div>
        <img class="backImg" :src="showImg[0].imageUrl" alt="" />
      </div> -->
      <div class="backImg">
        <el-carousel height="300px" interval:3500>
          <el-carousel-item v-for="(item, index) in showImg" :key="index">
            <!-- <h3 class="small">{{ item }}</h3> -->
            <img class="backImgs" :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- vant的轮播图组件 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in showImg" :key="index">
          <img :src="item.imageUrl" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 推荐歌单 -->
    <div class="musicList">
      <div class="listName">
        <p>推荐歌单</p>
      </div>
      <ul v-for="(item, index) in MusicListNameUrl" :key="index">
        <li class="listLi" @click="goDetailPage(index)">
          <div class="listDiv">
            <img class="listImg" :src="item.picUrl" alt="" />
            <p class="listText">
              {{ item.name }}
            </p>
          </div>
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
          @click="goOnlyPage(index)"
        >
          <img class="onlyImg" :src="item.sPicUrl" alt="" />
          <p class="onlyText">
            {{ item.copywriter }}
          </p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="snewMusic">
      <div class="newMusicName">
        <p>最新专辑</p>
      </div>
      <div class="newMusicList">
        <ul v-for="(item, index) in collection" :key="index">
          <li class="newMusicLi">
            <div class="newMusicBox">
              <span class="newMusicNum">{{ index }}</span>
              <div class="newMusicImgBox">
                <img class="newMusicImg" :src="item.blurPicUrl" alt="" />
                <i class="iconfont icon-bofang"></i>
              </div>
              <div class="newMusictext">
                <p class="singName">{{ item.artist.name }}</p>
                <p class="singBoos">{{ item.name }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 导入request模块
// import request from "@/untils/request.js";

// 引入封装的请求文件
import {
  getSlideShowAPI,
  getMusicListAPI,
  getOnlybroadcastAPI,
  getNewcollectionAPI,
} from "@/network/Personality.js";

// eventBus
import bus from "@/components/content/eventBus.js";

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
      // 点击推荐歌单对应的下标
      listIndex: 0,
      // 点击独家放送对应的下标
      onlyIndex: 0,
    };
  },
  created() {
    // 绕过登陆获取数据
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    this.SlideShow();
    this.MusicList();
    this.OnlyPicName();
    this.NewCollection();
  },
  methods: {
    // 轮播图
    async SlideShow() {
      const { data: res } = await getSlideShowAPI(this.showImg, this.index);
      // console.log(res.banners);
      this.showImg = res.banners;
      // this.showImg.forEach((item) => {
      //   console.log(item.imageUrl);
      // });
      // console.log(this.showImg);
      // console.log(this.showImg[0].imageUrl);
    },
    // 推荐歌单
    async MusicList() {
      const { data: res } = await getMusicListAPI(this.MusicListNameUrl);
      // console.log(res.result);
      // 选定从数组中的哪个数据开始到结束
      this.MusicListNameUrl = res.result.slice(11, 23);
      // console.log(this.MusicListNameUrl);
    },
    // 独家放送
    async OnlyPicName() {
      const { data: res } = await getOnlybroadcastAPI(this.OnlyOnly);
      // console.log(res.result);
      // 选定从数组中的哪个数据开始到结束
      this.OnlyOnly = res.result;
      // console.log(this.OnlyOnly);
    },
    // 最新音乐
    async NewCollection() {
      const { data: res } = await getNewcollectionAPI(this.collection);
      // console.log(res.result);
      // 选定从数组中的哪个数据开始到结束
      this.collection = res.albums;
      // console.log(this.collection);
    },
    // 跳转歌单详情页
    goDetailPage(index) {
      // 点击跳转到playListDetail页面
      this.$router.push("/playListDetail");
      // 将当前点击的li的对应的下标数据赋值
      this.listIndex = index;
      // localStorage.setItem("musicData", this.MusicListNameUrl[this.listIndex]);
      // 将当前点击的li的对应的下标数据传送给子页面
      // setTimeout(() => {
      //   bus.$emit("musicData", this.MusicListNameUrl[this.listIndex]);
      // }, 700);
      bus.$emit("musicData", this.MusicListNameUrl[this.listIndex]);
      // bus.$emit("musicData", e.target);
    },
    // 跳转独家放送MV详情页
    goOnlyPage(index) {
      // 点击跳转到onlyPage页面
      this.$router.push("/onlyPage");
      // 将当前点击的li的对应的下标数据赋值
      this.onlyIndex = index;
      // console.log(this.onlyIndex);
      // 将当前点击的li的对应的下标数据传送给子页面
      bus.$emit("onlyData", this.OnlyOnly[this.onlyIndex]);
    },
  },
};
</script>

<style lang="less" scoped>
.personalityBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  margin-bottom: 75px;
  // 轮播图
  .swiper {
    width: 1200px;
    margin: 10px 65px 0 65px;
    // background-color: lightpink;
    border-radius: 20px;
    position: relative;
    .backImg {
      // width: 100%;
      // height: 300px;
      // 背景高斯模糊
      filter: blur(10px);
      .backImgs {
        width: 100%;
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
    width: 1200px;
    height: 500px;
    margin: 30px 65px 0 65px;
    // 标题
    .listName {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #f2cac9;
    }
    // 列表
    .listLi {
      width: 200px;
      height: 200px;
      float: left;
      margin-left: 50px;
      margin-bottom: 35px;
      box-sizing: border-box;
    }
    // 第一个和第六个取消左边距
    .listLi:first-child,
    .listLi:nth-child(6) {
      margin-left: 0;
    }
    .listDiv {
      width: 100%;
      height: 100%;
      // 图片
      .listImg {
        width: 90%;
        height: 90%;
        border-radius: 20px;
      }
      // 文字
      .listText {
        width: 100%;
        height: 45px;
        color: #f2cac9;
        // 溢出隐藏并省略号
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  // 独家放送
  .onlyList {
    width: 1200px;
    height: 300px;
    margin: 30px 65px 0 65px;
    .listName {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #f2cac9;
    }
    .listImg {
      width: 100%;
      height: 300px;
      display: flex;
      .onlyBox {
        width: 350px;
        height: 100%;
        float: left;
        flex: 1;
        padding-left: 20px;
        box-sizing: border-box;
        .onlyImg {
          width: 100%;
          height: 200px;
          border-radius: 10px;
        }
        .onlyText {
          width: 100%;
          height: 45px;
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
  // 最新专辑
  .snewMusic {
    width: 1200px;
    height: 750px;
    margin: 30px 65px 0 65px;
    // 标题
    .newMusicName {
      margin-bottom: 10px;
      padding-bottom: 10px;
      font-size: 20px;
      font-weight: 700;
      color: #f2cac9;
      border-bottom: 3px solid #5d3131;
    }
    // 列表总容器
    .newMusicList {
      width: 100%;
      // 列表每个li
      .newMusicLi {
        width: 50%;
        height: 110px;
        float: left;
        // 每个li的内部盒子，号码、图片、歌名
        .newMusicBox {
          // 号码
          .newMusicNum {
            width: 30px;
            height: 100%;
            justify-content: center;
            padding-top: 35px;
            box-sizing: border-box;
            font-size: 25px;
            color: #f2cac9;
            float: left;
          }
          // 图片盒子
          .newMusicImgBox {
            position: relative;
            .newMusicImg {
              width: 100px;
              height: 100px;
              display: block;
              // filter: blur(1px);
              float: left;
              border-radius: 15px;
            }
          }
          // 播放按钮
          .iconfont {
            position: absolute;
            top: 90px;
            transform: translateY(-50px);
            left: 65px;
            z-index: 99999;
            font-size: 30px;
            color: #f2cac9;
            font-weight: 700;
          }
          // 音乐名字
          .newMusictext {
            width: 400px;
            height: 110px;
            float: left;
            .singName {
              font-size: 25px;
              color: #f2cac9;
              margin-bottom: 45px;
              margin-left: 20px;
              box-sizing: border-box;
            }
            .singBoos {
              font-size: 20px;
              color: #f2cac9;
              margin-left: 20px;
              box-sizing: border-box;
              // overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>