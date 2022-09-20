// Hooks = Composables
//컴포넌트마다 중복되는 걸 하나로 모아서 쓰는 것

import { computed } from "vue";
import { useStore } from "vuex";

export const useToast = () => {
  const store = useStore();
  const toasts = computed(() => store.state.toast.toasts);
  // 처음에 메세지 창 가리기 위한 false
  // vuex를 사용하기 때문에 ref(false)에서 store.state.toastMessage로
  // vuex에 있는 state를 가져와서 showToast에 담는다
  // *** 하지만 store.state로만 옮기면 index값이 바꼈을 때 감지를 못함 그래서 computed를 사용
  // const showToast = computed(
  //   () => store.getters["toast/toastMessageWithSmile"]
  // );
  // Toast의 메세지 원하는걸 넣기 위한 작업
  // const toastMessage = computed(() => store.state.toast.toastAlertType);
  // // Toast의 :class 얼랏을 받기위함
  // const toastAlertType = computed(() => store.state.toast.showToast);
  // 아래 tiggerToast가 메세지 업데이트 해줌
  // showToast가 Toast로 날아가며 True로 변환되며 메세지 뜸
  const tiggerToast = (message, type = "success") => {
    // mutations는 commit 액션은 dispatch
    // toast의 index에서 하나의 payload로 받기 위해 { }
    store.dispatch("toast/tiggerToast", { message, type });
  };

  // 메모리 누수 관리를 위한 unmounted
  // 세이브 하고 5초 전에 페이지 이동하면 clearTimeout발동
  // 이제 App.vue에서만 사용하기 때문에 필요없어짐
  // onUnmounted(() => {
  //   clearTimeout(timeout.value);
  // });

  return {
    tiggerToast,
    toasts,
  };
};
