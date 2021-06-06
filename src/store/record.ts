import firebase from "firebase/app";

const record = {
  actions: {
    async createRecord(
      { dispatch, commit },
      { categoryId, amount, description, type, date }
    ) {
      const userId = await dispatch("getUserId");
      firebase.database().ref(`users/${userId}/records`);

      try {
        const id = await dispatch("getUserId");
        const records = firebase.database().ref(`/users/${id}/records`);
        records.push({ amount, description, type, categoryId, date });
      } catch (error) {
        commit("setError", error);
        throw new Error(error);
      }
    },
    async getRecords({ dispatch, commit }) {
      const id = await dispatch("getUserId");
      const recordsData = await firebase
        .database()
        .ref(`users/${id}/records`)
        .once("value");
      const records = recordsData.val() || {};

      const formattedRecords = Object.keys(records).map((item) => ({
        id: item,
        ...records[item],
      }));

      return formattedRecords;
    },

    async getRecordById({ dispatch, commit }, id) {
      const userId = await dispatch("getUserId");
      const recordData = await firebase
        .database()
        .ref(`users/${userId}/records`)
        .child(id)
        .once("value");
      const record = recordData.val() || {};

      return { ...record, id };
    },
  },
};

export default record;
