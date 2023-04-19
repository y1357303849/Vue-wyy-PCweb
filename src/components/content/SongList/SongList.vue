<template>
  <div class="songListBox">
    <div class="songListContent">
      <!-- 下拉菜单 -->
      <div class="dropDownList">
        <div @click="showDownBox">
          <div class="allBox">
            全部<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <div class="dropDownListBox" v-show="downBox">
            <div class="topTitle">全部歌单分类</div>
            <div class="wholeBox">全部歌单</div>
            <!-- 语种 -->
            <div class="ClassifyBox">
              <div class="titleBox">
                <i class="iconfont icon-diqiu"></i>
                <div class="boxListName">语种</div>
              </div>
              <div class="boxList">
                <ul>
                  <li
                    v-for="(item, index) in languageList"
                    :key="index"
                    class="boxListli"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 风格 -->
            <div class="ClassifyBox">
              <div class="titleBox">
                <i class="iconfont icon-yinlefuhao2"></i>
                <div class="boxListName">风格</div>
              </div>
              <div class="boxList">
                <ul>
                  <li
                    v-for="(item, index) in styleList"
                    :key="index"
                    class="boxListli"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 场景 -->
            <div class="ClassifyBox">
              <div class="titleBox">
                <i class="iconfont icon-kafei"></i>
                <div class="boxListName">场景</div>
              </div>
              <div class="boxList">
                <ul>
                  <li
                    v-for="(item, index) in sceneList"
                    :key="index"
                    class="boxListli"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 情感 -->
            <div class="ClassifyBox">
              <div class="titleBox">
                <i class="iconfont icon-maimeng"></i>
                <div class="boxListName">情感</div>
              </div>
              <div class="boxList">
                <ul>
                  <li
                    v-for="(item, index) in emotionList"
                    :key="index"
                    class="boxListli"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
            <!-- 主题 -->
            <div class="ClassifyBox">
              <div class="titleBox">
                <i class="iconfont icon-number-sign-full"></i>
                <div class="boxListName">主题</div>
              </div>
              <div class="boxList">
                <ul>
                  <li
                    v-for="(item, index) in themeList"
                    :key="index"
                    class="boxListli"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 热门标签 -->
      <div class="hotTap">
        <p class="tapName">热门标签:</p>
        <div class="hotTapLi">
          <ul v-for="(item, index) in hotTapName" :key="index">
            <li class="hotTapName">
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 歌单列表 -->
      <div class="musicLists">
        <ul class="musicListsUl">
          <li
            @click="goSongListPage(item)"
            class="musicListsLi"
            v-for="(item, index) in songLists"
            :key="index"
          >
            <div class="mlImg">
              <img class="listImgs" :src="item.coverImgUrl" alt="" />
            </div>
            <p class="listText">{{ item.name }}</p>
          </li>
        </ul>
      </div>
      <!-- 页码跳转 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        >
          <!-- :current-page.sync="currentPage3" -->
          <!-- @size-change="handleSizeChange" -->
          <!-- @current-change="handleCurrentChange" -->
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongListAPI, getSongClassifyAPI } from "@/network/SongList.js";
// eventBus
import bus from "@/components/content/eventBus.js";

export default {
  name: "SongList",
  data() {
    return {
      // 显示隐藏下拉菜单
      downBox: false,
      // 热门标签名字
      hotTapName: [
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "另类/独立",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
      // 歌曲列表
      songLists: [],
      // 全部分类总和
      allClassifys: [],
      // 语种
      languageList: [],
      // 风格
      styleList: [],
      // 场景
      sceneList: [],
      // 情感
      emotionList: [],
      // 主题
      themeList: [],
      // 歌单详情页对应的下标
      songListIndex: 0,
    };
  },
  created() {
    this.SongList();
    this.classify();
  },
  methods: {
    // 歌单列表
    async SongList() {
      const { data: res } = await getSongListAPI(this.songLists);
      // console.log(res.playlists);
      this.songLists = res.playlists;
    },
    // 分类
    async classify() {
      const { data: res } = await getSongClassifyAPI(this.allClassifys);
      // console.log(res.sub);
      // 遍历分类数据，"0": "语种","1": "风格","2": "场景","3": "情感","4": "主题"
      // 以数据里的category对应的数字进行分别的存储,使用push方法向数组存储数据
      res.sub.forEach((item) => {
        if (item.category === 0) {
          // 语种
          this.languageList.push(item.name);
          // console.log(this.languageList);
        } else if (item.category === 1) {
          // 风格
          this.styleList.push(item.name);
          // console.log(this.styleList);
        } else if (item.category === 2) {
          // 场景
          this.sceneList.push(item.name);
          // console.log(this.sceneList);
        } else if (item.category === 3) {
          // 情感
          this.emotionList.push(item.name);
          // console.log(this.emotionList);
        } else if (item.category === 4) {
          // 主题
          this.themeList.push(item.name);
          // console.log(this.themeList);
        }
      });
    },
    // 点击下拉菜单
    showDownBox() {
      if (this.downBox === false) {
        this.downBox = true;
      } else {
        this.downBox = false;
      }
    },
    // 点击歌单跳转详情页
    goSongListPage(i) {
      setTimeout(() => {
        this.$router.push({
          path: "/playListDetail",
          query: { musicData: i },
        });
      }, 500);
    },
  },
};
</script>

<style lang="less" scoped>
.songListBox {
  width: 100%;
  margin-top: 75px;
  position: relative;

  .songListContent {
    width: 100%;
    height: 2800px;
    margin-bottom: 75px;
    // 下拉菜单
    .dropDownList {
      width: 80px;
      height: 40px;

      border-radius: 10px;
      border: 2px solid #f2cac9;
      background-color: #4b2e2b;
      .allBox {
        width: 100%;
        height: 40px;
        color: #f2cac9;
        line-height: 40px;
        text-align: center;
        font-weight: 900;
      }
      .allBox:hover {
        color: #964d22;
      }
      // 下拉菜单主题
      .dropDownListBox {
        margin-top: 20px;
        width: 455px;
        height: 450px;
        position: absolute;
        z-index: 99999;
        background-color: #4b2e2b;
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 10px;
        .topTitle {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-weight: 900;
          color: #f2cac9;
          border-bottom: 3px solid #f2cac9;
          // background-color: #964d22;
          padding-left: 10px;
        }
        // 全部歌单
        .wholeBox {
          width: 90%;
          height: 30px;
          line-height: 30px;
          color: #f2cac9;
          margin-top: 10px;
          margin-left: 25px;
          box-sizing: border-box;
          text-align: center;
          border-radius: 10px;
          background-color: #964d22;
        }
        // 各个歌单分类
        .ClassifyBox {
          width: 90%;
          // height: 40px;
          margin-top: 20px;
          margin-left: 25px;
          // 图标名字盒子
          .titleBox {
            width: 30%;
            height: 40px;
            line-height: 40px;
            float: left;
            // 图标
            .iconfont {
              font-size: 40px;
              float: left;
              padding-left: 10px;
              color: #f2cac9;
            }
            // 歌单名字
            .boxListName {
              float: left;
              font-weight: 900;
              font-size: 25px;
              padding-left: 10px;
              color: #f2cac9;
            }
          }
          // 歌单小li
          .boxList {
            width: 70%;
            background-color: #964d22;
            // height: 100px;
            margin-bottom: 15px;
            border-radius: 10px;
            float: left;
            .boxListli {
              width: 55px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              overflow: hidden;
              float: left;
              color: #f2cac9;
              cursor: pointer;
            }
            .boxListli:hover {
              color: #4b2e2b;
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
    // 热门标签
    .hotTap {
      width: 100%;
      height: 40px;
      margin-top: 30px;
      border-bottom: 3px solid #f2cac9;
      .tapName {
        width: 70px;
        height: 30px;
        line-height: 30px;
        float: left;
        color: #f2cac9;
      }
      .hotTapLi {
        width: 90%;
        height: 30px;
        line-height: 30px;
        float: left;
        cursor: pointer;
        .hotTapName {
          margin-left: 50px;
          float: left;
          color: #f2cac9;
        }
        .hotTapName:hover {
          color: #964d22;
        }
      }
    }
    // 歌单列表
    .musicLists {
      width: 100%;
      margin-top: 20px;
      .musicListsUl {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .musicListsLi {
          width: 200px;
          height: 250px;
          margin-left: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          p {
            color: #f2cac9;
          }
          .mlImg {
            width: 200px;
            height: 200px;
            border-radius: 20px;
            overflow: hidden;
            .listImgs {
              width: 100%;
              height: 100%;
              transition: 0.5s;
            }
          }
          .listText {
            width: 100%;
            height: 45px;
            margin-top: 5px;
            line-height: 22px;
            font-size: 17px;
          }
        }
        .musicListsLi:hover {
          .listImgs {
            transform: scale(1.1);
          }
        }
      }
    }
    // 页码跳转
    .block {
      width: 500px;
      height: 80px;
      position: absolute;
      right: 50px;
      bottom: -40px;
    }
  }
}
</style>
