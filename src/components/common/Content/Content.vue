<template>
  <div class="boxBox">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style lang="less">
.boxBox {
  width: calc(100% - 500px);
  margin-left: 350px;
  height: 100%;
  margin-bottom: 150px;
}
</style>
