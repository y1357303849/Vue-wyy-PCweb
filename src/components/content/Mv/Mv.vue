<template>
  <div class="mvBox">
    <!-- 最新MV导航 -->
    <div class="newMvTab">
      <div>最新MV</div>
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
          @click="goNewMv(index)"
        >
          <img class="mvPic" :src="item.cover" alt="" />
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
            v-for="(item, index) in recommendMvList"
            :key="index"
            @click="goRecommendMv(index)"
          >
            <img :src="item.picUrl" alt="" />
            <p>
              {{ item.name + "--" + item.artistName }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    <!-- MV排行榜导航 -->
    <div class="mvTopTab">
      <div>MV排行榜</div>
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
            v-for="(item, index) in mvTopList"
            :key="index"
            @click="goMvTop(index)"
          >
            <div class="mvTopBox">
              <span class="mvTopNum">{{ index }}</span>
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
// eventBus
import bus from "@/components/content/eventBus.js";

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
      // 点击最新MV对应的下标
      newMvIndex: 0,
      // 点击推荐MV对应的下标
      recommendMvIndex: 0,
      // 点击MV排行榜对应的下标
      mvTopIndex: 0,
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
    goNewMv(index) {
      // 点击跳转到newMvPage页面
      this.$router.push("/newMvPage");
      // 将当前点击的li的对应的下标数据赋值
      this.newMvIndex = index;
      // console.log(this.newMvIndex);
      // 将当前点击的li的对应的下标数据传送给子页面
      bus.$emit("newMvData", this.newMvList[this.newMvIndex]);
    },
    // 跳转推荐MV详情页
    goRecommendMv(index) {
      // 点击跳转到recommendMv页面
      this.$router.push("/recommendMv");
      // 将当前点击的li的对应的下标数据赋值
      this.recommendMvIndex = index;
      // console.log(this.newMvIndex);
      // 将当前点击的li的对应的下标数据传送给子页面
      bus.$emit("recommendMvData", this.recommendMvList[this.recommendMvIndex]);
    },
    // 跳转MV排行榜详情页
    goMvTop(index) {
      // 点击跳转到mvTopPage页面
      this.$router.push("/mvTopPage");
      // 将当前点击的li的对应的下标数据赋值
      this.mvTopIndex = index;
      // console.log(this.newMvIndex);
      // 将当前点击的li的对应的下标数据传送给子页面
      bus.$emit("mvTopData", this.mvTopList[this.mvTopIndex]);
    },
  },
};
</script>

<style lang="less" scoped>
.mvBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  // 最新MV导航
  .newMvTab {
    width: 100%;
    height: 30px;
    margin-left: 100px;
    div {
      width: 100px;
      height: 30px;
      font-weight: 900;
      line-height: 30px;
      font-size: 26px;
      color: #f2cac9;
      float: left;
    }
    li {
      width: 50px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      text-align: center;
      color: #f2cac9;
      float: left;
    }
    li:hover {
      color: #964d22;
    }
  }
  // 最新MV
  .newMV {
    width: 100%;
    height: 800px;
    margin-top: 10px;
    margin-left: 80px;
    li {
      width: 280px;
      height: 250px;
      padding-left: 20px;
      padding-top: 10px;
      float: left;
      .mvPic {
        width: 100%;
        height: 200px;
        border-radius: 20px;
      }
      .mvName {
        font-weight: 900;
        font-size: 20px;
        color: #f2cac9;
        text-align: center;
      }
      .mvSinger {
        font-size: 15px;
        color: #f2cac9;
        text-align: center;
      }
    }
  }
  // 推荐MV
  .recommendMv {
    width: 100%;
    margin-top: 20px;
    margin-left: 100px;
    .recommendTitle {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 26px;
      color: #f2cac9;
      font-weight: 900;
    }
    .recommendContent {
      padding-top: 10px;
      width: 100%;
      height: 260px;
      box-sizing: border-box;
      li {
        width: 280px;
        height: 240px;
        float: left;
        padding-left: 20px;
        img {
          width: 100%;
          height: 200px;
          border-radius: 20px;
        }
        p {
          height: 40px;
          // line-height: 30px;
          color: #f2cac9;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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
    margin-left: 100px;
    margin-top: 20px;
    div {
      width: 150px;
      height: 30px;
      font-weight: 900;
      line-height: 30px;
      font-size: 26px;
      color: #f2cac9;
      float: left;
    }
    li {
      width: 50px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      text-align: center;
      color: #f2cac9;
      float: left;
    }
    li:hover {
      color: #964d22;
    }
  }
  // MV排行榜
  .mvTop {
    width: 100%;
    height: 700px;
    margin-left: 100px;
    margin-top: 20px;
    // 列表每个li
    li {
      width: 50%;
      height: 110px;
      float: left;
      margin-top: 10px;
      box-sizing: border-box;
      // 每个li的内部盒子，号码、图片、歌名
      .mvTopBox {
        // 号码
        .mvTopNum {
          width: 30px;
          height: 100%;
          justify-content: center;
          padding-top: 35px;
          box-sizing: border-box;
          font-size: 25px;
          color: #f2cac9;
          float: left;
        }
        // 图片盒子
        .mvTopPic {
          position: relative;
          img {
            width: 150px;
            height: 100px;
            display: block;
            // filter: blur(1px);
            float: left;
            border-radius: 15px;
          }
        }
        // 音乐名字
        .mvTopText {
          width: 400px;
          height: 110px;
          float: left;
          .mvTopMusic {
            font-size: 25px;
            color: #f2cac9;
            margin-bottom: 45px;
            margin-left: 20px;
            box-sizing: border-box;
          }
          .mvTopSinger {
            font-size: 20px;
            color: #f2cac9;
            margin-left: 20px;
            box-sizing: border-box;
            // overflow: hidden;
          }
        }
      }
    }
  }
}
</style>