<template>
  <div class="onlypBox">
    <!-- 左边主区域 -->
    <div class="leftContent">
      <!-- mv标题 -->
      <div class="videoTitle">
        <div class="mvIcon">MV</div>
        <div class="mvText">
          {{ onlyMvDetail.name }}
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
            <li class="comLi" v-for="(item, index) in mvComment" :key="index">
              <div class="userImg">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="contentTime">
                <div class="nameContent">
                  <div class="userName">{{ item.user.nickname }}</div>
                  <div class="userContent">{{ item.user.content }}</div>
                </div>
                <p class="publishTime">2021年10月01日 {{ item.timeStr }}</p>
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
          <div class="releaseTime">
            发布时间：{{ onlyMvDetail.publishTime }}
          </div>
          <div class="watchNum">播放次数：{{ onlyMvDetail.playCount }}次</div>
        </div>
        <div class="introText">简介：{{ onlyMvDetail.desc }}</div>
      </div>
      <!-- 相关推荐 -->
      <div class="moreMvBox">
        <div class="moreMvTop">相关推荐</div>
        <div class="moreMvList">
          <ul>
            <li class="moreLi" v-for="(item, index) in mvMore" :key="index">
              <div class="mvImg">
                <img :src="item.cover" alt="" />
              </div>
              <div class="mvContent">
                <div class="mvNameTop">
                  <!-- <div class="mvIcon">MV</div> -->
                  <div class="mvName">
                    <div class="mvIcon">MV</div>
                    {{ item.name }}
                  </div>
                </div>
                <div class="mvSinger">{{ item.artistName }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入request模块
import request from "@/untils/request.js";

export default {
  name: "OnlyPage",
  data() {
    return {
      // 传过来的MV ID
      onlyDataId: "",
      // 独家MV页面数据
      onlyMvDetail: [],
      // mv评论
      mvComment: [],
      // mv相关推荐
      mvMore: [],
      // MV视频
      mvVideo: "",
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
    // 接收传来的id
    this.onlyDataId = this.$route.query.onlyData.id;
    this.getMvDetail();
    this.getMvVideo();
    this.getMvComment();
    this.getMvMore();
  },
  methods: {
    // 请求对应的MV数据
    async getMvDetail() {
      const { data: res } = await request.get(
        "/mv/detail?mvid=" + this.onlyDataId
      );
      this.onlyMvDetail = res.data;
    },
    // 请求对应的Mv视频
    async getMvVideo() {
      const { data: res } = await request.get("/mv/url?id=" + this.onlyDataId);
      this.mvVideo = res.data.url;
      this.playerOptions["sources"][0]["src"] = this.mvVideo;
    },
    // 请求对应的MV数评论
    async getMvComment() {
      const { data: res } = await request.get(
        "/comment/mv?id=" + this.onlyDataId
      );
      this.mvComment = res.comments;
    },
    // 请求对应的MV相关推荐
    async getMvMore() {
      const { data: res } = await request.get(
        "/simi/mv?mvid=" + this.onlyDataId
      );
      this.mvMore = res.mvs;
    },
  },
};
</script>

<style lang="less">
.onlypBox {
  width: 100%;
  margin-top: 75px;
  overflow: hidden;
  // 左边主体区域
  .leftContent {
    width: 69%;
    min-height: 1000px;
    float: left;
    margin-left: 1%;
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
        margin-left: 10px;
      }
    }
    // mv盒子
    .videoBox {
      margin-top: 10px;
      width: 95%;
      height: 450px;
      border-radius: 10px;
      overflow: hidden;
      // .video-player {
      //   width: 100%;
      //   height: 100%;
      // }
    }
    // 评论区
    .commentBox {
      width: 95%;
      margin-top: 30px;
      .commentTop,
      .commentTop2 {
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
        // background-color: #964d22;
        textarea {
          margin-top: 15px;
          margin-left: 20px;
          width: 90%;
          height: 170px;
          border-radius: 10px;
          box-sizing: border-box;
          padding-left: 20px;
          padding-top: 5px;
          background-color: #f2cac9;
        }
        .commentBtn {
          width: 50px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #964d22;
          font-weight: 900;
          float: right;
          margin-top: 170px;
          margin-right: 10px;
          background-color: #f2cac9;
          border: 1px solid #f2cac9;
          box-sizing: border-box;
          border-radius: 5px;
        }
      }
      .commentTop2 {
        margin-top: 20px;
      }
      .commentUser {
        width: 100%;
        margin-top: 10px;
        ul {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          .comLi {
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
              width: calc(100% - 65px);
              height: 60px;
              float: left;
              margin-left: 5px;
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
        // .comLi:nth-child(even) {
        //   background-color: #964d22;
        // }
        .comLi:hover {
          box-shadow: 1px 1px 10px 1px #f2cac9;
        }
      }
    }
  }
  // 右边区域
  .rightContent {
    width: 29%;
    min-height: 1000px;
    float: left;
    margin-right: 1%;
    // MV介绍
    .mvIntroBox {
      width: 100%;
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
        .moreLi {
          width: 100%;
          height: 100px;
          margin-top: 10px;
          border-radius: 10px;
          cursor: pointer;
          // 图片
          .mvImg {
            width: 45%;
            height: 100px;
            float: left;
            border-radius: 10px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100px;
              transition: 0.5s;
            }
          }
          // 内容
          .mvContent {
            width: 50%;
            height: 100px;
            float: left;
            margin-left: 10px;
            // mv名字
            .mvNameTop {
              width: 100%;
              height: 80%;
              .mvName {
                color: #f2cac9;
                float: left;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                .mvIcon {
                  width: 30px;
                  height: 15px;
                  line-height: 15px;
                  font-size: 10px;
                  font-weight: 900;
                  text-align: center;
                  color: #f2cac9;
                  border: 1px solid #f2cac9;
                  border-radius: 5px;
                  float: left;
                  margin-right: 5px;
                  margin-top: 3px;
                }
              }
            }
            // 歌手
            .mvSinger {
              width: 100%;
              color: #f2cac9;
              font-size: 15px;
              font-weight: 900;
            }
          }
        }
        .moreLi:hover {
          box-shadow: 1px 1px 10px 1px #f2cac9;
          .mvImg img {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
