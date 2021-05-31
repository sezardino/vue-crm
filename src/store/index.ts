import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";

export default createStore({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    error(state) {
      return state.error;
    },
  },
  actions: {
    fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
    },
  },
  modules: { auth, info },
});
