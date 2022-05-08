<template>
  <div>
    <div class="box">
      <!-- 上一首、播放、下一首按钮 -->
      <div class="player">
        <div class="last iconfont icon-shangyishou"></div>
        <div class="play iconfont icon-bofang"></div>
        <div class="next iconfont icon-xiayishou"></div>
      </div>
      <!-- 进度条 -->
      <div class="timer">
        <div class="leftTime">00:00</div>
        <div class="progress">
          <div class="dot"></div>
        </div>
        <div class="rightTime">00:00</div>
      </div>
      <!-- 音量 -->
      <div class="volume">
        <div class="iconfont icon-yinliang"></div>
        <div class="volumes">
          <div class="dot2"></div>
        </div>
      </div>
      <!-- 循环、歌词、列表 -->
      <div class="features">
        <div class="iconfont icon-shunxubofang"></div>
        <div class="iconfont icon-geciweidianji"></div>
        <div class="iconfont icon-yinleliebiao-"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Button",
};
</script>

<style lang="less">
.box {
  // 固定底部
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999999;
  width: 100%;
  height: 70px;
  background-color: #4b2e2b;
  // 播放按钮样式
  .player {
    width: 200px;
    height: 70px;
    display: flex;
    line-height: 70px;
    float: left;
    .last {
      font-size: 50px;
      float: left;
      color: #f2cac9;
      flex: 1;
    }
    .play {
      font-size: 50px;
      float: left;
      color: #f2cac9;
      flex: 1;
    }
    .next {
      font-size: 50px;
      float: left;
      color: #f2cac9;
      flex: 1;
    }
  }
  // 进度条样式
  .timer {
    box-sizing: border-box;
    width: 950px;
    height: 70px;
    float: left;
    justify-content: center;
    position: relative;
    .leftTime {
      position: absolute;
      top: 25px;
      left: 65px;
      width: 50px;
      height: 25px;
      text-align: center;
      color: #f2cac9;
    }
    .progress {
      position: absolute;
      top: 35px;
      left: 100px;
      width: 700px;
      height: 5px;
      background-color: #b7ae8f;
      float: left;
      margin-left: 25px;
      border-radius: 10px;
      position: relative;
      .dot {
        position: absolute;
        top: -5px;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #f2cac9;
      }
    }
    .rightTime {
      position: absolute;
      top: 25px;
      right: 65px;
      width: 50px;
      height: 25px;
      text-align: center;
      color: #f2cac9;
    }
  }
  // 音量样式
  .volume {
    width: 120px;
    height: 70px;
    float: left;
    .iconfont {
      float: left;
      padding-top: 25px;
      font-size: 30px;
      color: #f2cac9;
    }
    .volumes {
      margin-top: 38px;
      margin-left: 5px;
      float: left;
      width: 80px;
      height: 5px;
      border-radius: 5px;
      position: relative;
      background-color: #b7ae8f;
      .dot2 {
        position: absolute;
        top: -5px;
        left: 0;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #f2cac9;
      }
    }
  }
  // 循环、歌词、列表样式
  .features {
    width: 249px;
    height: 70px;
    line-height: 70px;
    float: left;
    display: flex;
    .iconfont {
      padding-top: 5px;
      flex: 1;
      font-size: 30px;
      text-align: center;
      color: #f2cac9;
    }
  }
}
</style>