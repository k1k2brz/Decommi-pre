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
            <button class="btn-regular-full">로그인링크 보내기</button>
          </div>

          <div class="d-flex justify-content-center">
            <span> 비밀번호를 재설정 할 수 없나요? (안내문 링크) </span>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" style="min-width: 30px">또는</div>
            <div class="LoginLine"></div>
          </div>
          <div class="d-flex justify-content-center">
            <router-link
              class="nav-link purple-color ml-1"
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
// import { useStore } from "vuex";

export default {
  setup() {
    // const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const emailError = ref(false);
    let info = reactive({
      id: "",
    });

    const onSubmitForm = () => {
      //trim으로 잘라서 하나도 없으면
      if (info.id.trim().length == 0) {
        emailError.value = true;
        return;
      }
      emailError.value = false;
    };

    return { emailError, info, onSubmitForm, router, route };
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
