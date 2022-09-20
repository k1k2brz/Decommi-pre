<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title purple-color">고객센터</span>입니다.
      </div>
      <div class="home-title">무엇을 도와드릴까요?</div>
    </div>
  </div>
  <div>
    <div class="d-flex gap-3">
      <router-link class="nav-link mr-3" :to="{ name: 'ServiceNotice' }"
        >공지사항</router-link
      >
      <router-link class="nav-link mr-3" :to="{ name: 'ServiceFaq' }"
        >FAQ</router-link
      >
      <router-link class="nav-link mr-3" :to="{ name: 'ServiceQuestion' }"
        >질문내역</router-link
      >
    </div>
    <div class="purple mt-1"></div>
    <hr />
  </div>
  <div class="purple-box">
    <div class="d-flex justify-content-between mb-2">
      <span>카테고리</span>
      <span>글제목</span>
      <span>작성일</span>
      <span>조회수</span>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex justify-content-between">
          <span class="red bold">업데이트</span>
          <span>2022.08.12 일부 기능 리뉴얼 관련 공지사항</span>
          <span>2022.08.12</span>
          <span>202</span>
        </div>
      </div>
    </div>
  </div>
  <div class="m-3 d-flex justify-content-center">
    <i class="bi bi-chevron-double-left"></i>
    <i class="bi bi-chevron-left"></i>
    <span>page</span>
    <i class="bi bi-chevron-right"></i>
    <i class="bi bi-chevron-double-right"></i>
  </div>
  <div class="mb-3 d-flex justify-content-center gap-3">
    <div class="d-flex">
      <select class="form-select form-control" id="inputGroupSelect02">
        <option value="1">제목</option>
        <option value="2">내용</option>
        <option value="3">제목+내용</option>
      </select>
    </div>
    <input
      type="text"
      class="form-control serviceSearch"
      aria-label="Text input with segmented dropdown button"
    />
    <button class="btn-regular">검색</button>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return { store };
  },
};
</script>

<style lang="sass" scoped>
hr
    margin: 0
    padding: 0

.purple-box
    padding: 40px 30px

.purple
    background-color: #AE6EFF
    width: 70px
    height: 8px

.nav-link
    font-size: 18px
    font-weight: 500

.serviceSearch
    width: 400px

.btn-regular
    width: 65px
</style>
