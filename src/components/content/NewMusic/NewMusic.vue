<template>
  <div class="newMvBox">
    <!-- 顶部导航 -->
    <div class="topTab">
      <ul>
        <li>全部</li>
        <li>华语</li>
        <li>欧美</li>
        <li>韩国</li>
        <li>日本</li>
      </ul>
    </div>
    <!-- 列表顶部 -->
    <div class="newMusicTop">
      <div class="box1"></div>
      <div class="box2">操作</div>
      <div class="box3">音乐标题</div>
      <div class="box4">歌手</div>
      <div class="box5">专辑</div>
      <div class="box6">时长</div>
    </div>
    <!-- 歌曲列表 -->
    <div class="newMusicList">
      <ul>
        <li
          class="nmLi"
          v-for="(item, index) in newMusicList"
          :key="index"
          @dblclick="playMusic(item)"
        >
          <div class="musicNum">{{ index + 1 }}</div>
          <div class="musicPic">
            <img :src="item.picUrl" alt="" />
            <i class="iconfont icon-bofang"></i>
          </div>
          <div class="musicName">{{ item.name }}</div>
          <div class="musicSinger">{{ item.song.artists[0].name }}</div>
          <div class="musicAlbum">{{ item.song.album.name }}</div>
          <div class="musicTime">00:00</div>
        </li>
        <!-- 音乐播放 -->
        <!-- <audio :src="musicUrlList" autoplay></audio> -->
      </ul>
    </div>
  </div>
</template>

<script>
import { getNewMusicAPI } from "@/network/NewMusic.js";
// 导入request模块
import request from "@/untils/request.js";
export default {
  name: "NewMusic",
  data() {
    return {
      // 最新音乐列表
      newMusicList: [],
      // 传送给左下角的数据
      newMusicLeft: [],
      // 音乐播放
      musicUrlList: [],
    };
  },
  created() {
    this.NewMusicList();
    // this.playMusic();
  },
  methods: {
    // 最新音乐
    async NewMusicList() {
      const { data: res } = await getNewMusicAPI(this.newMusicList);
      // console.log(res.result);
      this.newMusicList = res.result;
      // console.log(this.newMusicList.song.artists.name);
    },
    // 双击播放音乐
    async playMusic(i) {
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌手详情页的数据
        "/song/url?id=" + i.id
      );
      // console.log(res.data[0].url);
      this.musicUrlList = res.data[0].url;
      // console.log("双击", i);
      // 存储歌名歌手专辑封面到vuex
      this.$store.dispatch("asyncUpdateSongs", {
        name: i.name,
        user: i.song.artists[0].name,
        album: i.picUrl,
        songsUrl: this.musicUrlList,
      });
      // console.log(document.getElementsByTagName("a")[0].__vue__.$store);
    },
  },
};
</script>

<style lang="less">
.newMvBox {
  width: 100%;
  margin-top: 75px;

  // 顶部导航
  .topTab {
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 3px solid #f2cac9;
    li {
      width: 50px;
      float: left;
      color: #f2cac9;
      text-align: center;
    }
    li:hover {
      color: #964d22;
      border-bottom: 4px solid #964d22;
    }
    li:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
  // 列表顶部
  .newMusicTop {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 10px;
    border-radius: 10px;
    display: flex;
    background-color: #964d22;
    div {
      color: #f2cac9;
      float: left;
      // border: 1px solid #964d22;
    }
    .box1,
    .box2 {
      flex: 1;
    }
    .box3,
    .box4,
    .box5 {
      flex: 5;
    }
    .box6 {
      flex: 4;
    }
  }
  // 歌曲列表
  .newMusicList {
    width: 100%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      .nmLi {
        width: 100%;
        height: 60px;
        line-height: 60px;
        color: #f2cac9;
        text-align: center;
        display: flex;
        margin-top: 10px;
        cursor: pointer;
        border-radius: 10px;
        .musicNum {
          flex: 1;
        }
        .musicPic {
          flex: 1;
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
          .iconfont {
            position: absolute;
            top: 5px;
            transform: translateY(-5px);
            left: 15px;
            font-size: 30px;
            z-index: 99999;
            color: #f2cac9;
            font-weight: 700;
          }
        }
        .musicName {
          flex: 5;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .musicSinger {
          flex: 5;
        }
        .musicAlbum {
          flex: 5;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .musicTime {
          flex: 4;
        }
      }
      .nmLi:hover {
        box-shadow: 1px 1px 10px 1px #f2cac9;
        img {
          transform: scale(1.1);
        }
      }
    }
    // .nmLi:nth-child(even) {
    //   background-color: #964d22;
    // }
  }
}
</style>
