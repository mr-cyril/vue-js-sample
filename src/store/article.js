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
    },

    putComment: (state, comment) => {
      state.comments = [...state.comments, comment];
    }
  },

  actions: {
    fetchDetail: async ({ commit, dispatch }) => {
      commit("clean");
      commit("lock");

      let response, data, detail;
      try {
        response = await http.get("/api/articles/last");
        detail = response.data;

        commit("setDetail", detail);
        await dispatch("fetchComments", detail.id);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        commit("setError", data.message);
        commit("unlock");
      }
    },

    fetchComments: async ({ commit, dispatch }, articleId) => {
      commit("cleanError");
      commit("lock");

      let response, data, comments;
      try {
        response = await http.get(`/api/articles/comments/${articleId}`);
        comments = response.data;

        commit("setComments", comments);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        commit("setError", data.message);
        commit("unlock");
      }
    },

    createComment: async (
      { commit, dispatch },
      { articleId, userId, datetime, text }
    ) => {
      commit("cleanError");
      commit("lock");

      let response, data, comment;
      try {
        response = await http.post(`/api/articles/comments`, {
          articleId,
          userId,
          datetime,
          text
        });
        comment = response.data;

        commit("putComment", comment);
        commit("unlock");
      } catch (error) {
        response = _.defaultTo(error.response, _.stubObject());
        data = response.data;

        commit("setError", data.message);
        commit("unlock");
      }
    }
  }
};

export { article as default };
