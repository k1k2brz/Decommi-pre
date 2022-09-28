<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title purple-color">질문하기</span>
      </div>
      <div class="home-title">무엇을 도와드릴까요?</div>
    </div>
  </div>
  <div class="mb-3 d-flex justify-content-center gap-3">
    <div class="d-flex">
      <select class="form-select form-control" id="inputGroupSelect02">
        <option value="1">제목</option>
        <option value="2">내용</option>
        <option value="3">제목+내용</option>
      </select>
    </div>
    <input type="text" class="form-control" />
  </div>
  <div class="form-floating">
    <textarea
      class="form-control"
      placeholder="Leave a comment here"
      id="floatingTextarea2"
      v-model="message"
    />
    <label for="floatingTextarea2">Comments</label>
  </div>
  <div class="d-flex mt-4 gap-3">
    <button :disabled="message.length < 1" class="btn-regular">작성완료</button>
    <button class="btn-regular grey">뒤로가기</button>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  setup() {
    const message = ref("");

    return {
      message,
    };
  },
};
</script>

<style lang="sass" scoped>
textarea
  height: 400px !important
  resize: none
  &:focus
    box-shadow: none

.btn-regular
  font-size: 20px
  padding: 10px 14px

.grey
  background-color: lightgrey

.disabled-btn
  background-color: lightgrey
</style>
