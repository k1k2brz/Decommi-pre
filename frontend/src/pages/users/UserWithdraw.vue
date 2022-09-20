<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      type="button"
      class="btn-regular-round"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      회원탈퇴
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">회원탈퇴</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label mb-1 ml-2"
                >한 번 탈퇴한 계정은 복구 할 수 없습니다.</label
              >
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="비밀번호를 입력해주세요."
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button type="button" class="btn btn-primary">회원탈퇴</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const showModal = ref(true);
    const btnCancel = () => {
      if (showModal.value == true) {
        showModal.value = false;
      }
      showModal.value = true;
    };

    return {
      btnCancel,
      showModal,
    };
  },
};
</script>

<style lang="sass" scoped>
.modal-dialog
    margin-top: 300px
</style>
