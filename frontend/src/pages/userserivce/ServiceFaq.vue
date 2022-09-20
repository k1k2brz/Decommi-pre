<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title purple-color">FAQ</span>입니다.
      </div>
      <div class="home-title">무엇을 도와드릴까요?</div>
    </div>
  </div>
  <div>
    <div class="d-flex">
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
  <div>
    <i class="bi bi-chevron-double-left"></i>
    <i class="bi bi-chevron-left"></i>
    <span>page</span>
    <i class="bi bi-chevron-right"></i>
    <i class="bi bi-chevron-double-right"></i>
  </div>
  <div class="input-group mb-3">
    <button type="button" class="btn btn-outline-secondary">제목</button>
    <button
      type="button"
      class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">제목</a></li>
      <li><a class="dropdown-item" href="#">내용</a></li>
      <li><a class="dropdown-item" href="#">제목+내용</a></li>
    </ul>
    <input
      type="text"
      class="form-control"
      aria-label="Text input with segmented dropdown button"
    />
    <button>검색</button>
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
</style>
