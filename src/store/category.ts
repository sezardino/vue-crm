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
      const categories = categoriesData.val();

      const formattedCategories = Object.keys(categories).map((item) => ({
        id: item,
        ...categories[item],
      }));

      return formattedCategories;
    },

    async createCategory({ dispatch, commit }, { name, limit }) {
      try {
        const id = await dispatch("getUserId");
        let available = true;
        const categories = firebase.database().ref(`/users/${id}/categories`);

        const values = (await dispatch("getCategories")).find(
          (category) => category.name === name
        );
        available = values ? false : true;

        if (!available) {
          throw new Error(messages.categoryName);
        }

        const category = categories.push({ name, limit });
        return { name, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
      }
    },
  },
};
