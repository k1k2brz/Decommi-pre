<template>
  <div class="pr-2">
    <button @click="onModal" class="btn-icon">
      <div v-if="bmReport" class="bi bi-megaphone-fill icon-purple"></div>
      <div v-else class="bi bi-megaphone"></div>
    </button>
  </div>
  <div v-if="!report" class="position-relative">
    <div
      class="d-flex flex-column box-shadow position-absolute report zindex p-3 gap-2"
    >
      <div>
        <!-- style="margin: auto" -->
        <span class="bold">신고하기</span>
      </div>
      <div class="stroke-default"></div>
      <div class="gap-2 mt-1 d-flex flex-column justify-content-center">
        <span> 이 다이어리의 어떤 점이 문제인가요? </span>
        <select v-model="selectReport" class="mt-2">
          <option disabled value="pso">Please select one</option>
          <option :value="{ report: '스팸이거나 의심스럽습니다.' }">
            스팸이거나 의심스럽습니다.
          </option>
          <option
            :value="{
              report: '민감한 내용또는 사진을 보여주고 있습니다.',
            }"
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
            :value="{
              report: '자해 또는 자살 의도를 표현하고 있습니다.',
            }"
          >
            자해 또는 자살 의도를 표현하고 있습니다.
          </option>
          <option :value="{ report: '기타 의견.' }">기타 의견.</option>
        </select>
        <textarea
          v-model="textareaReport"
          class="textarea mt-2"
          cols="35"
          rows="8"
        ></textarea>
      </div>
      <button @click="sendReport" class="btn-regular">신고하기</button>
    </div>
  </div>
  <div v-if="sendReportCheck" class="report position-relative">
    <div
      class="position-absolute bm-container bookmarks flex-wrap bg-white d-flex box-shadow p-3"
    >
      <span class="ml-3 mr-3 d-flex">신고가 완료되었습니다.</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const textareaReport = ref("");
    const sendReportCheck = ref(false);
    const selectReport = ref("");
    const report = ref(true);
    const bmReport = ref(false);

    const onModal = () => {
      if (bmReport.value == false) {
        bmReport.value = true;
        report.value = false;
        // store.state.posts.bookmarkSave = false;
      } else if (bmReport.value == true) {
        bmReport.value = false;
        report.value = true;
      }
    };

    const sendReport = () => {
      console.log(textareaReport.value);
      console.log(selectReport.value.report);
      textareaReport.value = "";
      selectReport.value = "pso";
      bmReport.value = false;
      report.value = true;
      sendReportCheck.value = true;
      setTimeout(() => {
        // 마우스가 올라가 있으면 사라지지 않게 이벤트 추가
        // Fade 애니메이션 줄 것
        sendReportCheck.value = false;
      }, 5000);
    };

    return {
      textareaReport,
      sendReport,
      selectReport,
      sendReportCheck,
      report,
      onModal,
      bmReport,
    };
  },
};
</script>

<style lang="sass" scoped>
.bm-container
    width: 220px

.icon-purple
    color: #AE6FFF

.bg-white
  background-color: white

.zindex
  z-index: 10
  background-color: white

.report
  top: 30px
  left: -25px
  background-color: white

.textarea
  border: 1px solid #D8D8D8
  resize: none
</style>
