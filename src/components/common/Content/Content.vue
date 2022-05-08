<template>
  <div class="boxBox">
    <div class="left">
      <!-- 左侧导航栏 -->
      <LeftBox></LeftBox>
    </div>
    <div class="right">
      <!-- 右侧内容 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftBox from "../LeftBox/LeftBox.vue";

export default {
  name: "Content",
  components: {
    LeftBox,
  },
};
</script>

<style lang="less">
.boxBox {
  width: 100%;
  height: 100%;
  .left {
    float: left;
  }
  .right {
    float: left;
    width: 100%;
    background-color: #5d3131;
  }
}
</style>