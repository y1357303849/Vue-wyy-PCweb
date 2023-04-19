import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
import "./assets/icon/iconfont.css";

import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

Vue.use(VueVideoPlayer);
Vue.use(Vant);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
