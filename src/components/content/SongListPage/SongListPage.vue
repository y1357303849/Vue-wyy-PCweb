<template>
  <div class="songListBox">
    <!-- 歌单头部区域 -->
    <div class="detailTopBox">
      <!-- 歌单图片 -->
      <div class="musicImg">
        <img :src="songdetail.coverImgUrl" alt="" />
      </div>
      <!-- 歌单信息区域 -->
      <div class="detailMessageBox">
        <!-- 歌单图标、歌单名字 -->
        <div class="listNameBox">
          <div class="icon">歌单</div>
          <div class="listName">{{ songdetail.name }}</div>
        </div>
        <!-- 创建者头像、昵称、时间 -->
        <div class="userBox">
          <div class="creator">
            <img :src="songdetail.creator.avatarUrl" alt="" />
          </div>
          <div class="userName">{{ songdetail.creator.nickname }}</div>
          <div class="setUpTime">创建时间：2020-06-08</div>
        </div>
        <!-- 播放、收藏、分享按钮 -->
        <div class="listButton">
          <div class="playerAllBtn">
            <i class="iconfont icon-bofang"></i>
            <div>播放全部</div>
          </div>
          <div class="collectBtn">
            <i class="iconfont icon-24gl-folderHeart"></i>
            <div>收藏({{ songdetail.subscribedCount }})</div>
          </div>
          <div class="shareBtn">
            <i class="iconfont icon-fenxiang"></i>
            <div>分享({{ songdetail.shareCount }})</div>
          </div>
        </div>
        <!-- 标签 -->
        <div class="tag">
          标签：<a
            href="#"
            v-for="(item, index) in songdetail.tags"
            :key="index"
            >{{ item }}/</a
          >
        </div>
        <!-- 简介 -->
        <div class="intro">
          <p class="intro1">简介：</p>
          <p class="intro2">{{ songdetail.description }}</p>
        </div>
      </div>
      <!-- 歌曲数、播放数 -->
      <div class="numBox">
        <div class="singNum">
          歌曲数
          <p>{{ songdetail.trackCount }}</p>
        </div>
        <div class="playerNum">
          播放数
          <p>{{ songdetail.playCount }}</p>
        </div>
      </div>
    </div>
    <!-- 歌单主体区域 -->
    <div class="detailContentBox">
      <!-- 头部选择 -->
      <div class="topTab">
        <ul>
          <li>
            <div
              class="songsList"
              :class="{ tabActive: showList === index }"
              @click="getSongList(1, index)"
            >
              歌曲列表
            </div>
          </li>
          <li>
            <div
              class="comment"
              :class="{ tabActive: showComment === index }"
              @click="getComment(2, index)"
            >
              评论({{ this.songComment.length }})
            </div>
          </li>
          <li>
            <div
              class="collector"
              :class="{ tabActive: showCollector === index }"
              @click="getCollector(3, index)"
            >
              收藏者
            </div>
          </li>
        </ul>
      </div>
      <!-- 内容区域 -->
      <!-- 歌曲列表 -->
      <div class="listContent" v-show="showType === 1">
        <div class="listTop">
          <div class="box1"></div>
          <div class="box2">操作</div>
          <div class="box3">音乐标题</div>
          <div class="box4">歌手</div>
          <div class="box5">专辑</div>
          <div class="box6">时长</div>
        </div>
        <div class="songLists">
          <ul>
            <li v-for="(item, index) in songdetail.tracks" :key="index">
              <div class="songNum">{{ index }}</div>
              <!-- <div
                :class="[
                  likeKey === false
                    ? 'iconfont icon-shoucang'
                    : 'iconfont icon-like__easyico',
                ]"
                @click="getLike(likeKey, index)"
              ></div> -->
              <div @click="getLike(item)" class="iconfont">
                <i class="iconfont icon-like__easyico" v-if="item.likeShow"></i>
                <i class="iconfont icon-shoucang" v-else></i>
              </div>
              <div class="songName">{{ item.name }}</div>
              <div class="songSinger">{{ item.ar[0].name }}</div>
              <div class="songAlbum">{{ item.al.name }}</div>
              <div class="songTime">01:53</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 评论 -->
      <div class="commentContent" v-show="showType === 2">
        <!-- 输入框 -->
        <div class="inputBox">
          <textarea name="" id="" cols="30" rows="10"></textarea>
          <!-- <input type="text" /> -->
          <div>评论</div>
        </div>
        <!-- 精彩评论 -->
        <div class="brilliantBox">
          <div class="boxTitle">精彩评论</div>
          <div class="brillantList">
            <ul>
              <li v-for="(item, index) in songComment" :key="index">
                <div class="userImg">
                  <img :src="item.user.avatarUrl" alt="" />
                </div>
                <div class="contentTime">
                  <div class="nameContent">
                    <div class="userName">{{ item.user.nickname }}</div>
                    <div class="userContent">{{ item.content }}</div>
                  </div>
                  <p class="publishTime">2021-{{ item.timeStr }} 15:02:59</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 收藏者 -->
      <div class="collectorContent" v-show="showType === 3">
        <ul>
          <li v-for="(item, index) in songCollector" :key="index">
            <div class="collectorImg">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="collectorName">{{ item.nickname }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// eventBus
import bus from "@/components/content/eventBus.js";
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "SongListPage",
  data() {
    return {
      // 传过来的歌单ID
      songDataId: "",
      // 歌单页面数据
      songdetail: [],
      // 歌单评论数据
      songComment: [],
      // 歌单收藏用户
      songCollector: [],
      // 展示点击tab对应的内容
      showType: 1,
      // 点击时添加的css样式
      index: "",
      showList: 0,
      showComment: 0,
      showCollector: 0,
    };
  },
  created() {
    // 绕过登陆获取数据
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    // 销毁bus
    bus.$off("songListData");
    this.songListDetail();
    this.commentDetail();
    this.collectorDetail();
  },
  mounted() {
    // 接收父页面点击传送过来的数据id
    bus.$on("songListData", (val) => {
      this.songDataId = val.id;
      console.log(this.songDataId);
      // 将数据存储到localStorage里
      window.localStorage.setItem(
        "songListData",
        JSON.stringify(this.songDataId)
      );
    });
  },
  methods: {
    // 请求对应的歌单数据
    async songListDetail() {
      // 将存储的数据赋值到musicId里
      const songId = window.localStorage;
      // console.log(songId.musicData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
        "/playlist/detail?id=" + songId.songListData,
        {
          params: {
            playlist: this.songdetail,
          },
        }
      );
      this.songdetail = res.playlist;
      // console.log(this.songdetail);
    },
    // 请求对应的歌单评论数据
    async commentDetail() {
      // 将存储的数据赋值到commentId1里
      const commentId1 = window.localStorage;
      // console.log(commentId1.songListData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
        "/comment/playlist?id=" + commentId1.songListData,
        {
          params: {
            comments: this.songComment,
          },
        }
      );
      this.songComment = res.comments;
      // console.log(this.songComment[0].user.avatarUrl);
    },
    // 请求对应的歌单收藏人数据
    async collectorDetail() {
      // 将存储的数据赋值到collectorId1里
      const collectorId1 = window.localStorage;
      // console.log(collectorId1 .songListData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
        "/playlist/subscribers?id=" + collectorId1.songListData + "&limit=30",
        {
          params: {
            collector: this.songCollector,
          },
        }
      );
      this.songCollector = res.subscribers;
      console.log(this.songCollector.avatarUrl);
    },
    // 点击tab切换对应的内容，并改变css样式
    getSongList(type, index) {
      this.showList = index;
      (this.showComment = 0), (this.showCollector = 0);
      this.showType = type;
      if (this.showType === 1) {
        this.style.display = true;
      }
    },
    getComment(type, index) {
      this.showComment = index;
      (this.showList = 0), (this.showCollector = 0);
      this.showType = type;
      if (this.showType === 2) {
        this.style.display = true;
      }
    },
    getCollector(type, index) {
      this.showCollector = index;
      (this.showComment = 0), (this.showList = 0);
      this.showType = type;
      if (this.showType === 3) {
        this.style.display = true;
      }
    },
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
.songListBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  // 头部区域
  .detailTopBox {
    width: 100%;
    height: 260px;
    margin-left: 50px;
    padding-top: 25px;
    box-sizing: border-box;
    // background-color: red;
    // 歌单图片
    .musicImg {
      float: left;
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    // 歌单信息
    .detailMessageBox {
      width: 800px;
      height: 100%;
      float: left;
      margin-left: 40px;
      box-sizing: border-box;
      // background-color: skyblue;
      // 歌单名字盒子
      .listNameBox {
        width: 800px;
        height: 35px;
        // background-color: purple;
        .icon {
          border: 2px solid #f2cac9;
          border-radius: 5px;
          width: 50px;
          height: 30px;
          color: #f2cac9;
          line-height: 30px;
          text-align: center;
          font-weight: 900;
          float: left;
        }
        .listName {
          float: left;
          // width: 350px;
          height: 35px;
          line-height: 35px;
          margin-left: 10px;
          font-size: 20px;
          color: #f2cac9;
        }
      }
      // 创建者信息
      .userBox {
        width: 400px;
        height: 35px;
        margin-top: 5px;
        .creator {
          float: left;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .userName {
          float: left;
          margin-left: 10px;
          // width: 100px;
          color: #f2cac9;
          height: 35px;
          line-height: 35px;
          font-size: 15px;
        }
        .setUpTime {
          float: left;
          margin-left: 10px;
          // width: 100px;
          color: #f2cac9;
          height: 35px;
          line-height: 35px;
          font-size: 15px;
        }
      }
      // 三个按钮
      .listButton {
        margin-top: 10px;
        height: 60px;
        color: #5d3131;
        font-weight: 900;
        .playerAllBtn {
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #c04851;
          float: left;
          border-radius: 10px;
          margin-left: 50px;
          padding-right: 15px;
          box-sizing: border-box;
        }
        .collectBtn {
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #fed71a;
          float: left;
          border-radius: 10px;
          margin-left: 50px;
          box-sizing: border-box;
          i {
            padding-left: 10px;
          }
        }
        .shareBtn {
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #1ba784;
          float: left;
          border-radius: 10px;
          margin-left: 50px;
          padding-right: 15px;
          box-sizing: border-box;
        }
        .iconfont {
          font-size: 20px;
          font-weight: 900;
          float: left;
          padding-left: 20px;
          // box-sizing: border-box;
        }
      }
      // 标签
      .tag {
        // margin-top: 5px;
        font-weight: 900;
        height: 25px;
        color: #f2cac9;
        a {
          color: #964d22;
          font-weight: 900;
        }
      }
      // 简介
      .intro {
        width: 800px;
        height: 65px;
        // overflow: hidden;
        // margin-top: 5px;
        // height: 35px;
        .intro1 {
          font-weight: 900;
          color: #f2cac9;
          float: left;
        }
        .intro2 {
          width: 750px;
          color: #964d22;
          font-weight: 900;
          float: left;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
    }
    // 数量
    .numBox {
      float: left;
      width: 150px;
      height: 70px;
      // background-color: skyblue;
      .singNum {
        width: 50%;
        height: 70px;
        float: left;
        text-align: center;
        font-weight: 900;
        padding-top: 15px;
        color: #f2cac9;
        border-right: 3px solid #f2cac9;
        box-sizing: border-box;
        p {
          color: #964d22;
        }
      }
      .playerNum {
        width: 50%;
        height: 70px;
        float: left;
        text-align: center;
        font-weight: 900;
        padding-top: 15px;
        color: #f2cac9;
        p {
          color: #964d22;
        }
      }
    }
  }
  // 主体区域
  .detailContentBox {
    width: 1200px;
    height: 50px;
    margin-top: 20px;
    margin-left: 50px;
    // 头部选择
    .topTab {
      width: 100%;
      height: 50px;
      .songsList {
        width: 200px;
        height: 50px;
        line-height: 50px;
        color: #f2cac9;
        text-align: center;
        float: left;
      }
      .comment {
        width: 200px;
        height: 50px;
        line-height: 50px;
        color: #f2cac9;
        text-align: center;
        float: left;
      }
      .collector {
        width: 200px;
        height: 50px;
        line-height: 50px;
        color: #f2cac9;
        text-align: center;
        float: left;
      }
      .songsList:hover,
      .comment:hover,
      .collector:hover {
        border-bottom: 5px solid #964d22;
        box-sizing: border-box;
        color: #964d22;
      }
      .tabActive {
        color: #964d22;
        border-bottom: 5px solid #964d22;
        box-sizing: border-box;
      }
    }

    // 内容区域
    // 歌曲列表
    .listContent {
      height: 1000px;
      .listTop {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-top: 10px;
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
      .songLists {
        width: 100%;
        li {
          width: 100%;
          height: 60px;
          line-height: 60px;
          color: #f2cac9;
          text-align: center;
          display: flex;
          .songNum {
            flex: 1;
          }
          .iconfont {
            font-size: 20px;
            flex: 1;
            position: relative;
          }
          .songName {
            flex: 5;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .songSinger {
            flex: 5;
          }
          .songAlbum {
            flex: 5;
          }
          .songTime {
            flex: 4;
          }
        }
        li:nth-child(even) {
          background-color: #964d22;
        }
      }
    }
    // 评论区
    .commentContent {
      width: 100%;
      margin-top: 10px;
      // background-color: skyblue;
      .inputBox {
        width: 100%;
        height: 150px;
        background-color: #964d22;
        textarea {
          margin-top: 20px;
          margin-left: 55px;
          width: 90%;
          height: 100px;
          box-sizing: border-box;
          background-color: #f2cac9;
        }
        div {
          color: #964d22;
          font-weight: 900;
          float: right;
          width: 50px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background-color: #f2cac9;
          border: 1px solid #f2cac9;
          border-radius: 10px;
          margin-top: 110px;
          margin-right: 5px;
          box-sizing: border-box;
        }
      }
      .brilliantBox {
        width: 100%;
        height: 300px;
        margin-top: 10px;
        .boxTitle {
          width: 100px;
          height: 30px;
          line-height: 30px;
          font-weight: 900;
          color: #f2cac9;
        }
        .brillantList {
          width: 100%;
          margin-top: 20px;
          li {
            width: 100%;
            height: 60px;
            .userImg {
              width: 60px;
              height: 60px;
              text-align: center;
              float: left;
              img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                padding: 5px;
              }
            }
            // 昵称+评论内容+时间
            .contentTime {
              width: 1000px;
              height: 60px;
              width: 60px;
              float: left;
              // 昵称+评论内容
              .nameContent {
                width: 1000px;
                height: 30px;
                // 昵称
                .userName {
                  height: 30px;
                  line-height: 30px;
                  text-align: left;
                  font-weight: 900;
                  padding-left: 5px;
                  box-sizing: border-box;
                  float: left;
                  color: #f2cac9;
                }
                // 评论内容
                .userContent {
                  // width: 90%;
                  height: 30px;
                  line-height: 30px;
                  font-weight: 900;
                  padding-left: 10px;
                  box-sizing: border-box;
                  float: left;
                  color: #f97d1c;
                }
              }
              .publishTime {
                width: 1000px;
                height: 30px;
                line-height: 30px;
                font-weight: 900;
                padding-left: 5px;
                box-sizing: border-box;
                color: #f97d1c;
              }
            }
          }
          li:nth-child(even) {
            background-color: #964d22;
          }
        }
      }
    }
    // 收藏者
    .collectorContent {
      margin-top: 20px;
      width: 100%;
      height: 1000px;
      // background-color: purple;
      li {
        width: 100px;
        height: 90px;
        float: left;
        margin-left: 20px;
        // 头像
        .collectorImg {
          width: 100%;
          height: 60px;
          text-align: center;
          padding-top: 5px;
          box-sizing: border-box;
          // background-color: red;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        // 昵称
        .collectorName {
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #f2cac9;
          // background-color: blue;
        }
      }
    }
  }
}
</style>