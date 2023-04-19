<template>
  <div class="detailBox">
    <!-- 歌单头部区域 -->
    <div class="detailTopBox">
      <!-- 歌单图片 -->
      <div class="musicImg">
        <img :src="listdetail.coverImgUrl" alt="" />
      </div>
      <!-- 歌单信息区域 -->
      <div class="detailMessageBox">
        <!-- 歌单图标、歌单名字 -->
        <div class="listNameBox">
          <div class="icon">歌单</div>
          <div class="listName">{{ listdetail.name }}</div>
        </div>
        <!-- 创建者头像、昵称、时间 -->
        <div class="userBox">
          <div class="creator">
            <img :src="listdetail.creator.avatarUrl" alt="" />
          </div>
          <div class="userName">{{ listdetail.creator.nickname }}</div>
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
            <div>收藏({{ listdetail.subscribedCount }})</div>
          </div>
          <div class="shareBtn">
            <i class="iconfont icon-fenxiang"></i>
            <div>分享({{ listdetail.shareCount }})</div>
          </div>
        </div>
        <!-- 标签 -->
        <div class="tag">
          标签：<a
            href="#"
            v-for="(item, index) in listdetail.tags"
            :key="index"
            >{{ item }}/</a
          >
        </div>
        <!-- 简介 -->
        <div class="intro">
          <p class="intro1">简介：</p>
          <p class="intro2">{{ listdetail.description }}</p>
        </div>
      </div>
      <!-- 歌曲数、播放数 -->
      <div class="numBox">
        <div class="singNum">
          歌曲数
          <p>{{ listdetail.trackCount }}</p>
        </div>
        <div class="playerNum">
          播放数
          <p>{{ listdetail.playCount }}</p>
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
              class="ttLi"
              :class="{ tabActive: showList === 1 }"
              @click="getShow(1)"
            >
              歌曲列表
            </div>
          </li>
          <li>
            <div
              class="ttLi"
              :class="{ tabActive: showList === 2 }"
              @click="getShow(2)"
            >
              评论({{ this.listComment.length }})
            </div>
          </li>
          <li>
            <div
              class="ttLi"
              :class="{ tabActive: showList === 3 }"
              @click="getShow(3)"
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
            <li
              v-for="(item, index) in allLists"
              :key="index"
              @dblclick="playMusic(item)"
            >
              <div class="songNum">{{ index + 1 }}</div>
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
      <!-- 音乐播放 -->
      <!-- <audio :src="musicUrlList" autoplay></audio> -->
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
              <li
                class="briLi"
                v-for="(item, index) in listComment"
                :key="index"
              >
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
          <li class="colLi" v-for="(item, index) in listCollector" :key="index">
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
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "PlayListDetail",
  data() {
    return {
      // 传过来的歌单ID
      musicDataId: "",
      // 歌单页面数据
      listdetail: [],
      // 完整的歌单歌曲数据
      allLists: [],
      // 歌单评论数据
      listComment: [],
      // 歌单收藏用户
      listCollector: [],
      // 展示点击tab对应的内容
      showType: 1,
      // 点击时添加的css样式
      showList: 1,
      // 歌曲url
      musicUrlList: "",
    };
  },
  created() {
    this.musicDataId = this.$route.query.musicData.id;
    // console.log("接收id", this.musicDataId);
    this.playListDetail();
    this.allListDetail();
    this.commentDetail();
    this.collectorDetail();
  },
  methods: {
    // 请求对应的歌单数据
    async playListDetail() {
      // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应歌单详情页的数据
      const { data: res } = await request.get(
        "/playlist/detail?id=" + this.musicDataId
      );
      this.listdetail = res.playlist;
      // console.log(this.listdetail);
    },
    // 请求完整歌单歌曲数据
    async allListDetail() {
      const { data: res } = await request.get(
        "/playlist/track/all?id=" + this.musicDataId
      );
      // console.log(res);
      this.allLists = res.songs;
    },
    // 请求对应的歌单评论数据
    async commentDetail() {
      const { data: res } = await request.get(
        "/comment/playlist?id=" + this.musicDataId
      );
      this.listComment = res.comments;
    },
    // 请求对应的歌单收藏人数据
    async collectorDetail() {
      const { data: res } = await request.get(
        "/playlist/subscribers?id=" + this.musicDataId + "&limit=100"
      );
      this.listCollector = res.subscribers;
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
        user: i.ar[0].name,
        album: i.al.picUrl,
        songsUrl: this.musicUrlList,
      });
      // console.log(document.getElementsByTagName("a")[0].__vue__.$store);
    },
    // 点击tab切换对应的内容，并改变css样式
    getShow(i) {
      this.showList = i;
      this.showType = i;
    },
    // 点击喜爱按钮
    // getLike(likeKey, index) {
    //   console.log("点击了" + index);
    //   if (likeKey === false) {
    //     this.likeKey = true;
    //     console.log(this.likeKey);
    //   } else {
    //     this.likeKey = false;
    //     console.log(this.likeKey);
    //   }
    //   this.$forceUpdate();
    // },
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
.detailBox {
  width: 100%;
  margin-top: 75px;
  margin-bottom: 150px;
  // 头部区域
  .detailTopBox {
    width: 100%;
    height: 260px;
    padding-top: 25px;
    box-sizing: border-box;
    // background-color: red;
    // 歌单图片
    .musicImg {
      float: left;
      width: 200px;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
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
        color: #f2cac9;
        font-weight: 900;
        .playerAllBtn,
        .collectBtn,
        .shareBtn {
          width: 150px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #964d22;
          float: left;
          border-radius: 10px;
          padding-right: 15px;
          margin-top: 5px;
        }
        .collectBtn {
          // background-color: #fed71a;
          margin-left: 50px;
          padding-right: 0;
          i {
            padding-left: 10px;
          }
        }
        .shareBtn {
          // background-color: #1ba784;
          margin-left: 50px;
          padding-right: 0;
          i {
            padding-left: 10px;
          }
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
          color: #f2cac9;
          font-weight: 900;
        }
      }
      // 简介
      .intro {
        width: 800px;
        height: 65px;

        .intro1 {
          font-weight: 900;
          color: #f2cac9;
          float: left;
        }
        .intro2 {
          width: 750px;
          color: #f2cac9;
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
          color: #f2cac9;
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
          color: #f2cac9;
        }
      }
    }
  }
  // 主体区域
  .detailContentBox {
    width: 100%;
    margin-top: 20px;
    // 头部选择
    .topTab {
      width: 100%;
      height: 50px;
      .ttLi {
        width: 200px;
        height: 50px;
        line-height: 50px;
        color: #f2cac9;
        text-align: center;
        float: left;
        cursor: pointer;
      }
      .ttLi:hover {
        border-bottom: 5px solid #f2cac9;
        box-sizing: border-box;
        color: #f2cac9;
      }
      .tabActive {
        font-weight: bold;
        color: #f2cac9;
        border-bottom: 5px solid #f2cac9;
        box-sizing: border-box;
      }
    }
    // 内容区域
    // 歌曲列表
    .listContent {
      min-height: 1000px;
      .listTop {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        margin-top: 10px;
        display: flex;
        background-color: #964d22;
        border-radius: 10px;
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
        margin-top: 10px;
        li {
          width: 100%;
          height: 60px;
          line-height: 60px;
          color: #f2cac9;
          text-align: center;
          display: flex;
          border-radius: 10px;
          transition: 0.5s;
          cursor: pointer;
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
        // li:nth-child(even) {
        //   background-color: #964d22;
        // }
        li:hover {
          box-shadow: 1px 1px 10px 1px #f2cac9;
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
        border-radius: 10px;
        // background-color: #964d22;
        textarea {
          margin-top: 15px;
          margin-left: 20px;
          width: 92%;
          height: 120px;
          border-radius: 10px;
          box-sizing: border-box;
          padding-left: 20px;
          padding-top: 5px;
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
          margin-right: 20px;
          box-sizing: border-box;
          cursor: pointer;
        }
      }
      .brilliantBox {
        width: 100%;
        min-height: 300px;
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
          min-height: 1500px;
          margin-top: 20px;
          ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            .briLi {
              width: 100%;
              height: 60px;
              margin-bottom: 20px;
              transition: 0.5s;
              cursor: pointer;
              border-radius: 10px;
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
                width: calc(100% - 70px);
                height: 60px;
                float: left;
                margin-left: 10px;
                // 昵称+评论内容
                .nameContent {
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  font-weight: 900;
                  // 昵称
                  .userName {
                    height: 30px;
                    text-align: left;
                    padding-left: 5px;
                    float: left;
                    color: #f97d1c;

                    // white-space: nowrap;
                    // text-overflow: ellipsis;
                    // overflow: hidden;
                  }
                  // 评论内容
                  .userContent {
                    max-width: 85%;
                    height: 30px;
                    padding-left: 10px;
                    float: left;
                    color: #f2cac9;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                  }
                }
                .publishTime {
                  width: 100%;
                  height: 30px;
                  line-height: 30px;
                  font-weight: 900;
                  padding-left: 5px;
                  box-sizing: border-box;
                  color: #f2cac9;
                }
              }
            }
          }
          // li:nth-child(even) {
          //   background-color: #964d22;
          // }
          .briLi:hover {
            box-shadow: 1px 1px 10px 1px #f2cac9;
          }
        }
      }
    }
    // 收藏者
    .collectorContent {
      margin-top: 20px;
      width: 100%;
      min-height: 500px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .colLi {
          width: 100px;
          height: 90px;
          margin-bottom: 5px;
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
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            // background-color: blue;
          }
        }
      }
    }
  }
}
</style>
