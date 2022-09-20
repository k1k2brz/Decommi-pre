<template>
  <!-- v-on: => @ / v-bind: => : -->
  <!-- # => # -->
  <!-- Modal 닫기 -->
  <!-- teleport라는 코드 개념 익히기 (index id생성후 감싸면 모달은 app의 영향 X)-->
  <!-- <teleport to="#modal"> -->
  <!-- slot의 사용 Modal을 닫지 말고 밑에서 닫으면 slot부분이 교체됨 -->
  <Modal class="d-flex justify-content-center align-items-center">
    <!-- TodoModal의 slot name을 받기위한 템플릿 -->
    <template #title> Delete Todo </template>
    <template #body> 정말로 Todo list를 삭제하시겠습니까? </template>
    <!-- 모달 안에 버튼 생성 -->
    <template #footer>
      <button type="button" class="mr-1 btn btn-secondary" @click="onClose">
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="onDelete">
        Delete
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/TodoModal.vue";
import { getCurrentInstance } from "vue";
export default {
  components: {
    Modal,
  },
  setup() {
    const { emit } = getCurrentInstance();
    // 부모 컴포넌트에서 close이벤트를 사용할 수 있도록
    const onClose = () => {
      emit("close");
    };

    const onDelete = () => {
      emit("Delete");
    };

    return {
      onClose,
      onDelete,
    };
  },
};
</script>

<style lang="sass" scoped></style>
