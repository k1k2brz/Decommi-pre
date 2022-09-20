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
    <div class="mt-3">
      <div class="mb-3 d-flex justify-content-center gap-3">
        <input
          type="text"
          class="form-control serviceSearch"
          aria-label="Text input with segmented dropdown button"
        />
        <button class="btn-regular">검색</button>
        <div class="d-flex">
          <select class="form-select form-control" id="inputGroupSelect02">
            <option value="1">제목</option>
            <option value="2">내용</option>
            <option value="3">제목+내용</option>
          </select>
        </div>
      </div>
      <div class="bg p-4">
        <div class="grid justify-content-center align-items-center mb-3">
          <span>번호</span>
          <span>이름</span>
          <span>아이디</span>
          <span>이메일</span>
          <span>방문수</span>
          <span>가입일</span>
          <span>기능</span>
        </div>
        <div class="grid">
          <span>1</span>
          <span>사용자</span>
          <span>decomi</span>
          <span>decomi@email.com</span>
          <span>1000</span>
          <span>2022-01-01</span>
          <div class="d-flex gap-2">
            <button>수정</button>
            <button>삭제</button>
          </div>
        </div>
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
  grid-template-columns: repeat(7, 1fr)
</style>
