import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "./assets/index.css";
import messagePlugin from "./utils/message";
import Loader from "./components/app/Loader.vue";
import formatDirective from "@/directives/format";
import tooltipDirective from "@/directives/tooltip";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAMNbsNmv--3rf8JLCoRlNnSE6NGMlHEJg",
  authDomain: "finance-crm-fe97c.firebaseapp.com",
  projectId: "finance-crm-fe97c",
  storageBucket: "finance-crm-fe97c.appspot.com",
  messagingSenderId: "184747597044",
  appId: "1:184747597044:web:543bfffe1d81b9ed3712a1",
};

firebase.initializeApp(firebaseConfig);
let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.component("Loader", Loader);
    app.use(store);
    app.use(router);
    app.use(messagePlugin);
    app.directive("format", formatDirective);
    app.directive("tooltip", tooltipDirective);
    app.mount("#app");
  }
});
