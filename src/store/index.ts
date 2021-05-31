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
    async fetchCurrency() {
      const key = process.env.VUE_APP_FIXER;
      const url = `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,PLN,EUR`;
      // const response = await fetch(url);

      // const result = await response.json();

      // return result;
    },
  },
  modules: { auth, info },
});
