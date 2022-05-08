<template>
  <div class="singerBox">
    <!-- 头部信息区域 -->
    <div class="singerTopBox">
      <!-- 歌手头像 -->
      <div class="singerImgbox">
        <img :src="topDetail.artist.cover" alt="" />
      </div>
      <!-- 歌手介绍区域 -->
      <div class="singerDetailBox">
        <div class="detailTop">
          <div class="singerSbox">歌手</div>
          <div class="singerName">{{ topDetail.artist.name }}</div>
        </div>
        <div class="detailCotent">
          <div class="songNum">
            <div class="titleText">单曲数：</div>
            <div class="number1">{{ topDetail.artist.musicSize }}</div>
          </div>
          <div class="albumNum">
            <div class="titleText">专辑数：</div>
            <div class="number2">{{ topDetail.artist.mvSize }}</div>
          </div>
          <div class="mvNum">
            <div class="titleText">MV数：</div>
            <div class="number3">{{ topDetail.artist.albumSize }}</div>
          </div>
          <div class="abstract">
            <div class="titleText">简介：</div>
            <div class="introText">
              {{ topDetail.artist.briefDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Tab选择栏 -->
    <div class="singerTabBox">
      <ul>
        <li
          class="albumLi"
          @click="getAlbumli(1, index)"
          :class="{ tabActive: showAlbumli === index }"
        >
          专辑
        </li>
        <li
          class="mvLi"
          @click="getMvli(2, index)"
          :class="{ tabActive: showMvli === index }"
        >
          MV
        </li>
        <li
          class="singerDataLi"
          @click="getSingerDatali(3, index)"
          :class="{ tabActive: showSingerDatali === index }"
        >
          歌手详情
        </li>
        <li
          class="similarLi"
          @click="getSimilarli(4, index)"
          :class="{ tabActive: showSimilarli === index }"
        >
          相似歌手
        </li>
      </ul>
    </div>
    <!-- 专辑区域内容 -->
    <div class="albumContentBox" v-show="showType === 1">
      <!-- 热门50首区域 -->
      <div class="hotDetailBox">
        <div class="firstSingImg">
          <img :src="hotDetail[0].al.picUrl" alt="" />
        </div>
        <div class="hotContentBox">
          <ul>
            <li class="topTitle">热门50首</li>
            <li
              class="hotSingContent"
              v-for="(item, index) in hotDetail"
              :key="index"
            >
              <div class="hotNum">{{ index + 1 }}</div>
              <div @click="getLike(item)" class="likeIcon">
                <i class="iconfont icon-like__easyico" v-if="item.likeShow"></i>
                <i class="iconfont icon-shoucang" v-else></i>
              </div>
              <div class="singName">{{ item.name }}</div>
              <div class="singTime">02:21</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 其他专辑区域 -->
      <div class="albumBox" v-for="(item, index) in albumDetail" :key="index">
        <div class="firstSingImg">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="hotContentBox">
          <ul>
            <li class="topTitle">{{ item.name }}</li>
            <li
              class="hotSingContent"
              v-for="(item, index) in singerAlbums"
              :key="index"
            >
              <div class="hotNum">{{ index }}</div>
              <div @click="getLike(item)" class="likeIcon">
                <i class="iconfont icon-like__easyico" v-if="item.likeShow"></i>
                <i class="iconfont icon-shoucang" v-else></i>
              </div>
              <div class="singName">{{ item.name }}</div>
              <div class="singTime">02:21</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- MV区域内容 -->
    <div class="mvContentBox" v-show="showType === 2">
      <ul>
        <li class="mvContentLi" v-for="(item, index) in mvDetail" :key="index">
          <div class="mvImgBox">
            <img :src="mvDetail[index].imgurl" alt="" />
          </div>
          <div class="mvNameBox">{{ mvDetail[index].name }}</div>
        </li>
      </ul>
    </div>
    <!-- 歌手详情区域内容 -->
    <div class="singerDataContentBox" v-show="showType === 3">
      <ul>
        <li class="headline">{{ topDetail.artist.name }}简介</li>
        <li class="contentText">{{ similarDetail.briefDesc }}</li>
        <li class="headline" v-if="similarDetail.introduction[0]">
          {{ similarDetail.introduction[0].ti }}
        </li>
        <li class="contentText" v-if="similarDetail.introduction[0]">
          {{ similarDetail.introduction[0].txt }}
        </li>
        <li class="headline" v-if="similarDetail.introduction[1]">
          {{ similarDetail.introduction[1].ti }}
        </li>
        <li class="contentText" v-if="similarDetail.introduction[1]">
          {{ similarDetail.introduction[1].txt }}
        </li>
        <li class="headline" v-if="similarDetail.introduction[2]">
          {{ similarDetail.introduction[2].ti }}
        </li>
        <li class="contentText" v-if="similarDetail.introduction[2]">
          {{ similarDetail.introduction[2].txt }}
        </li>
        <li class="headline" v-if="similarDetail.introduction[3]">
          {{ similarDetail.introduction[3].ti }}
        </li>
        <li class="contentText" v-if="similarDetail.introduction[3]">
          {{ similarDetail.introduction[3].txt }}
        </li>
        <li class="headline" v-if="similarDetail.introduction[4]">
          {{ similarDetail.introduction[4].ti }}
        </li>
        <li class="contentText" v-if="similarDetail.introduction[4]">
          {{ similarDetail.introduction[4].txt }}
        </li>
      </ul>
    </div>
    <!-- 相似歌手内容 -->
    <div class="singerAlike" v-show="showType === 4">
      <ul>
        <li v-for="(item, index) in singerMores" :key="index" class="moreList">
          <div class="msingerImg">
            <img :src="item.picUrl" alt="" />
          </div>
          <div class="msingerName">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// eventBus
import bus from "@/components/content/eventBus.js";
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "SingerPage",
  data() {
    return {
      // 展示点击tab对应的内容
      showType: 1,
      // 点击时添加的css样式
      index: "",
      showAlbumli: 0,
      showMvli: 0,
      showSingerDatali: 0,
      showSimilarli: 0,
      // 传过来的歌手ID
      singerId: "",
      // 头部信息数据
      topDetail: [],
      // 热门50首数据
      hotDetail: [],
      // 歌手专辑数据
      albumDetail: [],
      // 歌手专辑ID数据
      singerAlbumId: [],
      // 歌手专辑详情数据
      singerAlbums: [],
      // mv数据
      mvDetail: [],
      // 歌手介绍数据
      similarDetail: [],
      // 相似歌手
      singerMores: [],
    };
  },
  created() {
    // 销毁bus
    bus.$off("singerData");
    this.singerTopDetail();
    this.singerHotDetail();
    this.singerAlbumDetail();
    this.singerAlbumsDetail();
    this.singerMvDetail();
    this.singerSimilarDetail();
    this.singerMoreDetail();
  },
  mounted() {
    // 接收父页面点击传送过来的数据id
    bus.$on("singerData", (val) => {
      this.singerId = val.id;
      console.log(this.singerId);
      // 将数据存储到localStorage里
      window.localStorage.setItem("singerData", JSON.stringify(this.singerId));
    });
  },
  methods: {
    // 请求歌手头部详情数据
    async singerTopDetail() {
      // 将存储的数据赋值到musicId里
      const singerTop = window.localStorage;
      console.log(singerTop);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/detail?id=" + singerTop.singerData,
        {
          params: {
            toplist: this.topDetail,
          },
        }
      );
      this.topDetail = res.data;
      // console.log(this.topDetail);
    },
    // 请求歌手热门50首详情数据
    async singerHotDetail() {
      // 将存储的数据赋值到musicId里
      const singerHot = window.localStorage;
      // console.log(singerHot);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/top/song?id=" + singerHot.singerData,
        {
          params: {
            hotlist: this.hotDetail,
          },
        }
      );
      this.hotDetail = res.songs;
      // console.log(this.hotDetail);
    },
    // 请求歌手专辑详情数据
    async singerAlbumDetail() {
      // 将存储的数据赋值到musicId里
      const singerAlbum = window.localStorage;
      // console.log(singerHot);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/album?id=" + singerAlbum.singerData + "&limit=30",
        {
          params: {
            albumlist: this.albumDetail,
          },
        }
      );
      this.albumDetail = res.hotAlbums;
      // 提取出各个专辑的ID，在请求专辑的详情数据
      this.albumDetail.forEach((item) => {
        // console.log(item.id);
        this.singerAlbumId.push(item.id);
      });
      // console.log(this.singerAlbumId);
      // console.log(this.albumDetail);
    },
    // 请求歌手各个专辑详情数据
    async singerAlbumsDetail() {
      // 将存储的数据赋值到musicId里
      const albumId = this.singerAlbumId;
      JSON.parse(JSON.stringify(albumId));
      // const albumId = JSON.parse(JSON.stringify(this.singerAlbumId));
      console.log(JSON.parse(JSON.stringify(albumId)));
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/album?id=" + albumId,
        {
          params: {
            idlist: this.singerAlbums,
          },
        }
      );
      this.singerAlbums = res.songs;
      console.log(this.singerAlbums.name);
    },
    // 请求歌手MV详情数据
    async singerMvDetail() {
      // 将存储的数据赋值到musicId里
      const singerMv = window.localStorage;
      // console.log(singerMv);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/mv?id=" + singerMv.singerData,
        {
          params: {
            mvlist: this.mvDetail,
          },
        }
      );
      this.mvDetail = res.mvs;
      // console.log(this.mvDetail);
    },
    // 请求歌手介绍详情数据
    async singerSimilarDetail() {
      // 将存储的数据赋值到musicId里
      const singerSimilar = window.localStorage;
      // console.log(singerSimilar);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/desc?id=" + singerSimilar.singerData,
        {
          params: {
            similarlist: this.similarDetail,
          },
        }
      );
      this.similarDetail = res;
      // console.log(this.similarDetail);
    },
    // 请求相似歌手详情数据
    async singerMoreDetail() {
      // 将存储的数据赋值到musicId里
      const singerMore = window.localStorage;
      // console.log(singerMore);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/simi/artist?id=" + singerMore.singerData,
        {
          params: {
            morelist: this.singerMores,
          },
        }
      );
      this.singerMores = res.artists;
      // console.log(this.singerMores);
    },
    // 点击tab切换对应的内容，并改变css样式
    getAlbumli(type, index) {
      this.showAlbumli = index;
      (this.showMvli = 0),
        (this.showSingerDatali = 0),
        (this.showSimilarli = 0);
      this.showType = type;
      if (this.showType === 1) {
        this.style.display = true;
      }
    },
    getMvli(type, index) {
      this.showMvli = index;
      (this.showAlbumli = 0),
        (this.showSingerDatali = 0),
        (this.showSingerDatali = 0);
      this.showType = type;
      if (this.showType === 1) {
        this.style.display = true;
      }
    },
    getSingerDatali(type, index) {
      this.showSingerDatali = index;
      (this.showAlbumli = 0), (this.showMvli = 0), (this.showSimilarli = 0);
      this.showType = type;
      if (this.showType === 1) {
        this.style.display = true;
      }
    },
    getSimilarli(type, index) {
      this.showSimilarli = index;
      (this.showAlbumli = 0), (this.showMvli = 0), (this.showSingerDatali = 0);
      this.showType = type;
      if (this.showType === 1) {
        this.style.display = true;
      }
    },
    // 点击喜爱按钮
    getLike(item) {
      if ((item.likeShow = !item.likeShow)) {
        this.likeShow = true;
      } else {
        this.likeShow = false;
      }
      // 强制刷新
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="less" scoped>
.singerBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  // 头部区域
  .singerTopBox {
    width: 100%;
    height: 250px;
    margin-left: 50px;
    // 歌手头像
    .singerImgbox {
      width: 20%;
      height: 100%;
      float: left;
      // text-align: center;
      img {
        width: 95%;
        height: 100%;
        border-radius: 20px;
      }
    }
    // 歌手介绍区域
    .singerDetailBox {
      width: 80%;
      height: 100%;
      float: left;
      .detailTop {
        width: 100%;
        height: 40px;
        .singerSbox {
          width: 50px;
          height: 30px;
          margin-top: 2px;
          border: 2px solid #f2cac9;
          border-radius: 5px;
          color: #f2cac9;
          line-height: 30px;
          text-align: center;
          font-weight: 900;
          float: left;
        }
        .singerName {
          width: 80%;
          height: 40px;
          line-height: 40px;
          margin-left: 20px;
          font-weight: 900;
          color: #f2cac9;
          font-size: 20px;
          float: left;
        }
      }
      .detailCotent {
        margin-top: 10px;
        width: 100%;
        // 单曲数、专辑数、MV数
        .songNum {
          width: 100%;
          height: 30px;
          .titleText {
            width: 70px;
            height: 30px;
            margin-left: 10px;
            line-height: 30px;
            float: left;
            color: #f2cac9;
            font-weight: 900;
          }
          .number1 {
            float: left;
            color: #964d22;
            width: 500px;
            height: 30px;
            line-height: 30px;
            font-weight: 900;
          }
        }
        .albumNum {
          width: 100%;
          height: 30px;
          .titleText {
            width: 70px;
            height: 30px;
            margin-left: 10px;
            line-height: 30px;
            float: left;
            color: #f2cac9;
            font-weight: 900;
          }
          .number2 {
            float: left;
            color: #964d22;
            width: 500px;
            height: 30px;
            line-height: 30px;
            font-weight: 900;
          }
        }
        .mvNum {
          width: 100%;
          height: 30px;
          .titleText {
            width: 70px;
            height: 30px;
            margin-left: 10px;
            line-height: 30px;
            float: left;
            color: #f2cac9;
            font-weight: 900;
          }
          .number3 {
            float: left;
            color: #964d22;
            width: 500px;
            height: 30px;
            line-height: 30px;
            font-weight: 900;
          }
        }
        // 简介
        .abstract {
          width: 100%;
          .titleText {
            width: 50px;
            height: 110px;
            margin-left: 10px;
            line-height: 30px;
            float: left;
            color: #f2cac9;
            font-weight: 900;
          }
          .introText {
            color: #964d22;
            width: 900px;
            float: left;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
            font-weight: 900;
          }
        }
      }
    }
  }
  // Tab选择栏
  .singerTabBox {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    margin-left: 50px;
    .albumLi,
    .mvLi,
    .singerDataLi,
    .similarLi {
      width: 150px;
      height: 50px;
      float: left;
      text-align: center;
      padding-top: 15px;
      box-sizing: border-box;
      color: #f2cac9;
    }
    li:hover {
      color: #964d22;
      font-weight: 900;
      border-bottom: 5px solid #964d22;
    }
    .tabActive {
      color: #964d22;
      border-bottom: 5px solid #964d22;
      box-sizing: border-box;
    }
  }
  // 专辑内容区域
  .albumContentBox {
    width: 100%;
    margin-top: 20px;
    margin-left: 50px;
    // 热门50首区域
    .hotDetailBox {
      width: 100%;
      height: 400px;
      overflow-y: scroll;
      overflow-x: hidden;
      .firstSingImg {
        width: 150px;
        height: 150px;
        float: left;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .hotContentBox {
        width: 1000px;
        margin-left: 30px;
        float: left;
        .topTitle {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-weight: 900;
          color: #f2cac9;
        }
        .hotSingContent {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          .hotNum,
          .singTime {
            flex: 1;
            float: left;
            text-align: center;
            color: #f2cac9;
          }
          .likeIcon {
            flex: 1;
            float: left;
            text-align: center;
            color: #f2cac9;
          }
          .singName {
            flex: 10;
            float: left;
            padding-left: 10px;
            color: #f2cac9;
          }
        }
      }
    }
    // 其他专辑区域
    .albumBox {
      width: 100%;
      height: 400px;
      margin-top: 50px;
      .firstSingImg {
        width: 150px;
        height: 150px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .hotContentBox {
        width: 1000px;
        margin-left: 30px;
        float: left;
        .topTitle {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-weight: 900;
          color: #f2cac9;
        }
        .hotSingContent {
          width: 100%;
          height: 30px;
          line-height: 30px;
          display: flex;
          .hotNum,
          .singTime {
            flex: 1;
            float: left;
            text-align: center;
            color: #f2cac9;
          }
          .likeIcon {
            flex: 1;
            float: left;
            text-align: center;
            color: #f2cac9;
          }
          .singName {
            flex: 10;
            float: left;
            padding-left: 10px;
            color: #f2cac9;
          }
        }
      }
    }
  }
  // MV内容区域
  .mvContentBox {
    width: 100%;
    height: 900px;
    margin-top: 20px;
    margin-left: 50px;
    .mvContentLi {
      width: 200px;
      height: 150px;
      float: left;
      margin-top: 10px;
      .mvImgBox {
        width: 150px;
        height: 100px;
        img {
          padding-left: 25px;
          width: 100%;
          height: 100%;
        }
      }
      .mvNameBox {
        width: 150px;
        height: 35px;
        margin-left: 25px;
        margin-top: 5px;
        font-size: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  // 歌手详情区域
  .singerDataContentBox {
    width: 100%;
    height: 1500px;
    margin-top: 20px;
    margin-left: 50px;
    .headline {
      font-size: 20px;
      font-weight: 900;
      color: #f2cac9;
      margin-top: 5px;
    }
    .contentText {
      text-indent: 34px;
      margin-top: 5px;
      font-size: 17px;
      color: #964d22;
    }
  }
  // 相似歌手区域
  .singerAlike {
    width: 100%;
    height: 1500px;
    margin-top: 20px;
    margin-left: 20px;
    .moreList {
      width: 200px;
      height: 200px;
      float: left;
      margin-left: 40px;
      margin-top: 10px;
      // 歌手头像
      .msingerImg {
        width: 100%;
        height: 170px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      // 歌手名字
      .msingerName {
        width: 100%;
        height: 30%;
        line-height: 30px;
        text-align: center;
        font-weight: 900;
        color: #f2cac9;
      }
    }
  }
}
</style>