import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入左侧导航栏对应的内容页面
import Personality from '@/components/content/Personality/Personality.vue'
import SongList from '@/components/content/SongList/SongList.vue'
import Top from '@/components/content/Top/Top.vue'
import Singer from '@/components/content/Singer/Singer.vue'
import Mv from '@/components/content/Mv/Mv.vue'
import NewMusic from '@/components/content/NewMusic/NewMusic.vue'

// 推荐歌单子页面
import PlayListDetail from '@/components/content/PlayListDetail/PlayListDetail.vue'
// 独家放送子页面
import OnlyPage from '@/components/content/OnlyPage/OnlyPage.vue'
// 歌单页面子页面
import SongListPage from '@/components/content/SongListPage/SongListPage.vue'
// 歌手页面子页面
import SingerPage from '@/components/content/SingerPage/SingerPage.vue'
// 最新MV页面子页面
import NewMvPage from '@/components/content/NewMvPage/NewMvPage.vue'
// 推荐MV页面子页面
import RecommendMv from '@/components/content/RecommendMv/RecommendMv.vue'
// MV排行榜页面子页面
import MvTopPage from '@/components/content/MvTopPage/MvTopPage.vue'
// 飙升榜页面子页面
import AuthorityPage from '@/components/content/AuthorityPage/AuthorityPage.vue'
// 新歌榜页面子页面
import NewSingPage from '@/components/content/NewSingPage/NewSingPage.vue'
// 原创榜页面子页面
import OriginalPage from '@/components/content/OriginalPage/OriginalPage.vue'
// 热歌榜页面子页面
import HotSongPage from '@/components/content/HotSongPage/HotSongPage.vue'
// 全球榜页面子页面
import GlobalPage from '@/components/content/GlobalPage/GlobalPage.vue'
// 搜索到的内容页面
import SearchPage from '@/components/content/SearchPage/SearchPage.vue'

const routes = [
  { path: '/', redirect: '/personality' },
  { path: '/personality', component: Personality },
  { path: '/songlist', component: SongList },
  { path: '/top', component: Top },
  { path: '/singer', component: Singer },
  { path: '/mv', component: Mv },
  { path: '/newmusic', component: NewMusic },
  { path: '/playListDetail', component: PlayListDetail },
  { path: '/onlyPage', component: OnlyPage },
  { path: '/songListPage', component: SongListPage },
  { path: '/singerPage', component: SingerPage },
  { path: '/newMvPage', component: NewMvPage },
  { path: '/mvTopPage', component: MvTopPage },
  { path: '/authorityPage', component: AuthorityPage },
  { path: '/newSingPage', component: NewSingPage },
  { path: '/originalPage', component: OriginalPage },
  { path: '/hotSongPage', component: HotSongPage },
  { path: '/globalPage', component: GlobalPage },
  { path: '/searchPage', component: SearchPage },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
