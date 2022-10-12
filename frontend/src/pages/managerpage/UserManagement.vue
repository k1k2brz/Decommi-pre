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
      <div class="searching-area d-flex gap-2">
        <select
          class="form-select w-50"
          aria-label="useroptions"
          v-model="serchingInfo.type"
        >
          <option value="id">아이디</option>
          <option value="mail">이메일</option>
        </select>
        <input
          class="form-control"
          type="text"
          v-model="serchingInfo.keyword"
        />
        <button
          class="btn btn-primary"
          style="white-space: nowrap"
          @click="getSearchingList"
        >
          검색
        </button>
      </div>

      <div class="bg p-4">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">회원번호</th>
              <th scope="col">이메일</th>
              <th scope="col">아이디</th>
              <th scope="col">가입일</th>
              <th scope="col">기능</th>
            </tr>
          </thead>

          <tbody class="w-100">
            <tr v-for="dto in userInfo.dtoList" :key="dto" class="w-100">
              <td>{{ dto.mid }}</td>
              <td>{{ dto.email }}</td>
              <td>{{ dto.id }}</td>
              <td>{{ dto.regDate }}</td>
              <td>{{ dto.userIntro }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  :data-bs-target="`#userDetailModal${dto.mid}`"
                >
                  관리
                </button>
              </td>
              <AdminUserDetailModal :info="dto"></AdminUserDetailModal>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page">
          <ul class="pagination">
            <li class="page-item">
              <a
                class="page-link"
                @click="getUserList(userInfo.page - 1)"
                v-if="userInfo.page != 1"
                >Previous</a
              >
            </li>
            <li
              :class="userInfo.page == page ? 'page-item active' : 'page-item'"
              v-for="page in userInfo.pageList"
              :key="page"
            >
              <a class="page-link" @click="getUserList(page)">{{ page }}</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="getUserList(userInfo.page + 1)"
                v-if="userInfo.page != userInfo.totalPage"
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
import AdminUserDetailModal from "./AdminUserDetailModal.vue";

// let page = new URLSearchParams(window.location.search).get("page")
// let type = new URLSearchParams(window.location.search).get("type")

let userInfo = reactive({
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

const headers = {
  "Content-Type": "application/json;",
  Authorization: store.state.users.me.token,
  mid: store.state.users.me.mid,
};
let serchingInfo = reactive({
  keyword: "",
  type: "id",
});

function getUserList(page) {
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/usermanagement",
      { page: page, keyword: serchingInfo.keyword, type: serchingInfo.type },
      { headers }
    )
    .then(function (res) {
      (userInfo.dtoList = res.data.dtoList),
        (userInfo.end = res.data.end),
        (userInfo.next = res.data.next),
        (userInfo.page = res.data.page),
        (userInfo.pageList = res.data.pageList),
        (userInfo.prev = res.data.prev),
        (userInfo.size = res.data.size),
        (userInfo.start = res.data.start),
        (userInfo.totalPage = res.data.totalPag);
    });
}
axios
  .post(
    store.state.axiosLinkAdmin + "/decommi/api/admin/usermanagement",
    { page: 1 },
    { headers }
  )
  .then(function (res) {
    (userInfo.dtoList = res.data.dtoList),
      (userInfo.end = res.data.end),
      (userInfo.next = res.data.next),
      (userInfo.page = res.data.page),
      (userInfo.pageList = res.data.pageList),
      (userInfo.prev = res.data.prev),
      (userInfo.size = res.data.size),
      (userInfo.start = res.data.start),
      (userInfo.totalPage = res.data.totalPag);
    console.log(res);
  });

function getSearchingList() {
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/usermanagement",
      { page: 1, keyword: serchingInfo.keyword, type: serchingInfo.type },
      { headers }
    )
    .then(function (res) {
      (userInfo.dtoList = res.data.dtoList),
        (userInfo.end = res.data.end),
        (userInfo.next = res.data.next),
        (userInfo.page = res.data.page),
        (userInfo.pageList = res.data.pageList),
        (userInfo.prev = res.data.prev),
        (userInfo.size = res.data.size),
        (userInfo.start = res.data.start),
        (userInfo.totalPage = res.data.totalPag);
    });
}
</script>

<style lang="sass" scoped>
.white-space
  white-space: nowrap

.grid
  display: grid
  grid-template-columns: repeat(7, 1fr)
</style>
