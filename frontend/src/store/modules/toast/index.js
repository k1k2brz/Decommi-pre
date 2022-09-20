export default {
  // 이걸 넣어야 폴더처럼 사용 가능
  namespaced: true,
  state: {
    toasts: [],
    // toastMessage: "",
    // toastAlertType: "",
    // showToast: false,
  },
  //vuex로 toast를 보내기 위함
  // mutations를 사용해서 state적용
  mutations: {
    // UPDATE_TOAST_MESSAGE(state, payload) {
    //   state.toastMessage = payload;
    // },
    // UPDATE_TOAST_ALERT_TYPE(state, payload) {
    //   state.toastAlertType = payload;
    // },
    // UPDATE_TOAST_STATUS(state, payload) {
    //   state.showToast = payload;
    // },
    // UPDATE_TOAST_TIMEOUT(state, payload) {
    //   state.timeout = payload;
    // },
    // mutations
    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    // setTimeout의 commit대신
    // toasts의 배열 안에 들어가는 것
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },
  actions: {
    // 아래 tiggerToast가 메세지 업데이트 해줌
    // showToast가 Toast로 날아가며 True로 변환되며 메세지 뜸
    // context안의 기능 commit을 빼서 사용
    // 한개의 payload밖에 못 받는다 (두개 이상이면 에러남)
    // 두개 이상 받고싶으면 안에 오브젝트 만들고 거기서 가져와야함
    tiggerToast({ commit }, payload) {
      //message, type = "success"
      // vuex안에 있는 state를 바꾸려면 mutations사용
      // 함수를 액션에 보내주는 요소를 mutations에
      // toastMessage.value = message;
      // payload자리에 message
      //   commit("UPDATE_TOAST_MESSAGE", message);
      //   // toastAlertType.value = type;
      //   commit("UPDATE_TOAST_ALERT_TYPE", type);
      //   // showToast.value = true;
      //   commit("UPDATE_TOAST_STATUS", true);
      commit("ADD_TOAST", {
        id: Date.now(),
        // toast.js에서 message, type받음
        message: payload.message,
        type: payload.type,
      });
      // 실행이 필요 없을 때 멈추기 위해 변수안에 넣음
      setTimeout(() => {
        // //   toastMessage.value = "";
        // commit("UPDATE_TOAST_MESSAGE", "");
        // //   toastAlertType.value = "";
        // commit("UPDATE_TOAST_ALERT_TYPE", "");
        // //   showToast.value = false;
        // commit("UPDATE_TOAST_STATUS", false);
        commit("REMOVE_TOAST");
      }, 10000);
    },
    // getters는 component안에서 사용하는 computed라고 생각하면 편함
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + "^-^";
    },
  },
};
