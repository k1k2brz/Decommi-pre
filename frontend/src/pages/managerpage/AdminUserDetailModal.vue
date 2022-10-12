<template>
  <div
    class="modal fade"
    :id="'userDetailModal' + info.mid"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    :aria-labelledby="'userDetailModal' + info.mid + 'Label'"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5>{{ info.id }}의 회원 정보</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex flex-column gap-3">
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="useremail"
              :placeholder="info.email"
              v-model="info.email"
              required
            />
            <label for="mid">이메일</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="username"
              :placeholder="info.id"
              v-model="info.id"
              required
            />
            <label for="username">아이디</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="regdate"
              :placeholder="info.regDate"
              v-model="info.regDate"
              required
            />
            <label for="regdate">가입일</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="userauth"
              :placeholder="info.auth"
              v-model="info.auth"
              required
            />
            <label for="userauth">관리자 권한</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="question1"
              :placeholder="info.q1"
              v-model="info.q1"
              required
            />
            <label for="question1">가입 질문1</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="quetion2"
              :placeholder="info.q2"
              v-model="info.q2"
              required
            />
            <label for="quetion2">가입 질문2</label>
          </form>
          <form class="form-floating">
            <input
              class="form-control"
              type="text"
              id="quetion3"
              :placeholder="info.q3"
              v-model="info.q3"
              required
            />
            <label for="quetion3">가입 질문3</label>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="modifyUser">
            정보 수정
          </button>
          <button type="button" class="btn btn-danger" @click="DeleteUser">
            회원 삭제
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import router from "@/router";
import store from "@/store";
import axios from "axios";
import { defineProps, reactive } from "vue";
// console.log(info.regDate);

let info = reactive({
  dtoList: null,
});
info = props.info;
let props = defineProps(["info"]);
const headers = {
  "Content-Type": "application/json;",
  Authorization: store.state.users.me.token,
  mid: store.state.users.me.mid,
};
function modifyUser() {
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/usermanagement/modify",
      info,
      { headers }
    )
    .then(function (res) {
      res.data == true ? router.go(0) : alert("업데이트실패");
    });
}
function DeleteUser() {
  console.log(props.info);
  axios
    .post(
      store.state.axiosLinkAdmin + "/decommi/api/admin/usermanagement/delete",
      props.info,
      { headers }
    )
    .then(function (res) {
      res.data == true ? router.go(0) : alert("업데이트실패");
    });
}
</script>
<style lang="sass">
label
    text-align: left
.modal-body
    margin-left: 0.2rem
    &::-webkit-scrollbar
        width: 0.2rem
        background-color: lightgray
    &::-webkit-scrollbar-thumb
        background-color: black
</style>
