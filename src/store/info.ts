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

    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const userId = await dispatch("getUserId");
        const updateData = { ...getters.info, ...toUpdate };
        await firebase
          .database()
          .ref(`/users/${userId}/info`)
          .update(updateData);
        commit("setInfo", updateData);
      } catch (error) {
        commit("setError", error);
      }
    },
  },
  getters: {
    info: (state) => state.info,
  },
};
