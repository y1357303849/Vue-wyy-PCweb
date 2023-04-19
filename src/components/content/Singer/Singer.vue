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
          class="shLi"
          v-for="(item, index) in singerList"
          :key="index"
          @click="goSingerPage(item.id)"
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
    goSingerPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/singerPage",
          query: { singerData: i },
        });
      }, 500);
    },
  },
};
</script>

<style lang="less">
.singerBox {
  width: 100%;
  margin-top: 75px;

  // 头部导航
  .classify {
    width: 100%;
    height: 100px;
    border-bottom: 3px solid #f2cac9;
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
        border-radius: 10px;

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
        border-radius: 10px;

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
        border-radius: 10px;

        width: 40px;
        text-align: center;
        color: #f2cac9;
        float: left;
      }
    }
    li:hover {
      background-color: #964d22;
      font-weight: bold;
    }
  }
  // 歌手头像
  .singerHead {
    width: 100%;

    margin-top: 20px;
    ul {
      width: 100%;
      height: 100%;
      display: flex;

      flex-wrap: wrap;
      .shLi {
        width: 190px;
        height: 180px;
        margin-left: 10px;
        margin-bottom: 20px;
        cursor: pointer;
        .singerPic {
          width: 100%;
          height: 150px;
          border-radius: 20px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            transition: 0.5s;
          }
        }
        .singerName {
          width: 100%;
          height: 25px;
          margin-top: 5px;
          color: #f2cac9;
          line-height: 25px;
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
      }
      .shLi:hover {
        img {
          transform: scale(1.3);
        }
      }
    }
  }
}
</style>
