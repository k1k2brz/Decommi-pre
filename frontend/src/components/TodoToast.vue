<template>
  <div class="toast-box">
    <!-- v-for를 사용하기 때문에 div가 여러개로 인식 됨
    그래서 transition이 아니라 transition group을 써야함 -->
    <transition-group name="slide">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="alert"
        :class="`alert-${toast.type}`"
        role="alert"
      >
        <!-- toast객체안의 메세지에 접근 -->
        {{ toast.message }}
      </div>
    </transition-group>
    <!-- toast지워지기 전에 누르면 단어 바뀌는 현상 방지 위해 배열 만들고 v-for로 겹겹이 -->
  </div>
</template>

<script>
import { useToast } from "@/composables/toast";
export default {
  // mutations/action방식으로 사용하기 때문에 props를 지운것?
  setup() {
    const { toasts } = useToast();

    return {
      toasts,
    };
  },
};
</script>

<style scoped>
.toast-box {
  position: fixed;
  top: 10px;
  right: 10px;
}
/* Scoped를 사용하지 않으면 연결된 모든 곳(다른컴포넌트)에 Style이 적용됨 */

/* vue의 기본 애니메이션 작동법 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
