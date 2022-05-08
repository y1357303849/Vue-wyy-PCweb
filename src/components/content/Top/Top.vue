<template>
  <div class="topBox">
    <!-- 官方榜 -->
    <div class="authorityTop">
      <div class="topTitle">
        <p>官方榜</p>
      </div>
      <!-- 飙升榜 -->
      <div class="SoaringList">
        <div class="soaringTop">
          <div class="testBox" style="background-color: #7e2065">
            <div class="title1">
              <i>飙</i>
            </div>
            <div class="title2">
              <i>升榜</i>
              <div class="time">
                <i>09月17日</i>
              </div>
            </div>
            <div class="titlePlay">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="soaringList">
            <ul>
              <li
                @click="goAuthorityPage(index)"
                class="soaringLi"
                v-for="(item, index) in authorityTopList"
                :key="index"
              >
                <span class="listNum">{{ "0" + index }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 新歌榜 -->
      <div class="NewSingList">
        <div class="newSingTop">
          <div class="testBox" style="background-color: #144a74">
            <div class="title1">
              <i>新</i>
            </div>
            <div class="title2">
              <i>歌榜</i>
              <div class="time">
                <i>09月17日</i>
              </div>
            </div>
            <div class="titlePlay">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="newSingList">
            <ul>
              <li
                @click="goNewSingPage(index)"
                class="newSingLi"
                v-for="(item, index) in newSingTopList"
                :key="index"
              >
                <span class="listNum">{{ "0" + index }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 原创榜 -->
      <div class="OriginalList">
        <div class="originalTop">
          <div class="testBox" style="background-color: #10aec2">
            <div class="title1">
              <i>原</i>
            </div>
            <div class="title2">
              <i>创榜</i>
              <div class="time">
                <i>09月16日</i>
              </div>
            </div>
            <div class="titlePlay">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="originalList">
            <ul>
              <li
                @click="goOriginalPage(index)"
                class="originalLi"
                v-for="(item, index) in originalTopList"
                :key="index"
              >
                <span class="listNum">{{ "0" + index }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 热歌榜 -->
      <div class="HotSongList">
        <div class="hotSongTop">
          <div class="testBox" style="background-color: #20a162">
            <div class="title1">
              <i>热</i>
            </div>
            <div class="title2">
              <i>歌榜</i>
              <div class="time">
                <i>09月17日</i>
              </div>
            </div>
            <div class="titlePlay">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="hotSongList">
            <ul>
              <li
                @click="goHotSongPage(index)"
                class="hotSongLi"
                v-for="(item, index) in hotSongTopList"
                :key="index"
              >
                <span class="listNum">{{ "0" + index }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 爱听榜 -->
      <div class="LoveListenList">
        <div class="loveListenTop">
          <div class="testBox" style="background-color: #fbda41">
            <div class="title1">
              <i>爱</i>
            </div>
            <div class="title2">
              <i>听榜</i>
              <div class="time">
                <i>09月17日</i>
              </div>
            </div>
            <div class="titlePlay">
              <i class="iconfont icon-bofang"></i>
            </div>
          </div>
          <div class="loveListenList">
            <ul>
              <li class="loveListLi">
                <span class="listNum">04</span>
                <p class="listMusicName">xxxx</p>
                <p class="listSinger">xxxxx乐团</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 全球榜 -->
    <div class="globalTop">
      <div class="globalTitle">
        <p>全球榜</p>
      </div>
      <div class="globalList">
        <ul>
          <li
            @click="goGlobalPage(index)"
            class="globalLi"
            v-for="(item, index) in globalTopList"
            :key="index"
          >
            <div class="testBox2">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <p class="globalText">{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuthorityTopAPI,
  getNewSingTopAPI,
  getOriginalTopAPI,
  getHotSongTopAPI,
  getGlobalTopAPI,
} from "@/network/TopSong.js";

// eventBus
import bus from "@/components/content/eventBus.js";
export default {
  name: "Top",
  data() {
    return {
      // 飙升榜
      authorityTopList: [],
      // 新歌榜
      newSingTopList: [],
      // 原创榜
      originalTopList: [],
      // 热歌榜
      hotSongTopList: [],
      // 全球榜
      globalTopList: [],
      // 飙升榜总数据
      authorityAll: [],
      // 新歌榜总数据
      newSingAll: [],
      // 原创榜总数据
      originalAll: [],
      // 热歌榜总数据
      hotSongaAll: [],
      // 全球榜总数据
      globalAll: [],
    };
  },
  created() {
    this.Authority();
    this.NewSing();
    this.Original();
    this.HotSong();
    this.Global();
  },
  methods: {
    // 飙升榜
    async Authority() {
      const { data: res } = await getAuthorityTopAPI(this.authorityTopList);
      // console.log(res.playlist.tracks);
      this.authorityAll = res.playlist;
      this.authorityTopList = res.playlist.tracks.slice(0, 8);
    },
    // 新歌榜
    async NewSing() {
      const { data: res } = await getNewSingTopAPI(this.newSingTopList);
      // console.log(res.playlist.tracks);
      this.newSingAll = res.playlist;
      this.newSingTopList = res.playlist.tracks.slice(0, 8);
    },
    // 原创榜
    async Original() {
      const { data: res } = await getOriginalTopAPI(this.originalTopList);
      // console.log(res.playlist.tracks);
      this.originalAll = res.playlist;
      this.originalTopList = res.playlist.tracks.slice(0, 8);
    },
    // 热歌榜
    async HotSong() {
      const { data: res } = await getHotSongTopAPI(this.hotSongTopList);
      // console.log(res.playlist.tracks);
      this.hotSongAll = res.playlist;
      this.hotSongTopList = res.playlist.tracks.slice(0, 8);
    },
    // 全球榜
    async Global() {
      const { data: res } = await getGlobalTopAPI(this.globalTopList);
      // console.log(res.list);
      this.globalAll = res.list;
      // console.log(this.globalAll);
      this.globalTopList = res.list.slice(4, 34);
      // console.log(this.globalTopList);
    },
    // 跳转飙升榜详情页
    goAuthorityPage() {
      // console.log(this.authorityAll.id);
      // 点击跳转到authorityPage页面
      this.$router.push("/authorityPage");
      // 将当前点击对应的专辑ID数据传送给子页面
      // bus.$emit("authorityData", this.authorityTopList[this.authorityIndex]);
      bus.$emit("authorityData", this.authorityAll.id);
    },
    // 跳转新歌榜详情页
    goNewSingPage() {
      // 点击跳转到newSingPage页面
      this.$router.push("/newSingPage");
      // 将当前点击对应的专辑ID数据传送给子页面
      bus.$emit("newSingData", this.newSingAll.id);
    },
    // 跳转原创榜详情页
    goOriginalPage() {
      // 点击跳转到originalPage页面
      this.$router.push("/originalPage");
      // 将当前点击对应的专辑ID数据传送给子页面
      bus.$emit("originalData", this.originalAll.id);
    },
    // 跳转热歌榜详情页
    goHotSongPage() {
      // 点击跳转到hotSongPage页面
      this.$router.push("/hotSongPage");
      // 将当前点击对应的专辑ID数据传送给子页面
      bus.$emit("hotSongData", this.hotSongAll.id);
    },
    // 跳转全球榜详情页
    goGlobalPage(index) {
      // 点击跳转到globalPage页面
      this.$router.push("/globalPage");
      // 将当前点击的下标赋值
      const globalIndex = index + 4;
      // console.log(globalIndex);
      // 将当前点击对应的专辑ID数据传送给子页面
      bus.$emit("globalData", this.globalAll[globalIndex].id);
      // console.log(this.globalAll[globalIndex].id);
    },
  },
};
</script>

<style lang="less" scoped>
.topBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  // 官方榜
  .authorityTop {
    padding-left: 100px;
    height: 950px;
    .topTitle {
      font-size: 26px;
      font-weight: 900;
      color: #f2cac9;
    }
    .SoaringList,
    .NewSingList,
    .OriginalList,
    .HotSongList,
    .LoveListenList {
      padding-top: 20px;
      float: left;
      background-color: #5d3131;
      .soaringTop,
      .newSingTop,
      .originalTop,
      .hotSongTop,
      .loveListenTop {
        .testBox {
          width: 300px;
          height: 100px;
          display: flex;
          text-align: center;
          color: #f2cac9;
          // 头部大字
          .title1 {
            flex: 3;
            font-size: 60px;
            text-align: right;
            box-sizing: border-box;
            padding-top: 5px;
          }
          .title2 {
            flex: 4;
            font-size: 30px;
            text-align: left;
            padding-left: 10px;
            padding-top: 10px;
            box-sizing: border-box;
            .time {
              font-size: 20px;
            }
          }
          .titlePlay {
            flex: 2;
            padding-top: 20px;
            padding-right: 10px;
            box-sizing: border-box;
            .iconfont {
              font-size: 50px;
            }
          }
        }
        .soaringList,
        .newSingList,
        .originalList,
        .hotSongList,
        .loveListenList {
          width: 300px;
          height: 240px;
          // border: 1px solid black;
          // background-color: red;
          .soaringLi,
          .newSingLi,
          .originalLi,
          .hotSongLi,
          .loveListLi {
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            color: #f2cac9;
            // background-color: yellow;
            .listNum {
              flex: 1;
              float: left;
            }
            .listMusicName {
              flex: 5;
              float: left;
              text-align: left;
              padding-left: 5px;
              overflow: hidden;
              // background-color: purple;
            }
            .listSinger {
              flex: 4;
              float: left;
              text-align: right;
              padding-right: 5px;
              overflow: hidden;
              // background-color: skyblue;
            }
          }
          .soaringLi:nth-of-type(odd),
          .newSingLi:nth-of-type(odd),
          .originalLi:nth-of-type(odd),
          .hotSongLi:nth-of-type(odd) {
            background-color: #5a1f1b;
          }
          .soaringLi:hover,
          .newSingLi:hover,
          .originalLi:hover,
          .hotSongLi:hover {
            background-color: #964d22;
          }
        }
      }
    }
    .NewSingList,
    .OriginalList,
    .LoveListenList {
      padding-left: 70px;
    }
    .HotSongList,
    .LoveListenList {
      padding-top: 100px;
    }
  }
  // 全球榜
  .globalTop {
    padding-left: 100px;
    height: 1500px;
    .globalTitle {
      font-size: 26px;
      font-weight: 900;
      color: #f2cac9;
    }
    .globalList {
      padding-top: 20px;
      color: #f2cac9;
      .globalLi {
        width: 200px;
        height: 200px;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        // background-color: red;
        .testBox2 {
          width: 100%;
          height: 90%;
          border-radius: 20px;
          // background-color: skyblue;
          img {
            width: 100%;
            height: 100%;
            border-radius: 20px;
          }
        }
        .globalText {
          text-align: center;
        }
      }
    }
  }
}
</style>