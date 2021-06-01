import messages from "@/utils/messages";
import firebase from "firebase/app";

type categoryData = {
  name: string;
  limit: number;
};

export default {
  actions: {
    async createCategory({ dispatch, commit }, { name, limit }) {
      try {
        const id = await dispatch("getUserId");
        let available = true;
        const categories = firebase.database().ref(`/users/${id}/categories`);

        await categories.get().then((snapshot) => {
          if (snapshot.exists()) {
            const values = Object.values(snapshot.val()).find(
              (item: categoryData) => item.name === name
            );
            available = values ? false : true;
          }
        });

        if (!available) {
          throw new Error(messages.categoryName);
        }

        const category = await firebase
          .database()
          .ref(`/users/${id}/categories`)
          .push({ name, limit });
        return { name, limit, id: category.key };
      } catch (error) {
        commit("setError", error);
      }
    },
  },
};
