import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 导入左侧导航栏对应的内容页面
import Personality from "@/components/content/Personality/Personality.vue";
import SongList from "@/components/content/SongList/SongList.vue";
import Top from "@/components/content/Top/Top.vue";
import Singer from "@/components/content/Singer/Singer.vue";
import Mv from "@/components/content/Mv/Mv.vue";
import NewMusic from "@/components/content/NewMusic/NewMusic.vue";

// 推荐歌单子页面
import PlayListDetail from "@/components/content/PlayListDetail/PlayListDetail.vue";
import PlayListDetail2 from "@/components/content/PlayListDetail/PlayListDetail2.vue";
// Mv子页面
import MvPage from "@/components/content/MvPage/MvPage.vue";
// 歌手页面子页面
import SingerPage from "@/components/content/SingerPage/SingerPage.vue";
// 搜索到的内容页面
import SearchPage from "@/components/content/SearchPage/SearchPage.vue";

const routes = [
  { path: "/", redirect: "/personality" },
  { path: "/personality", component: Personality },
  { path: "/songlist", component: SongList },
  { path: "/top", component: Top },
  { path: "/singer", component: Singer },
  { path: "/mv", component: Mv },
  { path: "/newmusic", component: NewMusic },
  { path: "/playListDetail", component: PlayListDetail },
  { path: "/playListDetail2", component: PlayListDetail2 },
  { path: "/mvPage", component: MvPage },
  { path: "/singerPage", component: SingerPage },
  { path: "/searchPage", component: SearchPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
