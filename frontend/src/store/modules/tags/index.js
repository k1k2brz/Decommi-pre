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
      console.log(state.filterTags);
      const index = state.filterTags.findIndex((v) => v.id === payload.id);
      console.log(index);
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
