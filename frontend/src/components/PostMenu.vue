<template>
  <div class="d-flex flex-column">
    <button
      @click.stop="
        dropdownToggle.reportToggle.value = !dropdownToggle.reportToggle.value
      "
      class="btn-icon bi bi-three-dots d-flex justify-content-end"
    ></button>
    <div>
      <div
        v-if="dropdownToggle.reportToggle.value"
        @blur="close"
        class="reportBtn-shadow report-location position-absolute"
      >
        <div class="d-flex flex-column">
          <!-- 본인의 포스팅일시 (email을 받아서) v-if로 보이는거 다르게 -->
          <button
            @click="onEditBtn"
            type="button"
            class="reportBtn reportBtnHover"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            수정하기
          </button>
          <button
            @click="onRemoveBtn"
            type="button"
            class="reportBtn reportBtnHover"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";

export default {
  props: {
    onEditBtn: {
      required: true,
    },
    onRemoveBtn: {
      required: true,
    },
  },
  setup() {
    const dropdownToggle = {
      reportToggle: ref(false),
      close: () => {
        dropdownToggle.reportToggle.value = false;
      },
    };
    onBeforeUnmount(() => {
      document.removeEventListener("click", dropdownToggle.close);
    });

    onMounted(() => {
      document.addEventListener("click", dropdownToggle.close);
    });

    const reportContent = () => {
      dropdownToggle.reportToggle.value = !dropdownToggle.reportToggle.value;
    };

    return { dropdownToggle, reportContent };
  },
};
</script>

<style lang="sass" scoped>
.report-location
  right: 30px
  z-index: 10
  background-color: white
</style>
