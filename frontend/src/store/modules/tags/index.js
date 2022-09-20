export default {
  namespaced: true,
  state: {
    filterTags: [],
  },
  mutations: {
    addFilterTags(state, payload) {
      state.filterTags.push(payload);
    },
    removeFilterTags(state, payload) {
      const index = state.filterTags.findIndex((v) => v.id === payload.id);
      state.filterTags.splice(index, 1);
    },
  },
  actions: {
    addFilterTags({ commit }, payload) {
      commit("addFilterTags", payload);
    },
    removeFilterTags({ commit }, payload) {
      commit("removeFilterTags", payload);
    },
  },
};
