import firebase from "firebase/app";

export default {
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    async logout({ dispatch }) {
      await firebase.auth().signOut();
      await dispatch("clearInfo");
    },

    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const id = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`users/${id}/info`)
          .set({ bill: 100, name });
      } catch (error) {
        commit("setError", error);
        throw error;
      }
    },

    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
