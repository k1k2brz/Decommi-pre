<template>
  <div class="pt-3 pb-3">
    <nav
      class="navbar navbar-expand-lg d-flex justify-content-between container"
    >
      <!-- href대신 to를 사용하니까 링크 변경시 스핀이 안돔(리로딩이 없음) (router-link) -->
      <!-- 라우터를 사용하는 이유는 창 변경할 때 요청을 중간에 가로채서 맞는 컴포넌트를 찾아줌 (a태그보다 빠르다) -->
      <!-- to뒤에 경로나 :찍고 index.js의 name을 걸어주면 링크이동 -->
      <!-- index.js에서 설정한 home component가 여기에 들어온다 -->
      <a href="#" @click="logoBtn" class="navbar-brand"><b>DeCommi</b></a>
      <ul class="navbar-nav d-flex justify-content-between">
        <li
          v-if="status()"
          class="nav-item active d-flex align-items-center flex-wrap"
        >
          <router-link class="nav-link mr-3" :to="{ name: 'Login' }"
            >로그인</router-link
          >
          <router-link class="nav-link mr-3" :to="{ name: 'Signup' }"
            >회원가입</router-link
          >
        </li>
        <li
          v-else
          class="nav-item active d-flex justify-content-between align-items-center"
        >
          <!-- <div class="d-flex align-items-center">
            <input type="text" class="form-control">
          </div> -->
          <!-- <div class="d-flex justify-content-center align-items-center">
            <input
              type="text"
              class="form-control serviceSearch mr-2"
              ref="navInput"
              v-model="state.navInput"
              @keyup.enter="btnSearch"
            />
            <button @click="btnSearch" class="btn-regular mr-5">입력</button>
          </div> -->
          <div
            class="d-flex justify-content-center align-items-center flex-wrap"
          >
            <router-link class="nav-link mr-3" :to="{ name: 'Main' }"
              >홈</router-link
            >
            <router-link class="nav-link mr-3" :to="{ name: 'MyDiary' }"
              >내 다이어리</router-link
            >
            <router-link class="nav-link mr-3" :to="{ name: 'BookMark' }"
              >북마크</router-link
            >
            <router-link class="nav-link mr-3" :to="{ name: 'PopularTag' }"
              >태그찾기</router-link
            >
            <router-link class="nav-link mr-4" :to="{ name: 'Alarm' }"
              >알림</router-link
            >
          </div>
          <button
            class="button nav-menu-circle d-flex justify-content-center align-items-center"
            @click.stop="dropdown.active.value = !dropdown.active.value"
          >
            <div
              v-if="dropdown.active.value == false"
              class="bi bi-caret-left-fill"
            ></div>
            <div
              v-if="dropdown.active.value == true"
              class="bi bi-caret-down-fill"
            ></div>
          </button>
          <div
            v-if="dropdown.active.value"
            @blur="close"
            class="position-relative menu-container"
          >
            <div class="position-absolute menu-box">
              <div class="pl-2 pr-2 pt-3 pb-3 d-flex flex-column gap-3">
                <button @click="myPage" class="p-3 grey-bg d-flex flex-column">
                  <span>현재 로그인된 계정</span>
                  <span class="mailId">{{ me.email }}</span>
                </button>
                <div class="d-flex flex-column ml-2">
                  <a
                    href="#"
                    @click="myPage"
                    class="nav-link menu-hover menu-btn"
                    >마이페이지</a
                  >
                  <router-link
                    class="menu-hover menu-btn nav-link"
                    :to="{ name: 'ManagerPage' }"
                    >관리자페이지</router-link
                  >
                  <router-link
                    class="menu-hover menu-btn nav-link"
                    :to="{ name: 'EditTag' }"
                    >관심있는 다이어리</router-link
                  >
                  <router-link
                    class="menu-hover menu-btn nav-link"
                    :to="{ name: 'UserEditPass' }"
                    >회원정보 수정</router-link
                  >
                  <router-link
                    class="menu-hover menu-btn nav-link"
                    :to="{ name: 'ServiceNotice' }"
                    >고객센터</router-link
                  >
                  <button
                    @click="onLogout"
                    class="d-flex menu-hover menu-btn nav-link"
                  >
                    <div>로그아웃</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
// import axios from "axios";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const navInput = ref("");
    const state = reactive({
      navInput: "",
    });
    const dropdown = {
      active: ref(false),
      caret: ref(false),
      close: () => {
        dropdown.active.value = false;
      },
    };

    function close() {
      store.state.nav.navToggle = false;
    }

    onBeforeUnmount(() => {
      document.removeEventListener("click", dropdown.close);
    });

    onMounted(() => {
      document.addEventListener("click", dropdown.close);
    });

    function loginCheck() {
      if (localStorage.getItem("token") == 0) {
        store.state.users.me = false;
      } else if (localStorage.getItem("token") != null) {
        store.state.users.me = true;
      }
    }
    onMounted(() => {
      loginCheck();
      localStorage.removeItem("tagList");
    });

    // const btnSearch = async () => {
    //   if (state.navInput == "") {
    //     alert("검색어를 입력해주세요");
    //     navInput.value.focus();
    //     return;
    //   }
    //   // let keyword2 = localStorage.getItem("tagList");
    //   // console.log(keyword2);
    //   let keyword = localStorage.getItem("tagList");
    //   if (keyword !== null && keyword !== "") {
    //     let kwd = keyword.split(",");
    //     store.dispatch("posts/setSearch", {
    //       type: "s",
    //       keyword: state.navInput,
    //       tagList: kwd,
    //       writer: store.state.users.me.id,
    //       Authorization: store.state.users.me.token,
    //       mid: store.state.users.me.mid,
    //     });
    //     // try {
    //     //   const url = "./diary/list";
    //     //   const headers = {
    //     //     "Content-Type": "application/json",
    //     //     Authorization: store.state.users.me.token,
    //     //     mid: store.state.users.me.mid,
    //     //   };
    //     //   const body = {
    //     //     type: "s",
    //     //     keyword: state.navInput,
    //     //     tagList: kwd,
    //     //     writer: store.state.users.me.id,
    //     //   };
    //     //   console.log(body);
    //     //   await axios.post(url, body, { headers }).then((res) => {
    //     //     console.log(res.data);
    //     //   });
    //     // } catch (err) {
    //     //   console.error(err);
    //     // }
    //   } else if (!keyword || keyword == "") {
    //     try {
    //       const url = "./diary/list";
    //       const headers = {
    //         "Content-Type": "application/json",
    //         Authorization: store.state.users.me.token,
    //         mid: store.state.users.me.mid,
    //       };
    //       const body = {
    //         keyword: state.navInput,
    //         type: "s",
    //         writer: store.state.users.me.id,
    //       };
    //       console.log(body);
    //       await axios.post(url, body, { headers }).then((res) => {
    //         console.log(res.data);
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //   // let tmp = localStorage.getItem("tagList").split(",");
    //   // tmp.push(state.navInput);
    //   state.navInput == "";
    //   navInput.value.focus();
    // };

    const logoBtn = () => {
      if (store.state.users.me == false || store.state.users.me == null) {
        router.push({
          name: "Home",
        });
      } else {
        router.push({
          name: "Main",
        });
      }
    };

    const myPage = () => {
      router.push({
        name: "MyPage",
      });
    };

    const onLogout = () => {
      store.dispatch("users/logOut");
      store.state.users.me == false;
      router.push({
        name: "Home",
      });
      store.state.nav.navToggle = false;
      store.state.nav.navMenuicon = true;
    };

    const me = computed(() => {
      return store.state.users.me;
    });
    const onregi = computed(() => {
      return store.state.users.onregi;
    });
    const navToggle = computed(() => {
      return store.state.nav.navToggle;
    });
    const navMenuicon = computed(() => {
      return store.state.nav.navMenuicon;
    });

    const status = function computed() {
      if (!store.state.users.me) {
        return true;
      } else {
        if (store.state.users.onregi) {
          return true;
        }
      }
    };

    return {
      store,
      onMounted,
      loginCheck,
      logoBtn,
      onLogout,
      me,
      onregi,
      navToggle,
      navMenuicon,
      navInput,
      state,
      myPage,
      close,
      dropdown,
      status,
      // btnSearch,
    };
  },
});
</script>

<style lang="sass" scoped>
.navbar
  padding: 0 14px

.mailId
  font-size: 12px

.navbar-brand
  font-weight: 700

.nav-menu-circle
  background-color: #FFDCDC
  border: none
  width: 25px
  height: 25px
  padding: 10px
  border-radius: 50%

.menu-container
  top: 25px
  right: 155px

.menu-box
  background-color: #FFDCDC
  border-radius: 10px

.grey-bg
  background-color: lightgrey
  border-radius: 15px
  width: 160px
  border: none

.menu-btn
  border: none
  background: none
  &:hover
    color: black
    font-weight: 300

.menu-hover
  &:hover
    background-color: #FFCACA
</style>
