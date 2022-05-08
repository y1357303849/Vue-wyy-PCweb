<template>
  <div>
    <div class="header">
      <!-- 三个按钮 -->
      <div class="threeButton">
        <div class="home"></div>
        <div class="small"></div>
        <div class="end"></div>
      </div>
      <div class="leftRight">
        <!-- 上一页下一页 -->
        <div class="left iconfont icon-shangyiye" @click="goPage"></div>
        <div class="right iconfont icon-xiayiye" @click="backPage"></div>
      </div>
      <div class="search" @click="getHot">
        <!-- 搜索框 -->
        <input type="" placeholder="请输入内容" v-model="userSerach" />
        <i class="iconfont icon-sousuo" @click="goSearch"></i>
        <!-- 搜索框下拉热门搜索 -->
        <div class="searchHot" v-show="showHot">
          <ul>
            <li
              class="hotList"
              v-for="(item, index) in hotSearchs"
              :key="index"
            >
              <div class="hotNum">{{ index + 1 }}</div>
              <div class="hotContent">
                <div class="contentT">
                  <p class="sText">{{ item.searchWord }}</p>
                  <p class="sNum">{{ item.score }}</p>
                </div>
                <div class="contentB">{{ item.content }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="extra">
        <!-- 用户头像 -->
        <div class="user">
          <img src="@/assets/img/摸柴.gif" alt="" />
        </div>
        <div class="extra2">
          <!-- 皮肤 Gitee Github -->
          <div class="BackColor iconfont icon-pifu"></div>
          <div class="gitee iconfont icon-gitee2"></div>
          <div class="github iconfont icon-GitHub"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入request模块
import request from "@/untils/request.js";
// eventBus
import bus from "@/components/content/eventBus.js";

export default {
  name: "Header",
  data() {
    return {
      // 热门搜索开关
      showHot: false,
      // 热门搜索数据
      hotSearchs: [],
      // 搜索框输入的内容
      userSerach: [],
    };
  },
  created() {
    this.hotSearchDetail();
  },
  methods: {
    // 上一页
    goPage() {
      this.$router.back(-1);
    },
    // 下一页
    backPage() {
      this.$router.back(1);
    },
    // 打开热门搜索下拉菜单
    getHot() {
      if (this.showHot === false) {
        this.showHot = true;
      } else {
        this.showHot = false;
      }
    },
    // 请求热门搜索数据
    async hotSearchDetail() {
      const { data: res } = await request.get("/search/hot/detail", {
        params: {
          hotS: this.hotSearchs,
        },
      });
      this.hotSearchs = res.data;
      // console.log(this.hotSearchs);
    },
    // 点击搜索图标跳转搜索内容对应页面
    goSearch() {
      if (this.userSerach != "") {
        // 点击跳转到SearchPage页面
        this.$router.push("/searchPage");
        // console.log(this.userSerach);
        // 将当前点击的li的对应的下标数据传送给子页面
        bus.$emit("searchData", this.userSerach);
      } else {
        alert("请输入要搜索的内容!!!");
      }
    },
    //清除内容
    clearInput: function () {
      this.userSerach = "";
      this.goSearch();
    },
  },
};
</script>

<style lang="less">
// 总体大盒子
.header {
  width: 100%;
  height: 50px;
  background-color: #4b2e2b;
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  // 三个按钮样式
  .threeButton {
    width: 150px;
    height: 50px;
    // background-color: skyblue;
    float: left;
    .home {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #c04851;
      float: left;
      margin: 10px;
    }
    .small {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #fed71a;
      float: left;
      margin: 10px;
    }
    .end {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #1ba784;
      float: left;
      margin: 10px;
    }
  }
  // 上下页样式
  .leftRight {
    margin-left: 50px;
    width: 100px;
    height: 50px;
    // background-color: yellow;
    float: left;
    .left {
      width: 30px;
      height: 30px;
      float: left;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f2cac9;
      cursor: pointer;
    }
    .right {
      width: 30px;
      height: 30px;
      float: left;
      margin: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #f2cac9;
      cursor: pointer;
    }
  }
  // 搜索框样式
  .search {
    margin-left: 100px;
    // background-color: pink;
    width: 250px;
    height: 50px;
    float: left;
    position: relative;
    input {
      margin: 10px;
      width: 150px;
      height: 25px;
      border: 2px solid black;
      border-right: 0;
      padding-left: 20px;
      margin-left: 30px;
      font-weight: 800;
      color: #363433;
    }
    .iconfont {
      border: 2px solid black;
      border-left: 0;
      position: absolute;
      width: 25px;
      height: 29px;
      background-color: white;
      top: 10px;
      left: 202px;
      padding: 5px;
      box-sizing: border-box;
    }
    // 下拉热门搜索
    .searchHot {
      position: absolute;
      top: 60px;
      left: 30px;
      width: 500px;
      height: 500px;
      border-radius: 10px;
      overflow-y: scroll;
      overflow-x: hidden;
      background-color: #4b2e2b;
      .hotList {
        width: 95%;
        height: 70px;
        margin-top: 10px;
        margin-left: 10px;
        // 排名
        .hotNum {
          width: 10%;
          height: 70px;
          line-height: 70px;
          text-align: center;
          font-size: 20px;
          float: left;
          color: #f2cac9;
        }
        // 搜索内容
        .hotContent {
          width: 90%;
          height: 100%;
          float: left;
          // 上部
          .contentT {
            width: 100%;
            height: 50%;
            .sText {
              height: 35px;
              line-height: 35px;
              float: left;
              margin-left: 5px;
              font-weight: 900;
              color: #f2cac9;
            }
            .sNum {
              height: 35px;
              line-height: 35px;
              float: left;
              margin-left: 10px;
              font-weight: 900;
              color: #f2cac9;
            }
          }
          // 下部
          .contentB {
            width: 100%;
            height: 35px;
            line-height: 35px;
            margin-left: 5px;
            color: #964d22;
          }
        }
      }
    }
    // 下拉菜单滚动条样式
    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    }
    ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #964d22;
    }
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 10px;
      background: #f2cac9;
    }
  }
  // 皮肤 Gitee Github样式
  .extra {
    float: right;
    width: 400px;
    height: 50px;
    position: relative;
    // background-color: purple;
    .user {
      position: absolute;
      top: 2px;
      left: 30px;
      width: 45px;
      height: 45px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .extra2 {
      width: 200px;
      height: 50px;
      display: flex;
      // background-color: yellowgreen;
      float: right;
      .BackColor {
        flex: 1;
        width: 50px;
        height: 50px;
        font-size: 30px;
        padding: 10px;
        color: #f2cac9;
      }
      .gitee {
        flex: 1;
        width: 50px;
        height: 50px;
        font-size: 30px;
        padding: 10px;
        color: #f2cac9;
      }
      .github {
        flex: 1;
        width: 50px;
        height: 50px;
        font-size: 30px;
        padding: 10px;
        color: #f2cac9;
      }
    }
  }
}
</style>