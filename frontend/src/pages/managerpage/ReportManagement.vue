<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">관리자페이지</span>
    </div>
  </div>
  <div class="d-flex gap-5 white-space">
    <div class="d-flex mt-3">
      <div class="manager-nav d-flex flex-column gap-1">
        <div class="d-flex">
          <i class="bi bi-gear-fill"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'ManagerPage' }"
            >관리자페이지 홈</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-calendar4-week"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'DashBoard' }"
            >대시보드</router-link
          >
        </div>
        <hr />
        <div>
          <i class="bi bi-person-lines-fill"></i>
          <span class="ml-2">회원관리</span>
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'UserManagement' }"
            >회원 정보 관리</router-link
          >
        </div>
        <hr />
        <div>
          <i class="bi bi-grid-3x3-gap-fill"></i>
          <span class="ml-2">게시물 관리</span>
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'TagManagement' }"
            >태그 관리</router-link
          >
        </div>
        <div class="d-flex">
          <router-link class="nav-link ml-4" :to="{ name: 'ReportManagement' }"
            >신고 관리</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-reception-4"></i>
          <router-link
            class="nav-link ml-2"
            :to="{ name: 'StatisticsManagement' }"
            >통계</router-link
          >
        </div>
        <hr />
        <div class="d-flex">
          <i class="bi bi-reply-fill"></i>
          <router-link class="nav-link ml-2" :to="{ name: 'Main' }"
            >메인 페이지로 이동</router-link
          >
        </div>
      </div>
    </div>
    <div class="mt-3" style="width: 100%">
      <div class="purple-box">
        <div class="d-flex justify-content-between mb-2">
          <span>카테고리</span>
          <span>글제목</span>
          <span>신고사유</span>
          <span>작성자</span>
          <span>등록일자</span>
          <span>신고횟수</span>
        </div>
        <div class="d-flex flex-column gap-2" v-for="i in 10" :key="i">
          <div class="d-flex flex-column gap-2">
            <hr />
            <div class="d-flex justify-content-between">
              <span class="red bold">다이어리</span>
              <span>개인정보유출 할 것 같은 제목</span>
              <span>불법정보</span>
              <span>@id123213124</span>
              <span>2022.09.01</span>
              <span>123</span>
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
    </div>
  </div>
</template>

<script></script>

<style lang="sass" scoped>
.white-space
  white-space: nowrap

.grid
  display: grid
  grid-template-columns: 1fr 1fr 2fr 1fr 2fr 1fr 1fr 1fr
</style>
