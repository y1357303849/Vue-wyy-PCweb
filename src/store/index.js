import { options } from "less";
import Vue from "vue";
import Vuex from "vuex";
import songData from "./modules/songData";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    songData,
  },
});
