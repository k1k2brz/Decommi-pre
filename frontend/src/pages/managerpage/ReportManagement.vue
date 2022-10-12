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
          <router-link class="nav-link ml-4" :to="{ name: 'ReportManagement' }"
            >신고 관리</router-link
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
      <div class="bg p-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">신고 번호</th>
              <th scope="col">작성자</th>
              <th scope="col">신고 제목</th>
              <th scope="col">신고 내용</th>
              <th scope="col">다이어리 번호</th>
              <th scope="col">신고 당한 글</th>
              <th scope="col">신고 취소</th>
              <th scope="col">글 삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dto in reportInfo.dtoList" :key="dto" class="w-100">
              <td>{{ dto.reid }}</td>
              <td>{{ dto.mid }}</td>
              <td>{{ dto.title }}</td>
              <td>{{ dto.reportContent }}</td>
              <td>{{ dto.dino }}</td>
              <td>
                <a :href="'../read?id=' + dto.dino"
                  ><button class="btn btn-primary">다이어리 보기</button></a
                >
              </td>
              <td>
                <button class="btn btn-warning" @click="reportCancel(dto.reid)">
                  신고 취소
                </button>
              </td>
              <td>
                <button class="btn btn-danger" @click="diaryDelete(dto.dino)">
                  다이어리 삭제
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                @click="getUserList(reportInfo.page - 1)"
                v-if="reportInfo.page != 1"
                >Previous</a
              >
            </li>
            <li
              :class="
                reportInfo.page == page ? 'page-item active' : 'page-item'
              "
              v-for="page in reportInfo.pageList"
              :key="page"
            >
              <a class="page-link" @click="getUserList(page)">{{ page }}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="getUserList(reportInfo.page + 1)"
                v-if="reportInfo.page != reportInfo.totalPage"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import axios from "axios";
import store from "@/store";
import router from "@/router";
const headers = {
  "Content-Type": "application/json;",
  Authorization: store.state.users.me.token,
  mid: store.state.users.me.mid,
};

function diaryDelete(num) {
  let body = { dino: num };
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/diarymanagement/delete",
      body,
      { headers }
    )
    .then(function (res) {
      res.data == true ? router.go(0) : alert("삭제실패");
    });
}
function reportCancel(num) {
  let body = { reid: num };
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/reportmanagement/delete",
      body,
      { headers }
    )
    .then(function (res) {
      res.data == true ? router.go(0) : alert("삭제실패");
    });
}

let reportInfo = reactive({
  dtoList: null,
  end: null,
  next: null,
  page: null,
  pageList: null,
  prev: null,
  size: null,
  start: null,
  totalPage: null,
});

function getUserList(page) {
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/reportmanagement",
      { page: page },
      { headers }
    )
    .then(function (res) {
      (reportInfo.dtoList = res.data.dtoList),
        (reportInfo.end = res.data.end),
        (reportInfo.next = res.data.next),
        (reportInfo.page = res.data.page),
        (reportInfo.pageList = res.data.pageList),
        (reportInfo.prev = res.data.prev),
        (reportInfo.size = res.data.size),
        (reportInfo.start = res.data.start),
        (reportInfo.totalPage = res.data.totalPag);
      console.log(res);
    });
}
axios
  .post(
    store.state.axiosLinkAdmin + "/decommi/api/admin/reportmanagement",
    { page: 1 },
    { headers }
  )
  .then(function (res) {
    console.log(res);
    (reportInfo.dtoList = res.data.dtoList),
      (reportInfo.end = res.data.end),
      (reportInfo.next = res.data.next),
      (reportInfo.page = res.data.page),
      (reportInfo.pageList = res.data.pageList),
      (reportInfo.prev = res.data.prev),
      (reportInfo.size = res.data.size),
      (reportInfo.start = res.data.start),
      (reportInfo.totalPage = res.data.totalPag);
  });
</script>

<style lang="sass" scoped>
.white-space
  white-space: nowrap

.grid
  display: grid
  grid-template-columns: 1fr 1fr 2fr 1fr 2fr 1fr 1fr 1fr
</style>
