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
    userId: state => _.get(state, ["user", "id"], null)
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

    resetToken: state => {
      Cookie.remove("token");
      state.token = null;
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
      commit("resetToken");
      // dispatch("cleanUpStore", null, { root: true });
    },

    signin: async (
      { commit, dispatch, state, getters },
      { login, password }
    ) => {
      commit("cleanError");
      commit("lock");

      let response, data;
      try {
        response = await http.post("/api/signin", { login, password });
        data = response.data;
        console.log(response);
        commit("unlock");

        if (getters.isAuthenticated) dispatch("signout");
        const token = data.token;
        commit("setToken", token);

        // await dispatch("getUserInfo");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;
        console.error(response);
        if (response.status == 401) {
          commit("resetToken");
        }
        commit("setError", data.message);
        commit("unlock");
      }
    }

    // signup: async ({ commit }, user) => {
    //     commit("setError", null);
    //     commit("lock");

    //     try {
    //         if (!_.isObjectLike(user) || _.isArray(user)) user = _.stubObject();
    //         let roleId = _.get(user, "roleId", null);
    //         let result;
    //         switch (roleId) {
    //             case role.legal:
    //                 result = httpResponse(
    //                     await http.post(
    //                         arrayToString([
    //                             process.env.VUE_APP_URL_API,
    //                             process.env.VUE_APP_URL_API_USERS,
    //                             `/CreateJuridicalPerson`
    //                         ]),
    //                         httpRequest(user)
    //                     )
    //                 );
    //                 break;
    //             default:
    //                 result = httpResponse(
    //                     await http.post(
    //                         arrayToString([
    //                             process.env.VUE_APP_URL_API,
    //                             process.env.VUE_APP_URL_API_USERS
    //                         ]),
    //                         httpRequest(user)
    //                     )
    //                 );
    //                 break;
    //         }

    //         commit("unlock");
    //     } catch (error) {
    //         let { errorType, errorDetails } = fetchDataFromBadRequest(error);
    //         console.error("auth/register", { errorType, errorDetails });

    //         if (errorDetails !== null) commit("AUTH_ERROR", errorDetails);
    //         else commit("AUTH_ERROR");
    //         commit("unlock");
    //     }
    // },

    // getUserInfo: async ({ commit }) => {
    //     commit("setError", null);
    //     commit("lock");

    //     try {
    //         let { json } = httpResponse(
    //             await http.get(
    //                 arrayToString([
    //                     process.env.VUE_APP_URL_API,
    //                     process.env.VUE_APP_URL_API_USER_INFO
    //                 ])
    //             )
    //         );

    //         commit("SET_AUTH_INFO", json);
    //         commit("unlock");
    //     } catch (error) {
    //         let { errorType, errorDetails } = fetchDataFromBadRequest(error);
    //         console.error("auth/getUserInfo", { errorType, errorDetails });

    //         if (errorDetails !== null) commit("setError", errorDetails);
    //         else commit("setError");
    //         commit("unlock");
    //     }
    // }
  }
};

export { auth as default };
