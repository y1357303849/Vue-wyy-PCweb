const songData = {
  state: {
    songs: {
      name: "",
      user: "",
      album: "",
      songsUrl: "",
    },
  },
  getters: {
    getSong(state) {
      return state.songs;
    },
  },
  mutations: {
    updateSongs(state, songs) {
      state.songs = songs;
    },
  },
  actions: {
    asyncUpdateSongs(context, songs) {
      context.commit("updateSongs", songs);
    },
  },
};
export default songData;
