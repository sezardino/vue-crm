import firebase from "firebase/app";

const record = {
  actions: {
    async createRecord(
      { dispatch, commit },
      { categoryId, amount, description, type }
    ) {
      const userId = await dispatch("getUserId");
      firebase.database().ref(`users/${userId}/records`);

      try {
        const id = await dispatch("getUserId");
        const records = firebase.database().ref(`/users/${id}/records`);
        records.push({ amount, description, type, categoryId });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
  },
};

export default record;
