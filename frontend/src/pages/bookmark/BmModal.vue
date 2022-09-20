<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      class="new-folder"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      + 새 북마크 폴더
    </button>
    <div v-if="showModal" class="modal fade" id="exampleModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">새 북마크 추가</h5>
            <button @click="btnCancel" class="btn-close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label"
                  >폴더명</label
                >
                <input
                  v-model="bookmarkValue"
                  type="text"
                  class="form-control"
                  id="recipient-name"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button @click="addBookmark" type="button" class="btn btn-primary">
              북마크 추가
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    const bookmarkValue = ref("");
    let bmTags = reactive([]);

    const addBookmark = () => {
      if (!bookmarkValue.value == "") {
        bmTags.push(bookmarkValue.value);
        bookmarkValue.value = "";
      }
    };

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
      bookmarkValue,
      bmTags,
      addBookmark,
    };
  },
};
</script>

<style lang="sass" scoped></style>
