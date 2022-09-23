<template>
  <!-- <button @click="reportBtn" class="reportBtn">
        <span class="reportBtn-text">신고하기</span>
    </button>
    <div v-if="reportModal" class="reportModal position-relative">
        <div class="d-flex justify-content-center position-absolute">
            <div class="report-box p-3">
                <span>신고하기</span>
            </div>
        </div>
    </div> -->
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="false"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">신고하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="gap-2">
            <span> 이 다이어리의 어떤 점이 문제인가요? </span>
            <select>
              <option disabled value="">Please select one</option>
              <option :value="{ report: '스팸이거나 의심스럽습니다.' }">
                스팸이거나 의심스럽습니다.
              </option>
              <option
                :value="{ report: '민감한 내용또는 사진을 보여주고 있습니다.' }"
              >
                민감한 내용또는 사진을 보여주고 있습니다.
              </option>
              <option :value="{ report: '가학적이거나 유해한 내용입니다.' }">
                가학적이거나 유해한 내용입니다.
              </option>
              <option :value="{ report: '사실을 오도하고 있습니다.' }">
                사실을 오도하고 있습니다.
              </option>
              <option
                :value="{ report: '자해 또는 자살 의도를 표현하고 있습니다.' }"
              >
                자해 또는 자살 의도를 표현하고 있습니다.
              </option>
              <option :value="{ report: '기타 의견.' }">기타 의견.</option>
            </select>
            <textarea class="textarea" cols="30" rows="10"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  // props로 보내기
  setup() {
    const reportModal = ref(false);

    // vuex로 신고버튼 누르면 신고창 닫히게
    const reportBtn = () => {
      reportModal.value == false
        ? (reportModal.value = true)
        : (reportModal.value = false);
    };

    return {
      reportBtn,
      reportModal,
    };
  },
};
</script>
<style lang="sass" scoped>
.position-absolute
    right: 100px

.textarea
    resize: none
    &:focus
        box-shadow: none
</style>
