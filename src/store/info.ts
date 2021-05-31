import firebase from "firebase/app";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchData({ dispatch, commit }) {
      const id = await dispatch("getUserId");
      const info = await firebase
        .database()
        .ref(`/users/${id}/info`)
        .once("value");
      commit("setInfo", info.val());
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
