<template>
  <button
    @click="onRemoveBtn"
    type="button"
    class="reportBtn"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    삭제하기
  </button>
  <button
    @click="onEditBtn"
    type="button"
    class="reportBtn"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    수정하기
  </button>
  <!-- Modal -->
  <!-- <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style="z-index: 9999"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">삭제하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          삭제한 다이어리는 복구할 수 없습니다. 정말로 삭제하시겠습니까?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            취소
          </button>
          <button type="button" class="btn btn-primary">삭제하기</button>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
export default {
  setup() {
    // vuex로 신고버튼 누르면 신고창 닫히게
    const onRemoveBtn = () => {};
    const onEditBtn = () => {};

    return { onRemoveBtn, onEditBtn };
  },
};
</script>
<style lang="sass" scoped></style>
