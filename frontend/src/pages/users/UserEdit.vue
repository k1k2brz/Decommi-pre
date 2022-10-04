<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">회원정보 수정</span>
    </div>
    <div>
      <hr />
      <div class="edit-grid">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">이름</div>
        </div>
        <div class="bold mt-3 mb-3 ml-4">홍길동</div>
        <div class="btn-end d-flex justify-content-end">
          <div class="d-flex justify-content-center align-items-center">
            <Withdraw />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div>
      <div class="edit-grid2">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">아이디</div>
        </div>
        <div class="bold mt-3 mb-3 ml-4">{{ me.id }}</div>
      </div>
    </div>
    <hr />
    <div>
      <div v-if="emailChange" class="edit-grid2">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">이메일</div>
        </div>
        <div class="d-flex flex-column gap-3 ml-4 mb-3">
          <div class="bold mt-3">{{ me.email }}</div>
          <div>
            <div class="d-flex">
              <div class="orange-box pt-1 pb-1 pr-5 d-flex">
                <span class="email-check ml-2">인증된 이메일 주소입니다.</span>
              </div>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <button @click="emailBtn" class="btnChange">이메일 변경</button>
          </div>
        </div>
      </div>
      <div v-else class="edit-grid2">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">이메일</div>
        </div>
        <div class="d-flex flex-column gap-2 ml-4 mb-3">
          <input
            @keyup.enter="changeEditEmail"
            v-model="edit.email"
            @input="edit.email"
            type="email"
            class="mt-3 input-box form-control"
            placeholder="변경할 Email을 입력해주세요."
          />
          <div>
            <span class="change-email-text ml-2"
              >이메일 주소를 인증하시면 변경이 완료됩니다.</span
            >
          </div>
          <div class="d-flex align-items-center mt-2">
            <button
              @click="changeEditEmail"
              :disabled="me.email == edit.email"
              :class="{
                btnChange: me.email != edit.email,
                btnChangeDisalbed:
                  me.email == edit.email || edit.email.trim().length == 0,
              }"
            >
              변경 확인
            </button>
            <button @click="cancelBtn" class="ml-1 btnChange">취소</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
    <div>
      <div class="edit-grid2">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">비밀번호 변경</div>
        </div>
        <div class="d-flex flex-column gap-2 ml-4">
          <!-- <input
            maxlength="16"
            v-model="edit.nowpass"
            class="mt-3 pass-input input-box form-control"
            type="password"
            placeholder="현재 비밀번호"
          />
          <span v-if="edit.nowpassError" class="font14 ml-2"
            >비밀번호가 맞지 않습니다.</span
          > -->
          <input
            maxlength="16"
            v-model="edit.newpass"
            class="pass-input input-box form-control"
            type="password"
            placeholder="새 비밀번호"
          />
          <span v-if="edit.newpassError" class="font14 ml-2"
            >비밀번호를 다시 확인해주세요.</span
          >
          <input
            maxlength="16"
            v-model="edit.newrepass"
            class="pass-input input-box form-control"
            type="password"
            placeholder="새 비밀번호 확인"
          />
          <span v-if="edit.newrepassError" class="font14 ml-2"
            >비밀번호가 맞지 않습니다.</span
          >
          <div>
            <span class="text-sm bold">비밀번호 변경시 유의사항</span>
            <ul class="text-sm">
              <li>8자 이상 영문/숫자/특수문자중 2가지 이상을 입력해주세요.</li>
              <li>ID와 같은 비밀번호는 사용할 수 없습니다.</li>
            </ul>
          </div>
          <div class="d-flex align-items-center mb-3">
            <button @click.prevent="passSubmit()" class="btnChange">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="edit-grid2">
      <div class="purple-box d-flex justify-content-end">
        <div class="mt-3 mb-3 mr-3">계정 연동 여부</div>
      </div>
      <div class="d-flex gap-3 ml-4 align-items-center">
        <div class="bi bi-bookmark-fill"></div>
        <div class="bi bi-heart"></div>
        <div class="bi bi-share-fill"></div>
        <div class="bi bi-chat-dots"></div>
      </div>
    </div>
    <hr />
    <div>
      <div class="edit-grid2">
        <div class="purple-box d-flex justify-content-end">
          <div class="mt-3 mb-3 mr-3">DeCommi소식 받기</div>
        </div>
        <div class="d-flex flex-column gap-3 ml-4 mb-3">
          <div class="mt-3">
            <input type="checkbox" />
            <span class="ml-2">이메일 구독</span>
            <span class="text-sm ml-2 text-grey">(거부일:2022.01.01)</span>
          </div>
          <div class="d-flex align-items-center">
            <button class="btnChange">수신 변경</button>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import Withdraw from "@/pages/users/UserWithdraw.vue";
// import { useRouter } from "vue-router";
import { ref } from "vue";
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import axios from "axios";

export default {
  components: {
    Withdraw,
  },
  setup() {
    const store = useStore();
    // const router = useRouter();

    const me = computed(() => {
      return store.state.users.me;
    });

    let edit = reactive({
      nowpass: "",
      newpass: "",
      newrepass: "",
      nowpassError: false,
      newpassError: false,
      newrepassError: false,
      email: store.state.users.me.email,
    });
    const emailChange = ref(true);
    const emailBtn = () => {
      if (emailChange.value == true) {
        emailChange.value = false;
      }
    };

    const cancelBtn = () => {
      if (emailChange.value == false) {
        emailChange.value = true;
      }
    };

    const passSubmit = async () => {
      // if (edit.nowpass !== store.state.users.me.pass) {
      //   edit.nowpassError = true;
      //   edit.newpassError = false;
      //   edit.newrepassError = false;
      //   return;
      // } else
      if (
        edit.newpass.trim().length == 0 ||
        edit.newpass === store.state.users.me.pass
      ) {
        edit.newpassError = true;
        edit.nowpassError = false;
        edit.newrepassError = false;
        return;
      } else if (edit.newpass !== edit.newrepass) {
        edit.newrepassError = true;
        edit.nowpassError = false;
        edit.newpassError = false;
        return;
      }
      try {
        const url = "/decommi/member/checkpw";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          mid: store.state.users.me.mid,
          pw: edit.newpass,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
      alert("비밀번호가 변경되었습니다.");
      edit.nowpassError = false;
      edit.newpassError = false;
      edit.newrepassError = false;
      edit.nowpass = "";
      edit.newpass = "";
      edit.newrepass = "";
    };

    const changeEditEmail = () => {
      if (edit.email === "") {
        alert("error");
      } else {
        store.dispatch("users/changeEmail", {
          email: edit.email,
        });
        emailChange.value = true;
      }
    };

    return {
      me,
      emailChange,
      emailBtn,
      cancelBtn,
      edit,
      passSubmit,
      changeEditEmail,
    };
  },
};
</script>

<style lang="sass" scoped>
.stroke-default
    margin: 0 !important
    z-index: 100 !important
.edit-grid
    display: grid
    grid-template-columns: repeat(5, 1fr)
.edit-grid2
    display: grid
    grid-template-columns: 20% 80%
.stroke-top
    border-top: 0.5px solid #D8D8D8
.stroke-bottom
    border-bottom: 0.5px solid #D8D8D8
.btn-end
    grid-column: 5
    font-size: 16px
.orange-box
    background-color: #FFEEE2
.email-check
    font-size: 13px
.input-box
    border: 0.5px solid #D8D8D8
.text-sm
    font-size: 13px
    margin: 0
.text-grey
    color: #B4B4B4
.change-email-text
    color: grey
    font-size: 14px

.pass-input
  width: 350px

hr
  margin: 0
  padding: 0
  font-size: 0.5px
  background-color: grey
</style>
