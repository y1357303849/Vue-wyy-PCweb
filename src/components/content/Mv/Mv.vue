<template>
  <div class="mvBox">
    <!-- 最新MV导航 -->
    <div class="newMvTab">
      <div class="nmT">最新MV</div>
      <ul>
        <li>内地</li>
        <li>港台</li>
        <li>欧美</li>
        <li>日本</li>
        <li>韩国</li>
      </ul>
    </div>
    <!-- 最新MV -->
    <div class="newMV">
      <ul>
        <li
          v-for="(item, index) in newMvList"
          :key="index"
          @click="goMvPage(item)"
        >
          <div class="nml1">
            <img class="mvPic" :src="item.cover" alt="" />
          </div>
          <p class="mvName">{{ item.name }}</p>
          <p class="mvSinger">{{ item.artistName }}</p>
        </li>
      </ul>
    </div>
    <!-- 推荐MV -->
    <div class="recommendMv">
      <div class="recommendTitle">推荐MV</div>
      <div class="recommendContent">
        <ul>
          <li
            class="recLi"
            v-for="(item, index) in recommendMvList"
            :key="index"
            @click="goMvPage(item)"
          >
            <div class="rec1">
              <img :src="item.picUrl" alt="" />
            </div>
            <p>
              {{ item.name + "--" + item.artistName }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- MV排行榜导航 -->
    <div class="mvTopTab">
      <div class="nmT">MV排行榜</div>
      <ul>
        <li>内地</li>
        <li>港台</li>
        <li>欧美</li>
        <li>日本</li>
        <li>韩国</li>
      </ul>
    </div>
    <!-- MV排行榜 -->
    <div class="mvTop">
      <div class="mvTopList">
        <ul>
          <li
            class="mtlLi"
            v-for="(item, index) in mvTopList"
            :key="index"
            @click="goMvPage(item)"
          >
            <div class="mvTopBox">
              <span class="mvTopNum">{{ index + 1 }}</span>
              <div class="mvTopPic">
                <img :src="item.cover" alt="" />
              </div>
              <div class="mvTopText">
                <p class="mvTopMusic">{{ item.name }}</p>
                <p class="mvTopSinger">{{ item.artistName }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewMvAPI, getRecommendMvAPI, getMvTopAPI } from "@/network/Mv.js";

export default {
  name: "Mv",
  data() {
    return {
      // 最新MV
      newMvList: [],
      // 推荐MV
      recommendMvList: [],
      // MV排行榜
      mvTopList: [],
    };
  },
  created() {
    this.NewMvList();
    this.RecommendMvList();
    this.MvTopList();
  },
  methods: {
    // 最新MV
    async NewMvList() {
      const { data: res } = await getNewMvAPI(this.newMvList);
      // console.log(res.data);
      this.newMvList = res.data.slice(0, 12);
    },
    // 推荐MV
    async RecommendMvList() {
      const { data: res } = await getRecommendMvAPI(this.recommendMvList);
      // console.log(res.result);
      this.recommendMvList = res.result;
    },
    // MV排行榜
    async MvTopList() {
      const { data: res } = await getMvTopAPI(this.mvTopList);
      // console.log(res.data);
      this.mvTopList = res.data.slice(0, 10);
    },
    // 跳转最新MV详情页
    goMvPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/MvPage",
          query: { onlyData: i },
        });
      }, 500);
    },
  },
};
</script>

<style lang="less">
.mvBox {
  width: 100%;
  margin-top: 75px;
  // 最新MV导航
  .newMvTab {
    width: 100%;
    height: 30px;
    border-bottom: 3px solid #f2cac9;
    .nmT {
      width: 100px;
      height: 30px;
      font-weight: 900;
      line-height: 30px;
      font-size: 25px;
      color: #f2cac9;
      float: left;
    }
    ul {
      width: calc(100% - 110px);
      height: 30px;
      margin-left: 10px;
      li {
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    li:hover {
      color: #964d22;
    }
  }
  // 最新MV
  .newMV {
    width: 100%;
    margin-top: 20px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        width: 330px;
        height: 270px;
        margin-left: 10px;
        margin-bottom: 10px;
        .nml1 {
          width: 100%;
          height: 200px;
          border-radius: 20px;
          overflow: hidden;
          .mvPic {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
        }
        .mvName {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-weight: 900;
          font-size: 20px;
          color: #f2cac9;
          text-align: center;
          margin-top: 5px;
        }
        .mvSinger {
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 15px;
          color: #f2cac9;
          text-align: center;
          margin-top: 5px;
        }
      }
      li:hover {
        .mvPic {
          transform: scale(1.1);
        }
      }
    }
  }
  // 推荐MV
  .recommendMv {
    width: 100%;
    margin-top: 50px;
    .recommendTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 25px;
      color: #f2cac9;
      font-weight: 900;
      border-bottom: 3px solid #f2cac9;
    }
    .recommendContent {
      width: 100%;
      height: 260px;
      margin-top: 20px;
      ul {
        width: 100%;
        height: 100%;
        display: flex;

        flex-wrap: wrap;
        .recLi {
          width: 280px;
          height: 240px;
          margin-left: 20px;
          .rec1 {
            width: 100%;
            height: 200px;
            overflow: hidden;
            border-radius: 20px;
            img {
              width: 100%;
              height: 100%;
              transition: 0.5s;
            }
          }
          p {
            width: 100%;
            height: 35px;
            line-height: 35px;
            margin-top: 5px;
            font-size: 20px;
            color: #f2cac9;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .recLi:hover {
          img {
            transform: scale(1.1);
          }
        }
      }
    }
    li:first-child {
      padding-left: 0;
    }
  }
  // MV排行榜导航
  .mvTopTab {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    border-bottom: 3px solid #f2cac9;
    .nmT {
      width: 130px;
      height: 30px;
      font-weight: 900;
      line-height: 30px;
      font-size: 25px;
      color: #f2cac9;
      float: left;
    }
    ul {
      width: calc(100% - 140px);
      height: 30px;
      margin-left: 10px;
      float: left;
      li {
        width: 50px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    li:hover {
      color: #964d22;
    }
  }
  // MV排行榜
  .mvTop {
    width: 100%;
    margin-top: 20px;
    ul {
      width: 100%;
      height: 100%;
      // 列表每个li
      .mtlLi {
        width: 50%;
        height: 110px;
        float: left;
        margin-bottom: 10px;
        border-radius: 20px;
        // 每个li的内部盒子，号码、图片、歌名
        .mvTopBox {
          width: 95%;
          margin: 0 auto;
          // 号码
          .mvTopNum {
            width: 30px;
            height: 100%;
            line-height: 110px;
            font-size: 25px;
            color: #f2cac9;
            float: left;
          }
          // 图片盒子
          .mvTopPic {
            width: 150px;
            height: 110px;
            float: left;
            border-radius: 15px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              transition: 0.5s;
              border-radius: 15px;
            }
          }
          // 音乐名字
          .mvTopText {
            width: calc(100% - 200px);
            height: 110px;
            float: left;
            margin-left: 20px;
            .mvTopMusic {
              width: 100%;
              height: calc(100% - 35px);
              font-size: 25px;
              color: #f2cac9;
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .mvTopSinger {
              width: 100%;
              height: 30px;
              margin-top: 5px;
              font-size: 20px;
              color: #f2cac9;
            }
          }
        }
      }
      .mtlLi:hover {
        box-shadow: 1px 1px 10px 1px #f2cac9;
        img {
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
