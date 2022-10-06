<template>
  <!-- me가 없어야 로그인 창이 보인다 -->
  <div class="container container_default d-flex justify-content-center align-items-center p-0 m-0">
    <div class="q-pa-md" style="max-width: 400px">
      <div class="backgrondBox p-5">
        <form @submit.prevent="onSubmitForm()">
          <div class="d-flex justify-content-center">
            <h1 class="home-title mb-4">내 계정찾기</h1>
          </div>
          <div class="mb-3">
            <input v-model="info.id" ref="id" type="email" class="form-control" placeholder="Email을 입력해주세요."
              aria-describedby="emailHelp" />
            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
            <span v-if="emailError" class="font14 mt-1 ml-2">
              이메일이 올바르지 않습니다.
            </span>
            <div class="input-group idsection mt-2">
              <select class="form-select" aria-label="Default select example" v-model="info.qtype" name="select"
                id="select">
                <option value="q1">인상 깊게 읽은 책 이름은?</option>
                <option value="q2">나의 보물 1호는?</option>
                <option value="q3">기억에 남는 추억의 장소는?</option>
              </select>
            </div>
            <input v-model="info.answer" ref="answer" type="type" class="form-control mt-2" placeholder="답변을 입력해주세요." />
            <span v-if="answerError" class="font14 mt-1 ml-2">
              답변이 올바르지 않습니다.
            </span>
          </div>
          <div class="d-flex justify-content-center align-items-center mb-3">
            <button class="btn-regular-full">비밀번호 찾기</button>
          </div>

          <div class="d-flex justify-content-center findPass mb-2">
            <router-link class="nav-link ml-1" :to="{ name: 'IdFind' }">아이디를 잊으셨나요?</router-link>
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="LoginLine"></div>
            <div class="ml-3 mr-3" style="min-width: 30px">또는</div>
            <div class="LoginLine"></div>
          </div>
          <div class="d-flex justify-content-center">
            <router-link class="nav-link purple-color ml-1 mt-2" :to="{ name: 'Signup' }">새 계정 만들기</router-link>
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
    const answerError = ref(false);
    const id = ref("")
    const answer = ref("")
    let info = reactive({
      id: "",
      answer: "",
      qtype: '',
      q1: '',
      q2: '',
      q3: '',
    });

    onMounted(() => {
      id.value.focus()
    })

    
    const onSubmitForm = async () => {
      //trim으로 잘라서 하나도 없으면
      if (info.id.trim().length == 0) {
        emailError.value = true;
        id.value.focus()
        return;
      } else if (info.answer.trim().length == 0) {
        answerError.value = true;
        answer.value.focus()
        return;
      }
      if (info.qtype === 'q1') {
        info.q1 = info.answer
      } else if (info.qtype === 'q2') {
        info.q2 = info.answer
      } else if (info.qtype === 'q3') {
        info.q3 = info.answer
      }
      try {
        const url = "/decommi/member/findpw";
        const headers = {
          "Content-Type": "application/json",
        };
        const body = {
          email: info.id,
          q1: info.q1,
          q2: info.q2,
          q3: info.q3,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            if(res.data == info.answer) {
              alert('회원님의 비밀번호는 < '+ res.data +" > 입니다.")
              answerError.value = false;
              info.id = "";
              info.answer = ""
              id.value.focus()
            } else if (res.data == "") {
              answerError.value = true;
              answer.value.focus()
              return
            }
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
        alert('비밀번호를 찾을 수 없습니다')
      }
    };

    return { emailError,
      answerError,
      info,
      onSubmitForm,
      router,
      route,
      id,
      answer
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
