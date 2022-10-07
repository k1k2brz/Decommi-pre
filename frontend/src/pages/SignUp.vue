<template>
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <div class="q-pa-md">
      <div class="backgrondBox p-5">
        <div class="d-flex justify-content-center">
          <h1 class="home-title mb-4">SIGN-UP</h1>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="check"
            ref="email"
            type="text"
            v-model="info.email"
            class="form-control"
            placeholder="이메일을 입력해주세요."
            aria-describedby="emailHelp"
          />
          <div v-show="idError" class="font14 mt-1 ml-2">
            Email이 올바르지 않습니다.
          </div>
          <div v-show="info.idDuplicate" class="font14 mt-1 ml-2">
            이미 존재하는 Email입니다.
          </div>
          <button
            class="btn btn-outline-primary w-100 mt-3"
            @click.self="check"
          >
            중복 확인
          </button>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="onSubmitForm"
            ref="pass"
            type="password"
            v-model="info.pass"
            class="form-control"
            placeholder="비밀번호를 입력해주세요."
          />
          <div v-show="passError" class="font14 mt-1 ml-2">
            비밀번호를 입력해주세요.
          </div>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="onSubmitForm"
            ref="repass"
            type="password"
            v-model="info.repass"
            class="form-control"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <div v-show="repassError" class="font14 mt-1 ml-2">
            비밀번호가 일치하지 않습니다.
          </div>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="idcheck"
            ref="id"
            type="email"
            v-model="info.id"
            class="form-control"
            placeholder="id메일을 입력해주세요."
            aria-describedby="emailHelp"
          />
          <div v-show="emailError" class="font14 mt-1 ml-2">
            id메일을 입력해주세요.
          </div>
          <button
            class="btn btn-outline-primary w-100 mt-3"
            @click.self="idcheck"
          >
            중복 확인
          </button>
        </div>

        <!-- <div class="mb-3">
            <input
              type="text"
              v-model="info.certify"
              class="form-control"
              placeholder="인증번호를 입력해주세요."
              aria-describedby="emailHelp"
            />
            <div v-show="secuError" class="font14 mt-1 ml-2">
              Email을 입력해주세요.
            </div>
            <div id="emailHelp" class="form-text">
              10분 이내 메일이 도착하지 않으면 다시 시도해주세요.
            </div>
          </div> -->
        <!-- <div class="mb-3">
            <select class="form-select" v-model="info.selectedItem" @change="change">
              <option selected disabled>질문을 선택해주세요.</option>
              <option v-for="each in info.items" :key="each" v-text="each" :value="each"></option>
            </select>
          </div>
          <div v-if="questionInput" class="mb-3">
            <input v-model="info.answer" class="form-control" type="text" placeholder="질문을 입력해주세요." />
            <div v-show="answerError" class="font14 mt-1 ml-2">
              질문을 입력해주세요.
            </div>
          </div> -->

        <div class="mb-3">
          <input
            @keyup.enter="onSubmitForm"
            ref="q1"
            type="text"
            v-model="info.q1"
            class="form-control"
            placeholder="인상 깊게 읽은 책 이름은??"
          />
          <div v-show="q1Error" class="font14 mt-1 ml-2">
            답변이 올바르지 않습니다.
          </div>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="onSubmitForm"
            ref="q2"
            type="text"
            v-model="info.q2"
            class="form-control"
            placeholder="나의 보물 1호는?"
            aria-describedby="emailHelp"
          />
          <div v-show="q2Error" class="font14 mt-1 ml-2">
            답변이 올바르지 않습니다.
          </div>
        </div>
        <div class="mb-3">
          <input
            @keyup.enter="onSubmitForm"
            ref="q3"
            type="text"
            v-model="info.q3"
            class="form-control"
            placeholder="기억에 남는 추억의 장소는?"
            aria-describedby="emailHelp"
          />
          <div v-show="q3Error" class="font14 mt-1 ml-2">
            답변이 올바르지 않습니다.
          </div>
        </div>
        <div
          class="d-flex justify-content-center align-items-center flex-column"
        >
          <button
            style="min-width: 302px"
            type="submit"
            class="btn-regular-full"
            @click="onSubmitForm"
          >
            회원가입
          </button>
          <div class="d-flex mt-3">
            <span> 계정이 있으신가요? </span>
            <router-link
              class="nav-link purple-color ml-1"
              :to="{ name: 'Login' }"
              >로그인</router-link
            >
          </div>
        </div>
        <!-- <div
            class="d-flex justify-content-center align-items-center pt-2 pb-2"
          >
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" >또는</div>
            <div class="LoginLine"></div>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "@/axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const idError = ref(false);
    const passError = ref(false);
    const repassError = ref(false);
    const emailError = ref(false);
    const secuError = ref(false);
    const q1Error = ref(false);
    const q2Error = ref(false);
    const q3Error = ref(false);
    const id = ref("");
    const pass = ref("");
    const repass = ref("");
    const email = ref("");
    const q1 = ref("");
    const q2 = ref("");
    const q3 = ref("");

    onMounted(() => {
      email.value.focus();
    });

    // ref로 focus()할 것
    let info = reactive({
      email: "",
      pass: "",
      repass: "",
      id: "",
      q1: "",
      q2: "",
      q3: "",
      idDuplicate: false,
      idDuplicate2: false,
      emailCheck: false,
      idCheck: false,
    });

    // 이메일인증
    const check = async () => {
      if (info.email === "") {
        email.value.focus();
        idError.value = true;
        info.idDuplicate = false;
        return;
      } else if (!(info.email.includes("@") && info.email.includes("."))) {
        email.value.focus();
        idError.value = true;
        info.idDuplicate = false;
        return;
      }
      const url = "/decommi/member/emailCheck";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = { email: info.email };
      await axios.post(url, body, { headers }).then(function (res) {
        if (res.data.result != 0) {
          email.value.focus();
          info.idDuplicate = true;
          idError.value = false;
          passError.value = false;
          repassError.value = false;
          emailError.value = false;
          q1Error.value = false;
          q2Error.value = false;
          q3Error.value = false;
          info.emailCheck = false;
        } else {
          alert("사용 가능한 이메일입니다.");
          pass.value.focus();
          info.idDuplicate = false;
          info.emailCheck = true;
        }
      });
    };

    const idcheck = async () => {
      if (info.id === "") {
        id.value.focus();
        emailError.value = true;
        info.idDuplicate2 = false;
        return;
      } else if (!(info.id.includes("@") && info.id.includes("."))) {
        id.value.focus();
        emailError.value = true;
        info.idDuplicate2 = false;
        return;
      }
      const url = "/decommi/member/idCheck";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = { id: info.id };
      console.log(body)
      await axios.post(url, body, { headers }).then(function (res) {
        console.log(res.data)
        if (res.data.result != 0) {
          id.value.focus();
          info.idDuplicate2 = true;
          idError.value = false;
          passError.value = false;
          repassError.value = false;
          emailError.value = false;
          q1Error.value = false;
          q2Error.value = false;
          q3Error.value = false;
          info.emailCheck = false;
        } else {
          alert("사용 가능한 이메일입니다.");
          q1.value.focus();
          info.idDuplicate2 = false;
          info.emailCheck = true;
        }
      });
    };

    // 회원가입
    const onSubmitForm = async () => {
      if (info.emailCheck == false) {
        info.idDuplicate = true;
        return;
      } else if (info.pass === "") {
        pass.value.focus();
        passError.value = true;
        idError.value = false;
        repassError.value = false;
        emailError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.repass === "") {
        repass.value.focus();
        repassError.value = true;
        idError.value = false;
        passError.value = false;
        emailError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.pass !== info.repass) {
        repass.value.focus();
        repassError.value = true;
        idError.value = false;
        passError.value = false;
        emailError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.id === "") {
        email.value.focus();
        emailError.value = true;
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.certify === "") {
        secuError.value = true;
        return;
      } else if (info.q1 === "") {
        q1Error.value = true;
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        emailError.value = false;
        q2Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.q2 === "") {
        q2Error.value = true;
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        emailError.value = false;
        q1Error.value = false;
        q3Error.value = false;
        return;
      } else if (info.q3 === "") {
        q3Error.value = true;
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        emailError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        return;
      }
      try {
        await store.dispatch("users/signUp", {
          // Entity와 맞출 것
          email: info.email,
          pw: info.pass,
          id: info.id,
          q1: info.q1,
          q2: info.q2,
          q3: info.q3,
        });
        await store.dispatch("users/likeTagEmail", {
          email: info.email,
        });
        // answerError.value = false;
        // store.state.me = true;
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        emailError.value = false;
        secuError.value = false;
        q1Error.value = false;
        q2Error.value = false;
        q3Error.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    function a() {
      if (store.state.users.me == null || store.state.users.me == "") {
        console.log("접근가능");
      } else {
        router.push({
          name: "Main",
        });
      }
    }

    a();

    return {
      info,
      onSubmitForm,
      idError,
      passError,
      repassError,
      emailError,
      secuError,
      q1Error,
      q2Error,
      q3Error,
      check,
      id,
      pass,
      repass,
      email,
      q1,
      q2,
      q3,
      idcheck
    };
  },
  // 회원가입 하지 않은 사람만 접근
  middleware: "anonymous",
};
</script>

<style lang="sass" scoped>
.q-pa-md
    max-width: 400px
.font14
  font-size: 14px
  color: red
.purple-color
  color: #AE6FFF
  &:hover
    color: #AE6FFF
    font-weight: 500
.LoginLine
    width: 160px
</style>
