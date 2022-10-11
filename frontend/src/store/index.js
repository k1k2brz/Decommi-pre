// Vuex설치 후 사용한다.
// emit으로 하나하나 올리는걸 편하게 하기 위해
import { createStore } from "vuex";
import modules from "./modules";
import VuexPersistence from "vuex-persist";
// import users from "./modules/users";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "TOKEN",
  modules: ["users"],
  reducer: (state) => ({ me: state.users.me, onregi: state.users.onregi }),
});

export default createStore({
  modules,
  plugins: [new VuexPersistence().plugin, vuexLocal.plugin],
  state: {
    latestcGroup: 0,
    token: 0,
    email: 0,
    mid: 0,
    authorid: 0,
    isAlarm: 0,
    axiosLink: ".",
    axiosLinkAdmin: "..",
    EmbedLink: ".",
  },
  getters: {},
  mutations: {
    setDino(state, num) {
      state.user.me.dino = num;
    },
    setcLatestcGroup(state, group) {
      state.latestcGroup = group;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
    },
    setMId(state, payload) {
      state.mid = payload;
    },
  },
  actions: {},
});
