import http from "@/utilities/http";
import _ from "lodash";

const article = {
  namespaced: true,

  state: {
    lockingPool: 0,
    error: undefined,
    detail: undefined,
    comments: []
  },

  getters: {
    isLoading: state => _.gt(state.lockingPool, 0),
    error: state => state.error,
    detail: state => state.detail,
    comments: state => state.comments
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
      state.detail = undefined;
      state.comments = [];
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

    setDetail: (state, detail) => {
      state.detail = detail;
    },

    setComments: (state, comments) => {
      state.comments = comments;
    }
  },

  actions: {
    fetchDetail: async ({ commit, dispatch }) => {
      commit("clean");
      commit("lock");

      let response, data;
      try {
        response = await http.get("/api/articles/last");
        data = response.data;

        commit("setDetail", data);
        await dispatch("fetchComments", data.id);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;
        console.error(response);
        commit("setError", data.message);
        commit("unlock");
      }
    },

    fetchComments: async ({ commit, dispatch }, articleId) => {
      commit("cleanError");
      commit("lock");

      let response, data;
      try {
        response = await http.get(`/api/articles/comments/${articleId}`);
        data = response.data;
        console.log(response);

        commit("setComments", data);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;
        console.error(response);
        commit("setError", data.message);
        commit("unlock");
      }
    }
  }
};

export { article as default };
