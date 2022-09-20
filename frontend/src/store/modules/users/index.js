import axios from "@/axios";
// import { useCookies } from "vue3-cookies";

// const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    me: null,
    bookmark: [],
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
    },
    // saveStateToStorage(state) {
    //   cookies.set("testvue.login.memberId", state.memberId);
    //   cookies.set("testvue.login.accessToke", state.accessToken);
    //   cookies.set("testvue.login.refreshToken", state.refreshToken);
    // },
    changeEmail(state, payload) {
      state.me.email = payload.email;
    },
    changePassword(state, payload) {
      state.me.pass = payload.pass;
    },
    addBookmark(state, payload) {
      state.bookmark.push(payload);
    },
    removeBookmark(state, payload) {
      const index = state.bookmark.findIndex((v) => v.id === payload.id);
      state.bookmark.splice(index, 1);
    },
  },
  actions: {
    signUp({ commit }, payload) {
      const url = "./decommi/member/signup";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        id: payload.id,
        pw: payload.pw,
        email: payload.email,
        q1: payload.q1,
        q2: payload.q2,
        q3: payload.q3,
      };
      console.log(body);
      axios
        .post(url, body, { headers })
        .then((res) => {
          console.log(res.data);
          // if (res.data != '') {
          //   alert('회원가입이 완료되었습니다.')
          // } else {
          //   alert('회원가입에 실패하였습니다.')
          // }
          commit("setMe", payload);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    favTags({ commit }, payload) {
      commit("setMe", payload);
    },
    dislikeTags({ commit }, payload) {
      commit("setMe", payload);
    },
    logIn({ commit }, payload) {
      const url = "/decommi/member/login";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        id: payload.id,
        pw: payload.pw,
      };
      console.log(body);
      axios
        .post(url, body, { headers })
        .then((res) => {
          console.log(res.data);
          commit("setMe", payload);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    logOut({ commit }) {
      commit("setMe", null);
    },
    changeEmail({ commit }, payload) {
      commit("changeEmail", payload);
    },
    changePassword({ commit }, payload) {
      commit("changePassword", payload);
    },
    addBookmark({ commit }, payload) {
      commit("addBookmark", payload);
    },
    removeBookmark({ commit }, payload) {
      commit("removeBookmark", payload);
    },
    // getters는 component안에서 사용하는 computed라고 생각하면 편함
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + "^-^";
    },
  },
};
