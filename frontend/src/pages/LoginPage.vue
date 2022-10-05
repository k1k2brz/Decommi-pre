<template>
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <div class="q-pa-md" style="max-width: 400px">
      <div class="backgrondBox p-5">
        <form @submit.prevent="onSubmitForm()">
          <div class="d-flex justify-content-center">
            <h1 class="home-title mb-4">LOGIN</h1>
          </div>
          <div class="mb-3">
            <input
              ref="id"
              v-model="info.id"
              type="email"
              class="form-control"
              placeholder="Email을 입력해주세요."
              aria-describedby="emailHelp"
            />
            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            <span v-if="emailError" class="font14 mt-1 ml-2">
              Email을 입력해주세요.
            </span>
          </div>
          <div class="mb-3">
            <input
              ref="pass"
              v-model="info.pass"
              type="password"
              class="form-control"
              placeholder="비밀번호를 입력해주세요."
            />
            <div class="font14 mt-1 ml-2" v-if="passError">
              비밀번호를 입력해주세요.
            </div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="loginCheck" />
            <label class="form-check-label me-5" for="loginCheck"
              >아이디 저장</label
            >
            <input type="checkbox" class="form-check-input" id="loginCheck2" />
            <label class="form-check-label" for="loginCheck2">자동로그인</label>
          </div>
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button type="submit" class="btn-regular-full">로그인</button>
          </div>

          <div class="d-flex justify-content-center pb-2">
            <span> 계정이 없으신가요? </span>
            <router-link
              class="nav-link purple-color ml-1"
              :to="{ name: 'Signup' }"
              >가입하기</router-link
            >
          </div>

          <div class="d-flex justify-content-center findPass">
            <router-link class="nav-link ml-1" :to="{ name: 'IdFind' }"
              >아이디 확인하기</router-link
            >
          </div>
          <div class="d-flex justify-content-center findPass">
            <router-link class="nav-link ml-1" :to="{ name: 'Pwfind' }"
              >비밀번호를 잊으셨나요?</router-link
            >
          </div>
          <div
            class="d-flex justify-content-center align-items-center pt-2 pb-2"
          >
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" style="min-width: 30px">또는</div>
            <div class="LoginLine"></div>
          </div>
          <div class="d-flex justify-content-center gap-3">
            <img
              class="loginImg googleLogo"
              src="@/assets/google.png"
              alt="no image"
            />
            <img class="loginImg" src="@/assets/kakao.png" alt="no image" />
            <img class="loginImg" src="@/assets/naver.png" alt="no image" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { useCookies } from "vue3-cookies";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { cookies } = useCookies();
    const emailError = ref(false);
    const passError = ref(false);
    let info = reactive({
      id: "",
      pass: "",
      token: 0,
    });
    const id = ref("");
    const pass = ref("");

    const onSubmitForm = async () => {
      // cookies
      // let myCookieValue = cookies.get("myCoookie");
      //trim으로 잘라서 하나도 없으면
      if (info.id.trim().length == 0) {
        emailError.value = true;
        passError.value = false;
        id.value.focus();
        return;
      }
      if (info.pass.trim().length == 0) {
        passError.value = true;
        emailError.value = false;
        pass.value.focus();
        return;
      }
      try {
        await store.dispatch("users/logIn", {
          token: info.token,
          email: info.id,
          pw: info.pass,
        });
        emailError.value = false;
        passError.value = false;
      } catch (err) {
        console.log(err);
      }
    };

    onMounted(() => {
      id.value.focus();
    });

    function a() {
      if (store.state.users.me == null || store.state.users.me == "") {
        console.log("비로그인 접근");
      } else {
        router.push({
          name: "Main",
        });
      }
    }

    a();

    return {
      emailError,
      passError,
      info,
      onSubmitForm,
      router,
      route,
      store,
      cookies,
      id,
      pass,
    };
  },
  middleware: "anonymous",
};
</script>

<style lang="sass" scoped>
.LoginLine
    width: 160px

.purple-color
  color: #AE6FFF
  &:hover
    color: #AE6FFF
    font-weight: 500

.findPass
  color: grey
  &:hover
    color: black
    font-weight: 300

.loginImg
  width: 34px

.googleLogo
  border: 0.5px solid #D8D8D8
  border-radius: 50%
</style>
