import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import article from "./article";

import http from "../utilities/http";

Vue.use(Vuex);

const modules = { auth, article };
const store = new Vuex.Store({ modules });

store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case "auth/setToken":
    case "auth/resetToken":
      http.defaults.headers["Authorization"] = mutation.payload
        ? `Bearer ${mutation.payload}`
        : undefined;
      break;
    default:
      break;
  }
  console.log(mutation, state);
});

export { store as default };
