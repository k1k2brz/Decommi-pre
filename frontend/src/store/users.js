// // 사용자 관련된 것들
// // mutations과 actions를 거쳐가는 걸 잘 보자.
// export const state = () => ({
//   // me가 null이면 비로그인 상태
//   me: null,
//   // 더미데이터는 백엔드 개발자와 어떻게 들어갈지 상의를 해야한다
//   recommendTagList: [],
//   noMoreTag: true,
// });

// const totalRecommendTag = 35;
// const limit = 10;

// // actions와 mutations를 만들고 그 다음 화면구현을 시작한다.
// export const mutations = {
//   // mutations는 비동기 작업이 있으면 안된다. (ajax를 못 씀)
//   // state부분은 여기서 만들어주는게 좋다
//   setMe(state, payload) {
//     state.me = payload;
//   },
//   changeNickname(state, payload) {
//     state.me.nickname = payload.nickname;
//   },
//   addRecommendTag(state, payload) {
//     state.recommendTagList.push(payload);
//   },
//   loadRecommendTag(state) {
//     const diff = totalRecommendTag - state.recommendTagList.length;
//     const fakeTag = Array(diff > limit ? limit : diff)
//       .fill()
//       .map((v) => {});
//     state.recommendTagList = state.recommendTagList.concat(fakeTag);
//     state.noMoreTag = fakeTag.length === limit;
//   },
// };

// // actions가 대신 비동기적 작업을 해줌
// export const actions = {
//   signUp({ commit, state }, payload) {
//     // 서버에 get 요청
//     // this.$axios.post("/user", {
//     // REST 비스무리한 API, HTTP API
//     // signup에서 보낸 것들 이게 서버로 출발한다
//     // email: payload.email,
//     // nickname: payload.nickname,
//     // password: payload.password,
//     // });
//     //서버에 회원가입 요청을 보내는 부분
//     // null에 넣어줄 것 / payload가 회원정보가 됨
//     commit("setMe", payload);
//   },
//   logIn({ commit }, payload) {
//     commit("setMe", payload);
//   },
//   logOut({ commit }, payload) {
//     commit("setMe", null);
//   },
//   // profile의 changeNickname
//   changeNickname({ commit }, payload) {
//     commit("changeNickname", payload);
//   },
//   addRecommendTag({ commit }, payload) {
//     commit("addRecommendTag", payload);
//   },
//   loadRecommendTag({ commit }, payload) {
//     if (state.noMoreTag) {
//       commit("loadRecommendTag");
//     }
//   },
// };
