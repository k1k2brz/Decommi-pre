import axios from "@/axios";

export default {
  namespaced: true,
  state: {
    mainPosts: [],
    dino: "",
    regDate: "",
    bookmarkSave: false,
    report: true,
    content: '',
    count: true,
    search: null,
    dtoList: [],
  },
  mutations: {
    setDtolist(state, payload) {
      state.dtoList = payload;
    },
    setCount(state, payload) {
      state.count = payload;
    },
    setSearch(state, payload) {
      state.search = payload;
    },
    setContent(state, payload) {
      state.content = payload;
    },
    addMainPost(state, payload) {
      // 게시글 맨 앞에 추가
      state.mainPosts.unshift(payload);
    },
    removeMainPost(state, payload) {
      // 삭제할 게시글의 id를 알려준다 (payload.id)
      // mainPost에서 그 id에 해당하는 게시글이 있는지 찾음
      const index = state.mainPosts.findIndex((v) => v.id === payload.id);
      // 게시글 제거
      state.mainPosts.splice(index, 1);
    },
    addComment(state, payload) {
      // 게시글에 해당하는 게시글을 찾음
      const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
      // 해당 게시글에 접근후 추가
      state.mainPosts[index].Comments.unshift(payload);
    },
    removeComment(state, payload) {
      // 게시글 몇 번 인지
      const index = state.mainPosts.findIndex((v) => v.id === payload.id);
      console.log(index);
      // const index2 = state.mainPosts[index].Comments.findIndex(
      //   (v) => v.postId === payload.postId
      // );
      // console.log(index2);
      state.mainPosts[index].Comments.splice(index, 1);
    },

    setReportToggle(state, payload) {
      state.reportToggle = payload;
    },
  },
  actions: {
    setContent({ commit }, payload) {
      commit("setContent", payload);
    },
    setCount({ commit }, payload) {
      commit("setCount", payload);
    },
    setSearch({ commit }, payload) {
      try {
        const url = "/decommi/diary/list";
        const headers = {
          "Content-Type": "application/json",
          Authorization: payload.Authorization,
          mid: payload.mid,
        };
        const body = {
          type: payload.type,
          keyword: payload.keyword,
          tagList: payload.tagList,
          writer: payload.writer,
        };
        console.log(body);
        axios.post(url, body, { headers }).then((res) => {
          console.log(res.data);
          commit("setDtolist", JSON.parse(JSON.stringify(res.data)))
          commit("setSearch", payload);
        });
      } catch (err) {
        console.error(err);
      }
    },
    // { commit } 자리가 context자리. console.log(context)하면 나옴
    // commit, dispatch, state, rootState, getters등 있음
    add({ commit }, payload) {
      // 같은 모듈 안에서는 posts/addMainPost같이 앞에 안 붙여도 됨
      // 서버에 게시글 등록 요청 보냄
      // const url = "./decommi/api/diary";
      // const headers = {
      //   "Content-Type": "application/json",
      // };
      // state.add해도 되지만 뮤테이션을 통해 변경시키기 위해 commit으로 받음
      commit("addMainPost", payload);
    },
    remove({ commit }, payload) {
      commit("removeMainPost", payload);
    },
    addComment({ commit }, payload) {
      commit("addComment", payload);
    },
    removeComment({ commit }, payload) {
      commit("removeComment", payload);
    },
    loadPosts({ commit, state }) {
      // 더이상 불러올 게시글이 없으면 로드 요청을 보내기 않기 위한 작업
      if (state.hasMorePost) {
        commit("loadPosts");
      }
    },
    reportToggle({ commit }, payload) {
      commit("setReportToggle", payload);
    },
    // uploadImages({ commit }, payload) {

    // }
  },
};
