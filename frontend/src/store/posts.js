// // virtualized list는 꼭 필요하지만 직접 구현하기는 어렵다. 그래서 남이 만든 프레임 워크를 쓸 것

// export const state = () => ({
//   // 게시글을 담아두는 배열 (state)
//   mainPosts: [],
//   // 무한 스크롤 준비 (게시글이 내가 정해둔 갯수 대로 로드 되는가 (기준 미달이면 false로 바뀜))
//   hasMorePost: true,
//   reportToggle: true,
// });

// // front는 limit과 totalPosts를 알 수 없기 때문에 state에다 넣으면 안됨 (더미데이터용)
// // 게시글 101개가 서버에 있다면
// const totalPosts = 51;
// // 무한스크롤 로딩 게시글 수 제한
// const limit = 10;

// // 비동기 작업이 있으면 안됨 (promise, ajax, setTimeout등)
// export const mutations = {
//   //동기적으로 바꿔준다.
//   addMainPost(state, payload) {
//     // 게시글 맨 앞에 추가
//     state.mainPosts.unshift(payload);
//   },
//   removeMainPost(state, payload) {
//     // 삭제할 게시글의 id를 알려준다 (payload.id)
//     // mainPost에서 그 id에 해당하는 게시글이 있는지 찾음
//     const index = state.mainPosts.findIndex((v) => v.id === payload.id);
//     // 게시글을 splice로 제거
//     state.mainPosts.splice(index, 1);
//   },
//   addComment(state, payload) {
//     // 게시글에 해당하는 게시글을 찾음
//     const index = state.mainPosts.findIndex((v) => v.id === payload.postId);
//     // 해당 게시글에 접근후 추가
//     state.mainPosts[index].Comments.unshift(payload);
//   },
//   // 가짜 데이터(아직 실제 데이터가 없으므로)
//   loadPosts(state) {
//     // 전체게시글 - 현재 내가 불러온 갯수 = 아직 안불러온 게시글 수
//     const diff = totalPosts - state.mainPosts.length;
//     // fill을 사용해 빈 배열을 만들고 map으로 더미데이터 때려넣음
//     // 남은 게시글이 10개 이하일 때 false로 바뀌면서 나머지를 불러온다.
//     const fakePosts = Array(diff > limit ? limit : diff)
//       .fill()
//       .map((v) => ({
//         // id 안겹치게 하기 위해 random
//         id: Math.random().toString(),
//         User: {
//           id: 1,
//           nickname: "cats",
//         },
//         // 백엔드가 아직 없어서 더미데이터 넣음
//         content: `Hello infinite scrolling~ ${Math.random()}`,
//         Comments: [],
//         Images: [],
//       }));
//     // 더미 10개씩 추가
//     state.mainPosts = state.mainPosts.concat(fakePosts);
//     // limit이 아니면 hasMorePost가 false
//     state.hasMorePost = fakePosts.length === limit;
//   },

//   setReportToggle(state, payload) {
//     state.reportToggle = payload;
//   },
// };

// export const actions = {
//   // { commit } 자리가 context자리. console.log(context)하면 나옴
//   // commit, dispatch, state, rootState, getters등 있음
//   add({ commit }, payload) {
//     // 같은 모듈 안에서는 posts/addMainPost같이 앞에 안 붙여도 됨
//     // 서버에 게시글 등록 요청 보냄
//     // state.add해도 되지만 뮤테이션을 통해 변경시키기 위해 commit으로 받음
//     commit("addMainPost", payload);
//   },
//   remove({ commit }, payload) {
//     commit("removeMainPost", payload);
//   },
//   addComment({ commit }, payload) {
//     commit("addComment", payload);
//   },
//   loadPosts({ commit, state }, payload) {
//     // 더이상 불러올 게시글이 없으면 로드 요청을 보내기 않기 위한 작업
//     if (state.hasMorePost) {
//       commit("loadPosts");
//     }
//   },
//   reportToggle({ commit }, payload) {
//     commit("setReportToggle", payload);
//   },
// };
