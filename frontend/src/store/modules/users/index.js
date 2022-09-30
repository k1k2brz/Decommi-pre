import axios from "@/axios";
import router from "@/router";
// import { useCookies } from "vue3-cookies";
// const { cookies } = useCookies();

export default {
  namespaced: true,
  state: {
    me: '',
  },
  mutations: {
    setMe(state, payload) {
      state.me = payload;
    },
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
      // let myCookieValue = cookies.get("myCoookie");
      const url = "./decommi/member/signup";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        email: payload.id,
        pw: payload.pw,
        id: payload.email,
        q1: payload.q1,
        q2: payload.q2,
        q3: payload.q3,
        likeTagList: payload.likeTagList,
        // dislikeTagList: payload.dislikeTagList,
      };
      console.log(body);
      // sessionStorage.setItem("token", JSON.stringify(payload.id));
      axios
        .post(url, body, { headers })
        .then((res) => {
          console.log(res.data);
          // if (res.data != '') {
          //   alert('회원가입이 완료되었습니다.')
          // } else {
          //   alert('회원가입에 실패하였습니다.')
          // }
          // console.log(myCookieValue);
          // cookies.set("myCoookie", `${payload}`);
          commit("setMe", payload);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    likeTagList({ commit }, payload) {
      const url = "./decommi/member/";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        likeTagList: payload.likeTagList,
      };
      console.log(body);
      axios
        .post(url, body, { headers })
        .then((res) => {
          console.log(res.data);
          // payload는 프론트 값을 받아옴
          // res.data 백엔드 값을 받아옴
          commit("setMe", payload);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    dislikeTags({ commit }, payload) {
      commit("setMe", payload);
    },
    logIn({ commit }, payload) {
      const log = async () => {
        const url = "./decommi/member/login";
        const headers = {
          "Content-Type": "application/json",
        };
        const body = {
          email: payload.email,
          pw: payload.pw,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data)
            if(res.data.email !== body.email) {
              alert('가입되지 않은 메일이거나 비밀번호가 틀렸습니다.')
              return
            }
            // payload는 프론트 값을 받아옴
            // res.data 백엔드 값을 받아옴
            commit("setMe", res.data);
            router.push({
              name: "Main",
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
      log()
        
    },
    logOut({ commit }) {
      localStorage.removeItem("vuex");
      localStorage.removeItem("TOKEN");
      // localStorage.removeItem("token");
      // sessionStorage.removeItem("token");
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
