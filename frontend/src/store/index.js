// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flashMessage: null,
  },
  mutations: {
    setFlashMessage(state, message) {
      state.flashMessage = message;
    },
    clearFlashMessage(state) {
      state.flashMessage = null;
    },
    setItemId(state, itemId) {
      state.itemId = itemId;
    },
  },
  actions: {
    showFlashMessage({ commit }, { message, type }) {
      commit("setFlashMessage", { message, type });
      setTimeout(() => {
        commit("clearFlashMessage");
      }, 2000); // Auto-clear after 5 seconds
    },
  },
});
