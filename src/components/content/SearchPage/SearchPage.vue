<template>
  <div class="searchBox">
    <!-- 顶部搜索内容的总结 -->
    <div class="resultTop">
      <div class="resultText">{{ this.toSearch }}</div>
      <div class="topText">共找到</div>
      <div class="resultNum">{{ searchDetail.length }}</div>
      <div class="topText">个</div>
      <div class="resultType">单曲</div>
    </div>
    <!-- 搜索到的歌曲 -->
    <div class="resultContent">
      <!-- 选择栏 -->
      <div class="topTab">
        <ul>
          <li>单曲</li>
          <li>歌手</li>
          <li>歌单</li>
          <li>专辑</li>
          <li>MV</li>
        </ul>
      </div>
      <!-- 歌曲列表 -->
      <div class="searchSing">
        <ul>
          <!-- 头部固定样式 -->
          <li class="liTop">
            <div class="listNum"></div>
            <div class="listLike">操作</div>
            <div class="listSing">音乐标题</div>
            <div class="listSinger">歌手</div>
            <div class="listAlubm">专辑</div>
            <div class="listTime">时长</div>
          </li>
          <!-- 歌曲列表 -->
          <li
            class="singList"
            v-for="(item, index) in searchDetail"
            :key="index"
          >
            <div class="listNum">{{ index + 1 }}</div>
            <div class="listLike">❤</div>
            <div class="listSing">{{ item.name }}</div>
            <div class="listSinger">{{ item.artists[0].name }}</div>
            <div class="listAlubm">{{ item.album.name }}</div>
            <div class="listTime">04:16</div>
          </li>
        </ul>
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
  name: "SearchPage",
  data() {
    return {
      // 搜索框传送过来的内容
      toSearch: [],
      // 搜索的数据
      searchDetail: [],
    };
  },
  created() {
    // 销毁bus
    bus.$off("searchData");
    this.getSearch();
  },
  mounted() {
    // 接收搜索框传送过来的数据
    bus.$on("searchData", (val) => {
      this.toSearch = val;
      console.log(this.toSearch);
      // 将数据存储到localStorage里
      window.localStorage.setItem("searchData", JSON.stringify(this.toSearch));
    });
  },
  methods: {
    // 请求搜索的内容
    async getSearch() {
      // 将存储的数据赋值到sContent里
      const sContent = window.localStorage;
      // console.log(sContent.searchData);
      const { data: res } = await request.get(
        // 网络请求尾部加上当前搜索的内容，以此来获取对应搜索详情页的数据，还得转换字符串
        "/search?keywords= " + JSON.stringify(sContent.searchData),
        {
          params: {
            searchs: this.songdetail,
          },
        }
      );
      this.searchDetail = res.result.songs;
      // console.log(this.searchDetail);
    },
  },
};
</script>

<style lang="less" scoped>
.searchBox {
  width: 1200px;
  margin-top: 75px;
  margin-left: 200px;
  margin-bottom: 75px;
  // 顶部总结
  .resultTop {
    width: 100%;
    height: 50px;
    margin-left: 50px;
    .resultText,
    .resultNum,
    .resultType {
      height: 50px;
      line-height: 50px;
      float: left;
      font-size: 20px;
      font-weight: 900;
      margin-left: 10px;
      color: #f2cac9;
    }
    .topText {
      height: 50px;
      line-height: 50px;
      float: left;
      margin-left: 10px;
      color: #964d22;
      font-weight: 900;
    }
  }
  // 搜索到的歌曲
  .resultContent {
    width: 100%;
    height: 1000px;
    margin-left: 50px;
    margin-top: 10px;
    // 选择栏
    .topTab {
      width: 500px;
      height: 40px;
      li {
        width: 100px;
        height: 40px;
        line-height: 40px;
        float: left;
        text-align: center;
        color: #f2cac9;
        font-size: 20px;
        font-weight: 900;
      }
      li:hover {
        color: #964d22;
        border-bottom: 5px solid #964d22;
        box-sizing: border-box;
      }
    }
    // 歌曲列表
    .searchSing {
      width: 100%;
      height: 40px;
      background-color: #964d22;
      // 头部固定样式
      .liTop {
        width: 100%;
        margin-top: 10px;
        display: flex;
        .listNum {
          flex: 1;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
        }
        .listLike {
          flex: 1;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #f2cac9;
          font-weight: 900;
        }
        .listSing,
        .listSinger,
        .listAlubm {
          flex: 5;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #f2cac9;
          font-weight: 900;
        }
        .listTime {
          flex: 2;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #f2cac9;
          font-weight: 900;
        }
      }
      // 歌曲列表
      .singList {
        width: 100%;
        display: flex;
        .listNum {
          flex: 1;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #f2cac9;
        }
        .listLike {
          flex: 1;
          height: 40px;
          line-height: 40px;
          padding-left: 25px;
          color: #f2cac9;
        }
        .listSing,
        .listSinger,
        .listAlubm {
          flex: 5;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #f2cac9;
        }
        .listTime {
          flex: 2;
          height: 40px;
          line-height: 40px;
          padding-left: 10px;
          color: #f2cac9;
        }
      }
    }
  }
}
</style>