<template>
  <div class="singerBox">
    <!-- 头部导航 -->
    <div class="classify">
      <div class="language">
        <div class="languageName">语种：</div>
        <div class="languageName2">
          <ul>
            <li>全部</li>
            <li>华语</li>
            <li>欧美</li>
            <li>日本</li>
            <li>韩国</li>
            <li>其它</li>
          </ul>
        </div>
      </div>
      <div class="classes">
        <div class="classesName">分类：</div>
        <div class="classesName2">
          <ul>
            <li>全部</li>
            <li>男歌手</li>
            <li>女歌手</li>
            <li>乐队</li>
          </ul>
        </div>
      </div>
      <div class="screen">
        <div class="screenName">筛选：</div>
        <div class="screenName2">
          <ul>
            <li v-for="(item, index) in screenLi" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 歌手头像 -->
    <div class="singerHead">
      <ul>
        <li
          v-for="(item, index) in singerList"
          :key="index"
          @click="goSingerPage(index)"
        >
          <div class="singerPic">
            <img :src="item.picUrl" alt="" />
          </div>
          <div class="singerName">
            <p>{{ item.name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getWholeListAPI } from "@/network/Singer.js";
// eventBus
import bus from "@/components/content/eventBus.js";

export default {
  name: "Singer",
  data() {
    return {
      // 头部导航字母
      screenLi: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      // 歌手头像列表
      singerList: [],
      // 点击歌手对应的下标
      singerIndex: 0,
    };
  },
  created() {
    this.SingerList();
  },
  methods: {
    // 歌手列表
    async SingerList() {
      const { data: res } = await getWholeListAPI(this.singerList);
      // console.log(res.artists);
      this.singerList = res.artists;
    },
    // 点击跳转歌手详情页
    goSingerPage(index) {
      // 点击跳转到singerPage页面
      this.$router.push("/singerPage");
      // 将当前点击的li的对应的下标数据赋值
      this.singerIndex = index;
      // console.log(this.singerIndex);
      // 将当前点击的li的对应的下标数据传送给子页面
      bus.$emit("singerData", this.singerList[this.singerIndex]);
    },
  },
};
</script>

<style lang="less" scoped>
.singerBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  // 头部导航
  .classify {
    width: 100%;
    height: 100px;
    margin-left: 100px;
    // 语种
    .language {
      width: 100%;
      height: 30px;
      line-height: 30px;
      .languageName {
        width: 50px;
        color: #f2cac9;
        float: left;
      }
      .languageName2 li {
        width: 100px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    // 分类
    .classes {
      width: 100%;
      height: 30px;
      line-height: 30px;
      .classesName {
        width: 50px;
        color: #f2cac9;
        float: left;
      }
      .classesName2 li {
        width: 100px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    // 筛选
    .screen {
      width: 100%;
      height: 30px;
      line-height: 30px;
      .screenName {
        width: 50px;
        color: #f2cac9;
        float: left;
      }
      .screenName2 li {
        width: 40px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    li:hover {
      background-color: #964d22;
    }
  }
  // 歌手头像
  .singerHead {
    width: 100%;
    height: 1200px;
    margin-top: 20px;
    margin-left: 90px;
    // background-color: red;
    li {
      width: 190px;
      height: 170px;
      float: left;
      padding-left: 10px;
      padding-top: 10px;
      .singerPic img {
        width: 100%;
        height: 150px;
        border-radius: 20px;
      }
      .singerName {
        width: 100%;
        height: 20px;
        color: #f2cac9;
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>