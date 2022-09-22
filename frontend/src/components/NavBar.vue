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
      <ul class="navbar-nav">
        <li
          v-if="!store.state.users.me"
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
          <div class="d-flex justify-content-center align-items-center">
            <input
              type="text"
              class="form-control serviceSearch mr-5"
              aria-label="Text input with segmented dropdown button"
            />
          </div>
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
          <div class="dropdown" :class="{ isActive: dropdown.active.value }">
            <div class="dropdown-trigger">
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
            </div>
            <div class="dropdown-menu" role="filter">
              <div class="dropdown-content" @click.stop></div>
            </div>
          </div>
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
                    >내 태그 설정</router-link
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
  // 검색기능 에어리뷰 참고하기
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const clickOuter = ref("");
    const dropdown = {
      active: ref(false),
      caret: ref(false),
      close: () => {
        dropdown.active.value = false;
      },
    };

    const navMenuBtn = () => {
      dropdown.active.value = !dropdown.active.value;
      dropdown.caret.value = !dropdown.caret.value;
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
      // if (localStorage.getItem("token") == null) {
      //   store.state.users.me = false;
      // } else if (localStorage.getItem("token") != null) {
      //   store.state.users.me = true;
      // }
      if (sessionStorage.getItem("token") == null) {
        store.state.users.me = false;
      } else if (sessionStorage.getItem("token") != null) {
        store.state.users.me = true;
      }
    }
    onMounted(() => {
      loginCheck();
    });

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
      router.push({
        name: "Home",
      });
      store.state.users.me == false;
      store.state.nav.navToggle = false;
      store.state.nav.navMenuicon = true;
    };

    const me = computed(() => {
      return store.state.users.me;
    });
    const navToggle = computed(() => {
      return store.state.nav.navToggle;
    });
    const navMenuicon = computed(() => {
      return store.state.nav.navMenuicon;
    });

    return {
      store,
      onMounted,
      loginCheck,
      logoBtn,
      navMenuBtn,
      onLogout,
      me,
      navToggle,
      navMenuicon,
      clickOuter,
      myPage,
      close,
      dropdown,
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
