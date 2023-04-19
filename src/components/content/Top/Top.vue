<template>
  <div class="topBox">
    <!-- 官方榜 -->
    <div class="authorityTop">
      <div class="topTitle">
        <p>官方榜</p>
      </div>
      <div class="autLists">
        <!-- 飙升榜 -->
        <div class="alList" @click="goListPage(authorityAll)">
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
                class="soaringLi"
                v-for="(item, index) in authorityTopList"
                :key="index"
              >
                <span class="listNum">{{ index + 1 }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 新歌榜 -->
        <div class="alList" @click="goListPage(newSingAll)">
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
          <div class="soaringList">
            <ul>
              <li
                class="soaringLi"
                v-for="(item, index) in newSingTopList"
                :key="index"
              >
                <span class="listNum">{{ index + 1 }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 原创榜 -->
        <div class="alList" @click="goListPage(originalAll)">
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
          <div class="soaringList">
            <ul>
              <li
                class="soaringLi"
                v-for="(item, index) in originalTopList"
                :key="index"
              >
                <span class="listNum">{{ index + 1 }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 热歌榜 -->
        <div class="alList" @click="goListPage(hotSongaAll)">
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
          <div class="soaringList">
            <ul>
              <li
                class="soaringLi"
                v-for="(item, index) in hotSongTopList"
                :key="index"
              >
                <span class="listNum">{{ index + 1 }}</span>
                <p class="listMusicName">{{ item.name }}</p>
                <p class="listSinger">{{ item.ar[0].name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 爱听榜 -->
        <div class="alList">
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
          <div class="soaringList">
            <ul>
              <li class="soaringLi">
                <span class="listNum">1</span>
                <p class="listMusicName">xxxxxxxxx</p>
                <p class="listSinger">xxxxxxxxx</p>
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
            @click="goGlobalPage(item)"
            class="globalLi"
            v-for="(item, index) in globalTopList"
            :key="index"
          >
            <div class="testBox2">
              <img :src="item.coverImgUrl" alt="" />
            </div>
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
      authorityId: [],
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
      // console.log(res.playlist);
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

      this.globalTopList = res.list;
      // console.log(this.globalTopList);
    },
    // 跳转飙升榜详情页
    goListPage(i) {
      // console.log(i);
      setTimeout(() => {
        this.$router.push({
          path: "/playListDetail2",
          query: { musicData: i },
        });
      }, 500);
    },
    // 跳转全球榜详情页
    goGlobalPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/playListDetail",
          query: { musicData: i },
        });
      }, 500);
    },
  },
};
</script>

<style lang="less">
.topBox {
  width: 100%;
  margin-top: 75px;
  // 官方榜
  .authorityTop {
    width: 100%;
    height: 800px;
    .topTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 25px;
      font-weight: 900;
      color: #f2cac9;
      border-bottom: 3px solid #f2cac9;
    }
    .autLists {
      width: 100%;
      height: calc(100% - 50px);
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      .alList {
        width: 300px;
        height: 350px;
        margin-left: 40px;
        .testBox {
          width: 300px;
          height: 100px;
          display: flex;
          text-align: center;
          color: #f2cac9;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
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
        .soaringList {
          width: 300px;
          height: 240px;

          .soaringLi {
            width: 100%;
            height: 30px;
            line-height: 30px;
            display: flex;
            color: #f2cac9;
            transition: 0.5s;
            border-radius: 5px;
            .listNum {
              flex: 1;
              float: left;
              margin-left: 5px;
            }
            .listMusicName {
              flex: 5;
              float: left;
              text-align: left;
              padding-left: 5px;
              overflow: hidden;
            }
            .listSinger {
              flex: 4;
              float: left;
              text-align: right;
              padding-right: 5px;
              overflow: hidden;
            }
          }
          .soaringLi:nth-of-type(odd) {
            background-color: #5a1f1b;
          }
          .soaringLi:hover {
            background-color: #f2cac9;
            color: #5a1f1b;
            font-weight: bold;
          }
        }
      }
    }
  }
  // 全球榜
  .globalTop {
    width: 100%;
    margin-top: 20px;
    .globalTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 25px;
      font-weight: 900;
      color: #f2cac9;
      border-bottom: 3px solid #f2cac9;
    }
    .globalList {
      width: 100%;
      margin-top: 20px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .globalLi {
          width: 200px;
          height: 200px;
          margin-bottom: 20px;
          margin-left: 30px;
          cursor: pointer;
          border-radius: 20px;
          .testBox2 {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;

              transition: 0.5s;
            }
          }
        }
        .globalLi:hover {
          box-shadow: 1px 1px 10px 1px #f2cac9;
          img {
            transform: scale(1.2);
          }
        }
      }
    }
  }
}
</style>
