// 전체 더미 포스트 (서버 생기면 없애버릴 것)
const totalPosts = 51;
// 무한스크롤 로딩 게시글 수 제한
const limit = 10;

export default {
  namespaced: true,
  state: {
    mainPosts: [],
    changePosts: [],
    // 쓸데 없는 요청 안보내기
    hasMorePost: true,
    reportToggle: true,
    dino: "",
    regDate: "",
    bookmarkSave: false,
    report: true,
  },
  mutations: {
    setDiaryId(state, num) {
      state.dino = num;
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
    changeMainPost(state, payload) {
      const index = state.mainPosts.findIndex((v) => v.id === payload.id);
      // console.log(index);
      // getters를 써야하나?
      // 새 배열에 이 값들 다 넣고 빼서 써야하나?
      console.log(payload.id);
      console.log(payload.myWriteTitle);
      console.log(payload.myWriteContent);
      state.mainPosts[index].id = payload.id;
      state.mainPosts[index].myWriteTitle = payload.myWriteTitle;
      state.mainPosts[index].myWriteContent = payload.myWriteContent;
    },
    addComment(state, payload) {
      // 게시글에 해당하는 게시글을 찾음
      const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
      // 해당 게시글에 접근후 추가
      state.mainPosts[index].Comments.unshift(payload);
    },
    changeComment(state, payload) {
      console.log(payload.id);
      console.log(payload.id);
      console.log(payload.postId);
      console.log(state.mainPosts);
      console.log(state.mainPosts[0]);
      console.log(state.mainPosts[0].Comments);
      state.mainPosts.Comments = payload.content;
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
    // 가짜 데이터(아직 실제 데이터가 없으므로)
    loadPosts(state) {
      // 전체게시글 - 현재 내가 불러온 갯수 = 아직 안불러온 게시글 수
      const diff = totalPosts - state.mainPosts.length;
      // fill을 사용해 빈 배열을 만들고 map으로 더미데이터 때려넣음
      // 남은 게시글이 10개 이하일 때 false로 바뀌면서 나머지를 불러온다.
      const fakePosts = Array(diff > limit ? limit : diff)
        .fill()
        .map(() => ({
          // id 안겹치게 하기 위해 random
          id: Math.random().toString(),
          User: {
            id: 1,
          },
          // 백엔드가 아직 없어서 더미데이터 넣음
          content: `scrolling ${Math.random()}`,
          Comments: [],
          Images: [],
        }));
      // 더미 10개씩 추가
      state.mainPosts = state.mainPosts.concat(fakePosts);
      // limit이 아니면 hasMorePost가 false
      state.hasMorePost = fakePosts.length === limit;
    },

    setReportToggle(state, payload) {
      state.reportToggle = payload;
    },
  },
  actions: {
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
    changeMainPost({ commit }, payload) {
      commit("changeMainPost", payload);
    },
    addComment({ commit }, payload) {
      commit("addComment", payload);
    },
    changeComment({ commit }, payload) {
      commit("changeComment", payload);
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
