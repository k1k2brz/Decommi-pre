<template>
  <!-- me가 없어야 로그인 창이 보인다 -->
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <div class="q-pa-md" style="max-width: 400px">
      <div class="backgrondBox p-5">
        <form @submit.prevent="onSubmitForm()">
          <div class="d-flex justify-content-center">
            <h1 class="home-title mb-4">내 계정찾기</h1>
          </div>
          <div class="mb-3">
            <input
              v-model="info.pw"
              ref="pw"
              type="password"
              class="form-control"
              placeholder="변경할 비밀번호를 입력해주세요."
            />
            <span v-if="pwError" class="font14 mt-1 ml-2">
              비밀번호가 올바르지 않습니다.
            </span>
            <input
              v-model="info.pwre"
              ref="pwre"
              type="password"
              class="form-control mt-2"
              placeholder="변경할 비밀번호를 다시 입력해주세요."
            />
            <span v-if="pwreError" class="font14 mt-1 ml-2">
              비밀번호가 일치하지 않습니다.
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button class="btn-regular-full">비밀번호 변경</button>
          </div>

          <div class="d-flex justify-content-center findPass mb-2">
            <router-link class="nav-link ml-1" :to="{ name: 'IdFind' }"
              >아이디를 잊으셨나요?</router-link
            >
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" style="min-width: 30px">또는</div>
            <div class="LoginLine"></div>
          </div>
          <div class="d-flex justify-content-center">
            <router-link
              class="nav-link purple-color ml-1 mt-2"
              :to="{ name: 'Signup' }"
              >새 계정 만들기</router-link
            >
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
// import { useStore } from "vuex";
import axios from "axios";

export default {
  setup() {
    // const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const pwError = ref(false);
    const pwreError = ref(false);
    const pw = ref("");
    const pwre = ref("");
    let info = reactive({
      pw: "",
      pwre: "",
    });

    onMounted(() => {
      pw.value.focus();
    });

    const onSubmitForm = async () => {
      //trim으로 잘라서 하나도 없으면
      if (info.pw.trim().length == 0) {
        pwError.value = true;
        pw.value.focus();
        return;
      } else if (info.pwre.trim().length == 0 || info.pw !== info.pwre) {
        pwreError.value = true;
        pwre.value.focus();
        return;
      }
      try {
        const localMid = localStorage.getItem("mid");
        const url = "/decommi/member/findpw2";
        const headers = {
          "Content-Type": "application/json",
        };
        const body = {
          mid: localMid,
          changePw: info.pwre,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            if (info.pw == info.pwre) {
              alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.");
              pwreError.value = false;
              info.pw = "";
              info.pwre = "";
              pw.value.focus();
              localStorage.removeItem("mid");
              router.push("/");
            } else if (res.data == "") {
              pwreError.value = true;
              pwre.value.focus();
              return;
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
        alert("비밀번호를 찾을 수 없습니다");
      }
    };

    return {
      pwError,
      pwreError,
      info,
      onSubmitForm,
      router,
      route,
      pw,
      pwre,
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
</style>
