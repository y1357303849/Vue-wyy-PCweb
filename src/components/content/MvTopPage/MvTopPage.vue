<template>
  <div class="newMvBox">
    <!-- 左边主区域 -->
    <div class="leftContent">
      <!-- mv标题 -->
      <div class="videoTitle">
        <div class="mvIcon">MV</div>
        <div class="mvText">
          {{ topDetail.name }}
        </div>
      </div>
      <!-- mv区域 -->
      <div class="videoBox">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></video-player>
      </div>
      <!-- 评论区 -->
      <div class="commentBox">
        <div class="commentTop">评论</div>
        <div class="commentBc">
          <textarea cols="30" rows="10"></textarea>
          <div class="commentBtn">评论</div>
        </div>
        <div class="commentTop2">精彩评论</div>
        <div class="commentUser">
          <ul>
            <li>
              <div class="userImg">
                <img src="@/assets/img/歪头白狗.gif" alt="" />
              </div>
              <div class="contentTime">
                <div class="nameContent">
                  <div class="userName">ccc:</div>
                  <div class="userContent">好听</div>
                </div>
                <p class="publishTime">2021年10月01日 15:02:59</p>
              </div>
            </li>
            <li>
              <div class="userImg">
                <img src="@/assets/img/歪头白狗.gif" alt="" />
              </div>
              <div class="contentTime">
                <div class="nameContent">
                  <div class="userName">ccc:</div>
                  <div class="userContent">好听</div>
                </div>
                <p class="publishTime">2021年10月01日 15:02:59</p>
              </div>
            </li>
            <li>
              <div class="userImg">
                <img src="@/assets/img/歪头白狗.gif" alt="" />
              </div>
              <div class="contentTime">
                <div class="nameContent">
                  <div class="userName">ccc:</div>
                  <div class="userContent">好听</div>
                </div>
                <p class="publishTime">2021年10月01日 15:02:59</p>
              </div>
            </li>
            <li>
              <div class="userImg">
                <img src="@/assets/img/歪头白狗.gif" alt="" />
              </div>
              <div class="contentTime">
                <div class="nameContent">
                  <div class="userName">ccc:</div>
                  <div class="userContent">好听</div>
                </div>
                <p class="publishTime">2021年10月01日 15:02:59</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 右边区域 -->
    <div class="rightContent">
      <!-- MV介绍 -->
      <div class="mvIntroBox">
        <div class="introTop">MV介绍</div>
        <div class="timeAndPlay">
          <div class="releaseTime">发布时间：{{ topDetail.publishTime }}</div>
          <div class="watchNum">播放次数：{{ topDetail.playCount }}次</div>
        </div>
        <div class="introText">简介：{{ topDetail.desc }}</div>
      </div>
      <!-- 相关推荐 -->
      <div class="moreMvBox">
        <div class="moreMvTop">相关推荐</div>
        <div class="moreMvList">
          <ul>
            <li>
              <div class="mvImg">
                <img src="@/assets/img/女战士.jpg" alt="" />
              </div>
              <div class="mvContent">
                <div class="mvNameTop">
                  <div class="mvIcon">MV</div>
                  <div class="mvName">No Luv</div>
                </div>
                <div class="mvSinger">ODD陈陈陈</div>
              </div>
            </li>
            <li>
              <div class="mvImg">
                <img src="@/assets/img/女战士.jpg" alt="" />
              </div>
              <div class="mvContent">
                <div class="mvNameTop">
                  <div class="mvIcon">MV</div>
                  <div class="mvName">No Luv</div>
                </div>
                <div class="mvSinger">ODD陈陈陈</div>
              </div>
            </li>
          </ul>
        </div>
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
  name: "newMvPage",
  data() {
    return {
      // 传过来的MV ID
      topDataId: "",
      // MV排行榜页面数据
      topDetail: [],
      // MV视频
      mvVideo: [],
      // 播放器配置
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "", // url地址，先为空，再动态赋值
          },
        ],
        poster: "", // 你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, // 全屏按钮
        },
      },
    };
  },
  created() {
    // 绕过登陆获取数据
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
    // 销毁bus
    bus.$off("mvTopData");
    this.getMvDetail();
    this.getMvVideo();
  },
  mounted() {
    // 接收父页面点击传送过来的数据id
    bus.$on("mvTopData", (val) => {
      this.topDataId = val.id;
      console.log(this.topDataId);
      // 将数据存储到localStorage里
      window.localStorage.setItem("mvTopData", JSON.stringify(this.topDataId));
    });
  },
  methods: {
    // 请求对应的MV数据
    async getMvDetail() {
      // 将存储的数据赋值到onlyMvId里
      const onlyMvId = window.localStorage;
      // console.log(onlyMvId.mvTopData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家MV详情页的数据
        "/mv/detail?mvid=" + onlyMvId.mvTopData,
        {
          params: {
            res: this.topDetail,
          },
        }
      );
      this.topDetail = res.data;
      // console.log(this.topDetail);
    },
    // 请求对应的Mv视频
    async getMvVideo() {
      // 将存储的数据赋值到onlyMvId里
      const mvVideoId = window.localStorage;
      // console.log(mvVideoId.mvTopData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前点击的组件对应的id，以此来获取对应独家Mv视频
        "/mv/url?id=" + mvVideoId.mvTopData,
        {
          params: {
            res: this.mvVideo,
          },
        }
      );
      this.mvVideo = res.data.url;
      // console.log(this.mvVideo);
      // 动态给vue-video-player里的src参数赋值
      this.playerOptions["sources"][0]["src"] = this.mvVideo;
    },
  },
};
</script>

<style lang="less" scoped>
.newMvBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 250px;
  // 左边主体区域
  .leftContent {
    width: 70%;
    // background-color: red;
    box-sizing: border-box;
    float: left;
    // mv标题
    .videoTitle {
      width: 100%;
      height: 50px;
      // background-color: springgreen;
      .mvIcon {
        width: 50px;
        height: 30px;
        font-weight: 900;
        text-align: center;
        color: #f2cac9;
        border: 2px solid #f2cac9;
        margin-top: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        float: left;
      }
      .mvText {
        width: 700px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 900;
        color: #f2cac9;
        float: left;
        // background-color: blue;
      }
    }
    // mv盒子
    .videoBox {
      margin-top: 10px;
      width: 95%;
      height: 450px;
      // .video-player {
      //   width: 100%;
      //   height: 100%;
      // }
    }
    // 评论区
    .commentBox {
      width: 95%;
      height: 1000px;
      margin-top: 30px;
      .commentTop {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 900;
        color: #f2cac9;
        font-size: 20px;
      }
      // 输入框
      .commentBc {
        margin-top: 10px;
        width: 100%;
        height: 200px;
        background-color: #964d22;
        textarea {
          background-color: #f2cac9;
          margin-top: 10px;
          margin-left: 30px;
          box-sizing: border-box;
          width: 90%;
          height: 80%;
        }
        .commentBtn {
          width: 40px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #964d22;
          font-weight: 900;
          float: right;
          margin-top: 170px;
          background-color: #f2cac9;
          border: 1px solid #f2cac9;
          box-sizing: border-box;
          border-radius: 5px;
        }
      }
      .commentTop2 {
        margin-top: 10px;
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 900;
        color: #f2cac9;
        font-size: 20px;
      }
      .commentUser {
        width: 100%;
        margin-top: 10px;
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
  // 右边区域
  .rightContent {
    width: 30%;
    height: 1000px;
    float: left;
    // background-color: skyblue;
    // MV介绍
    .mvIntroBox {
      width: 100%;
      // height: 400px;
      .introTop {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 900;
        font-size: 20px;
        color: #f2cac9;
      }
      // 时间与播放次数
      .timeAndPlay {
        width: 100%;
        height: 40px;
        color: #f2cac9;
        .releaseTime {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 15px;
        }
        .watchNum {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 15px;
        }
      }
      // 简介内容
      .introText {
        font-weight: 900;
        color: #f2cac9;
      }
    }
    // 相关推荐
    .moreMvBox {
      margin-top: 30px;
      width: 100%;
      .moreMvTop {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 900;
        color: #f2cac9;
      }
      // 相关推荐MV列表
      .moreMvList {
        margin-top: 10px;
        width: 100%;
        height: 100px;
        li {
          width: 100%;
          height: 100px;
          margin-top: 10px;
          // 图片
          .mvImg {
            width: 55%;
            height: 100px;
            float: left;
            img {
              width: 100%;
              height: 100px;
            }
          }
          // 内容
          .mvContent {
            width: 40%;
            height: 100px;
            float: left;
            margin-left: 10px;
            // mv名字
            .mvNameTop {
              width: 100%;
              height: 80%;
              .mvIcon {
                width: 30px;
                height: 20px;
                line-height: 20px;
                font-size: 15px;
                font-weight: 900;
                text-align: center;
                color: #f2cac9;
                border: 1px solid #f2cac9;
                border-radius: 5px;
                float: left;
              }
              .mvName {
                padding-top: 3px;
                margin-left: 5px;
                box-sizing: border-box;
                color: #f2cac9;
                float: left;
              }
            }
            // 歌手
            .mvSinger {
              width: 100%;
              color: #f2cac9;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>