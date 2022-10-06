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
              v-model="info.id"
              ref="id"
              type="email"
              class="form-control"
              placeholder="Email을 입력해주세요."
              aria-describedby="emailHelp"
            />
            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            <span v-if="emailError" class="font14 mt-1 ml-2">
              이메일,전화번호,사용자이름을 입력하세요
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button class="btn-regular-full">이메일 존재여부 확인</button>
          </div>

          <div class="d-flex justify-content-center findPass">
            <router-link class="nav-link ml-1 mb-2" :to="{ name: 'Pwfind' }"
              >비밀번호를 잊으셨나요?</router-link
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
    const emailError = ref(false);
    const id = ref();
    let info = reactive({
      id: "",
    });

    onMounted(() => {
      id.value.focus()
    })

    const onSubmitForm = async () => {
      //trim으로 잘라서 하나도 없으면
      try {
        const url = "/decommi/member/findemail";
        const headers = {
          "Content-Type": "application/json",
        };
        const body = {
          email: info.id,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            if (res.data == false) {
              alert("존재하지 않는 메일주소입니다.");
              id.value.focus()
              return;
            }
            alert("존재하는 메일주소입니다.");
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
      if (info.id.trim().length == 0) {
        emailError.value = true;
        return;
      }
      emailError.value = false;
    };

    return { emailError, info, onSubmitForm, router, route, id };
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
