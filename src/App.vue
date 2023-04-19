<template>
  <div id="app">
    <Header></Header>
    <LeftBox></LeftBox>
    <Content></Content>
    <Bottom></Bottom>
    <!-- 音乐播放 -->
    <audio :src="$store.getters.getSong.songsUrl" autoplay></audio>
  </div>
</template>

<script>
import Header from "./components/common/Header/Header.vue";
import LeftBox from "@/components/common/LeftBox/LeftBox.vue";
import Content from "./components/common/Content/Content.vue";
import Bottom from "./components/common/Bottom/Bottom.vue";

export default {
  name: "App",
  components: {
    Header,
    LeftBox,
    Content,
    Bottom,
  },
  created() {
    // 绕过登陆获取数据
    if (this.$store.state.cookie != null && this.$store.state.cookie != "") {
      this.limit = 11;
    }
  },
};
</script>

<style lang="less">
#app {
  // 禁止复制
  user-select: none;
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
</style>
