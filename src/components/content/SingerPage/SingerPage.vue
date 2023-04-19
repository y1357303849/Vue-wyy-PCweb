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
          class="stbLi"
          @click="getsTab(1)"
          :class="{ tabActive: showTabs === 1 }"
        >
          专辑
        </li>
        <li
          class="stbLi"
          @click="getsTab(2)"
          :class="{ tabActive: showTabs === 2 }"
        >
          MV
        </li>
        <li
          class="stbLi"
          @click="getsTab(3)"
          :class="{ tabActive: showTabs === 3 }"
        >
          歌手详情
        </li>
        <li
          class="stbLi"
          @click="getsTab(4)"
          :class="{ tabActive: showTabs === 4 }"
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
          <div class="topTitle">{{ item.name }}</div>
          <li
            class="hotSingContent"
            v-for="(item2, index) in singerAlbums"
            :key="index"
          >
            <div class="hotNum">{{ index + 1 }}</div>

            <div class="singName">{{ item2.name }}</div>
            <div class="singTime">02:21</div>
          </li>
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
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "SingerPage",
  data() {
    return {
      // 展示点击tab对应的内容
      showType: 1,
      showTabs: 1,

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
    this.singerId = this.$route.query.singerData;
    // console.log(this.singerId);

    this.singerTopDetail();
    this.singerHotDetail();
    this.singerAlbumDetail();

    this.singerMvDetail();
    this.singerSimilarDetail();
    // this.singerMoreDetail();
  },
  mounted() {
    // this.singerAlbumsDetail();
  },
  methods: {
    // 请求歌手头部详情数据
    async singerTopDetail() {
      const { data: res } = await request.get(
        "/artist/detail?id=" + this.singerId
      );
      this.topDetail = res.data;
      // console.log(this.topDetail);
    },
    // 请求歌手热门50首详情数据
    async singerHotDetail() {
      const { data: res } = await request.get(
        "/artist/top/song?id=" + this.singerId
      );
      this.hotDetail = res.songs;
    },
    // 请求歌手专辑详情数据
    async singerAlbumDetail() {
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/artist/album?id=" + this.singerId + "&limit=30"
      );
      this.albumDetail = res.hotAlbums;
      // console.log(this.albumDetail);
      // 提取出各个专辑的ID，在请求专辑的详情数据
      this.albumDetail.forEach((item) => {
        // console.log(item.id);
        this.singerAlbumId.push(item.id);
      });
    },
    // 请求歌手各个专辑详情数据
    // async singerAlbumsDetail() {
    //   let albumId = this.singerAlbumId;

    //   for (let i = 0; i <= albumId.length; i++) {

    //     const { data: res } = await request.get("/album?id=" + albumId[i]);

    //     this.singerAlbums.push(res.songs);

    //   }
    //   console.log(this.singerAlbums[3]);
    // },
    // 请求歌手MV详情数据
    async singerMvDetail() {
      const { data: res } = await request.get("/artist/mv?id=" + this.singerId);
      this.mvDetail = res.mvs;
      // console.log(this.mvDetail);
    },
    // 请求歌手介绍详情数据
    async singerSimilarDetail() {
      const { data: res } = await request.get(
        "/artist/desc?id=" + this.singerId
      );
      this.similarDetail = res;
      // console.log(this.similarDetail);
    },
    // 请求相似歌手详情数据
    // async singerMoreDetail() {
    //   const { data: res } = await request.get(
    //     "/simi/artist?id=" + this.singerId
    //   );
    //   this.singerMores = res.artists;
    //   console.log(this.singerMores);
    // },
    // 点击tab切换对应的内容，并改变css样式

    // 点击切换内容
    getsTab(i) {
      this.showType = i;
      this.showTabs = i;
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

<style lang="less">
.singerBox {
  width: 100%;
  margin-top: 75px;

  // 头部区域
  .singerTopBox {
    width: 100%;
    height: 250px;

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

    .stbLi {
      width: 150px;
      height: 50px;
      line-height: 50px;
      float: left;
      text-align: center;
      color: #f2cac9;
    }
    .stbLi:hover {
      color: #964d22;

      border-bottom: 5px solid #964d22;
    }
    .tabActive {
      color: #964d22;
      border-bottom: 5px solid #964d22;
    }
  }
  // 专辑内容区域
  .albumContentBox {
    width: 100%;
    margin-top: 20px;

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
        border-radius: 10px;
        overflow: hidden;
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
    // 其他专辑区域
    .albumBox {
      width: 100%;
      height: 400px;
      margin-top: 50px;
      .firstSingImg {
        width: 150px;
        height: 150px;
        float: left;
        border-radius: 10px;
        overflow: hidden;
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
    margin-top: 20px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .mvContentLi {
        width: 200px;
        height: 150px;
        margin-left: 20px;
        margin-top: 10px;
        .mvImgBox {
          width: 100%;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          img {
            transition: 0.5s;
            width: 100%;
            height: 100%;
          }
        }
        .mvNameBox {
          width: 100%;
          height: 45px;
          line-height: 22px;
          color: #f2cac9;
          margin-top: 5px;
          font-weight: bold;
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
      .mvContentLi:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }
  // 歌手详情区域
  .singerDataContentBox {
    width: 100%;
    height: 1500px;
    margin-top: 20px;

    .headline {
      font-size: 20px;
      font-weight: 900;
      color: #964d22;
      margin-top: 5px;
    }
    .contentText {
      text-indent: 34px;
      margin-top: 5px;
      font-size: 17px;
      color: #f2cac9;
    }
  }
  // 相似歌手区域
  .singerAlike {
    width: 100%;
    height: 1500px;
    margin-top: 20px;

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
