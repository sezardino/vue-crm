import messages from "@/utils/messages";
import firebase from "firebase/app";

type categoryData = {
  name: string;
  limit: number;
};

export default {
  actions: {
    async getCategories({ dispatch, commit }) {
      const id = await dispatch("getUserId");
      const categoriesData = await firebase
        .database()
        .ref(`users/${id}/categories`)
        .once("value");
      const categories = categoriesData.val() || {};

      const formattedCategories = Object.keys(categories).map((item) => ({
        id: item,
        ...categories[item],
      }));

      return formattedCategories;
    },

    async createCategory({ dispatch, commit }, { name, limit }) {
      try {
        let available = true;
        const values = (await dispatch("getCategories")).find(
          (category) => category.name === name
        );
        available = values ? false : true;

        if (!available) {
          throw new Error(messages.categoryName);
        }

        const id = await dispatch("getUserId");
        const categories = firebase.database().ref(`/users/${id}/categories`);
        const category = categories.push({ name, limit });
        return { name, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
      }
    },
    async updateCategory({ dispatch, commit }, { id, name, limit }) {
      try {
        const userId = await dispatch("getUserId");
        await firebase
          .database()
          .ref(`/users/${userId}/categories`)
          .child(id)
          .update({ name, limit });
      } catch (error) {
        commit("setError", error);
      }
    },
  },
};
