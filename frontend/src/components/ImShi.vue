<template>
  <div class="container container_default d-flex justify-content-center align-items-center p-0 m-0">
    <div class="q-pa-md">
      <div class="backgrondBox p-5">
        <form ref="form" @submit.prevent="onSubmitForm">
          <div class="d-flex justify-content-center">
            <h1 class="home-title mb-4">SIGN-UP</h1>
          </div>
          <div class="mb-3">
            <input type="email" v-model="info.id" class="form-control" placeholder="아이디를 입력해주세요."
              aria-describedby="emailHelp" />
            <div v-show="idError" class="font14 mt-1 ml-2">
              Email이 올바르지 않습니다.
            </div>
          </div>
          <div class="mb-3">
            <input type="password" v-model="info.pass" class="form-control" placeholder="비밀번호를 입력해주세요." />
            <div v-show="passError" class="font14 mt-1 ml-2">
              비밀번호를 입력해주세요.
            </div>
          </div>
          <div class="mb-3">
            <input type="password" v-model="info.repass" class="form-control" placeholder="비밀번호를 다시 입력해주세요." />
            <div v-show="repassError" class="font14 mt-1 ml-2">
              비밀번호가 일치하지 않습니다.
            </div>
          </div>
          <div class="mb-3">
            <input type="email" v-model="info.email" class="form-control" placeholder="이메일을 입력해주세요."
              aria-describedby="emailHelp" />
            <div v-show="emailError" class="font14 mt-1 ml-2">
              Email을 입력해주세요.
            </div>
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
          <div class="mb-3">
            <select class="form-select" v-model="info.selectedItem" @change="change">
              <option selected disabled>질문을 선택해주세요.</option>
              <option v-for="each in info.items" :key="each" v-text="each" :value="each"></option>
            </select>
          </div>
          <div v-if="questionInput" class="mb-3">
            <input v-model="info.q2" class="form-control" type="text" />
          </div>
          <div v-show="questionError" class="font14 mt-1 ml-2">
              질문을 입력해주세요.
          </div>
          <div class="d-flex justify-content-center align-items-center flex-column">
            <button type="submit" class="btn btn-primary">회원가입</button>
            <div class="d-flex">
              <span> 계정이 있으신가요? </span>
              <router-link class="nav-link purple-color ml-1" :to="{ name: 'Login' }">로그인</router-link>
            </div>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" style="min-width: 30px">또는</div>
            <div class="LoginLine"></div>
          </div>
          <div class="d-flex justify-content-center">
            <div>구글</div>
            <div>카톡</div>
            <div>네이버</div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const idError = ref(false);
    const passError = ref(false);
    const repassError = ref(false);
    const emailError = ref(false);
    const secuError = ref(false);
    const questionInput = ref(false);
    const questionError = ref(false);
    // ref로 focus()할 것
    let info = reactive({
      id: "",
      pass: "",
      repass: "",
      email: "",
      q1: '',
      q2: '',
      // certify: "",
      items: ['인상 깊게 읽은 책 이름은??', '나의 보물 1호는?', '기억에 남는 추억의 장소는?'],
    });

    function change() {
      // if (info.selectedItem == '인상 깊게 읽은 책 이름은??') {
      //   info.q1 = info.selectedItem
      // } else if (info.selectedItem == '나의 보물 1호는?') {
      //   info.q2 = info.selectedItem
      // } else if (info.selectedItem == '기억에 남는 추억의 장소는?') {
      //   info.q3 = info.selectedItem
      // }
      info.q1 = info.selectedItem
      if (info.selectedItem !== "") {
        questionInput.value = true;
      }
    }

    const onSubmitForm = async () => {
      console.log(questionError.value)
      console.log(info.q2)
      if (info.id === "") {
        idError.value = true;
        return;
      } else if (info.pass === "") {
        passError.value = true;
        return;
      } else if (info.repass === "") {
        repassError.value = true;
        return;
      } else if (info.pass !== info.repass) {
        repassError.value = true;
        return;
      } else if (info.email === "") {
        emailError.value = true;
        return;
      } else if (info.certify === "") {
        secuError.value = true;
        return;
      } else if (info.q2 === "") {
        questionError.value = true;
        console.log(info.q2)
      }
      router.push({
        name: "SelectGoodTag",
      });
      try {
        await store.dispatch("users/signUp", {
          // Entity와 맞출 것
          id: info.id,
          pw: info.pass,
          email: info.email,
          q1: info.selectedItem,
          q2: info.q2,
        });
        idError.value = false;
        passError.value = false;
        repassError.value = false;
        emailError.value = false;
        secuError.value = false;
        questionError.value = false;
        // store.state.me = true;
      } catch (err) {
        console.log(err);
      }
    };

    return {
      info,
      onSubmitForm,
      idError,
      passError,
      repassError,
      emailError,
      secuError,
      questionInput,
      change,
      questionError
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
