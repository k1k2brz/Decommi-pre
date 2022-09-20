<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title">태그찾기</span>
      </div>
      <div class="mb-5 mt-1">관심있는 태그를 찾아보세요!</div>
    </div>
  </div>
  <div>
    <div class="d-flex gap-3">
      <router-link class="nav-link mr-3" :to="{ name: 'PopularTag' }"
        >인기태그</router-link
      >
      <div>
        <router-link class="nav-link mr-3" :to="{ name: 'RecommendTag' }"
          >맞춤 추천태그</router-link
        >
        <div class="purple mt-1"></div>
      </div>
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
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
hr
    margin: 0
    padding: 0

.purple-box
    padding: 40px 30px

.purple
    background-color: #AE6EFF
    width: 106px
    height: 8px

.nav-link
    font-size: 18px
    font-weight: 500
</style>
