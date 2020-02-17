import http from "@/utilities/http";
import * as Cookie from "js-cookie";
import _ from "lodash";

const auth = {
  namespaced: true,

  state: {
    lockingPool: 0,
    error: undefined,
    user: undefined,
    token: _.defaultTo(Cookie.get("token"), null)
  },

  getters: {
    isAuthenticated: (state, getters) => !_.isNil(getters.token),
    isAuthorized: (state, getters) =>
      getters.isAuthenticated && !_.isEmpty(getters.user),
    isLoading: state => _.gt(state.lockingPool, 0),
    error: state => state.error,
    user: state => state.user,
    userId: state => _.get(state, ["user", "id"], null),
    token: state => state.token
  },

  mutations: {
    lock: state => {
      state.lockingPool += 1;
    },

    unlock: state => {
      if (_.lte(state.lockingPool, 0)) return;
      state.lockingPool -= 1;
    },

    clean: state => {
      state.error = undefined;
      state.user = undefined;
    },

    setError: (
      state,
      error = "Что-то пошло не так. Повторите попытку позже."
    ) => {
      state.error = error;
    },

    cleanError: state => {
      state.error = undefined;
    },

    setToken: (state, token) => {
      Cookie.set("token", token);
      state.token = token;
    },

    unsetToken: state => {
      Cookie.remove("token");
      state.token = null;
    },

    setUser: (state, user) => {
      state.user = user;
    }
  },

  actions: {
    // cleanUp: async ({ commit }) => {
    //     commit("clean");
    // },

    // cleanUpError: async ({ commit }) => {
    //     commit("CLEAN_ERROR");
    // },

    // closeError({ commit }) {
    //     commit("setError", null);
    // },

    signout: async ({ commit, dispatch }) => {
      commit("unsetToken");
      commit("clean");
      // dispatch("cleanUpStore", null, { root: true });
    },

    signin: async ({ commit, dispatch, getters }, { login, password }) => {
      commit("cleanError");
      commit("lock");

      let response, data, token;
      try {
        response = await http.post("/api/signin", { login, password });
        token = response.data;

        if (getters.isAuthenticated) await dispatch("signout");
        commit("setToken", token);
        await dispatch("fetchUserInfo");
        commit("unlock");

        return true;
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        if (response.status == 401) {
          commit("unsetToken");
        }
        commit("setError", data.message);
        commit("unlock");

        return false;
      }
    },

    signup: async (
      { commit, dispatch, getters },
      { name, login, password }
    ) => {
      commit("setError", null);
      commit("lock");

      let response, data, token;
      try {
        response = await http.post("/api/signup", { name, login, password });
        token = response.data;

        if (getters.isAuthenticated) await dispatch("signout");
        commit("setToken", token);
        await dispatch("fetchUserInfo");
        commit("unlock");

        return true;
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        commit("setError", data.message);
        commit("unlock");

        return false;
      }
    },

    fetchUserInfo: async ({ commit, getters }) => {
      commit("cleanError");
      commit("lock");

      let response, data, user;
      try {
        response = await http.get("/api/userinfo");
        user = response.data;

        commit("setUser", user);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        if (getters.isAuthenticated && response.status == 403) {
          commit("unsetToken");
        }
        commit("setError", data.message);
        commit("unlock");
      }
    }
  }
};

export { auth as default };
