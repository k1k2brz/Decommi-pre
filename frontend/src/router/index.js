import { createRouter, createWebHistory } from "vue-router";
// 뒤에 todos붙여주면 Todos파일로 가게
import Home from "../pages/IndexPage.vue";
import Login from "../pages/LoginPage.vue";
import Signup from "../pages/SignUp.vue";
import Idfind from "../pages/IdFind.vue";
import Pwfind from "../pages/PwFind.vue";
import PwChange from "../pages/PwChange.vue";
import Mainpage from "../pages/mainpage/MainPage.vue";
import Alarmmain from "../pages/alarm/AlarmMain.vue";
import Useredit from "../pages/users/UserEdit.vue";
import Usereditpass from "../pages/users/UserEditPass.vue";
import Mypage from "../pages/mypage/MyPage.vue";
import Bookmark from "../pages/bookmark/BookMark.vue";
import Diarywrite from "../pages/mainpage/DiaryWrite.vue";
import Servicewrite from "../pages/userserivce/ServiceWrite.vue";
import Servicenotice from "../pages/userserivce/ServiceNotice.vue";
import Servicefaq from "../pages/userserivce/ServiceFaq.vue";
import Servicequestion from "../pages/userserivce/ServiceQuestion.vue";
import Populartag from "../pages/findtag/PopularTag.vue";
import Recommendtag from "../pages/findtag/RecommendTag.vue";
import Selectgoodtag from "../pages/SelectGoodtag.vue";
import Selectdisliketag from "../pages/SelectDisliketag.vue";
import Managerpage from "../pages/managerpage/ManagerPage.vue";
import Reportmanagement from "../pages/managerpage/ReportManagement.vue";
import Usermanagement from "../pages/managerpage/UserManagement.vue";
import Editpost from "../components/EditPost.vue";
import Mydiary from "../pages/mypage/MyDiary.vue";
import DiaryWriteEdit from "../pages/mainpage/DiaryWriteEdit.vue";
import EditTag from "../pages/findtag/EditTags.vue";
import UserBookmark from "../pages/bookmark/UserBookmark.vue";
import Read from "../components/WrittenPostPage.vue";
import NoticeRead from "../components/NoticeRead.vue";
import FaqRead from "../components/FaqRead.vue";
import EditNotice from "../components/EditNotice.vue";

// import { useStore } from "vuex";

// const store = useStore();

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(process.env.BASE_URL),

  // 하나의 객체가 하나의 route를 의미
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresGuest: true,
      },
    },
    // 뒤에 todos붙여주면 Todos파일로 가게 Path설정
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/signup",
      name: "Signup",
      component: Signup,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/idfind",
      name: "IdFind",
      component: Idfind,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/pwfind",
      name: "Pwfind",
      component: Pwfind,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/pwchange",
      name: "PwChange",
      component: PwChange,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/mainpage",
      name: "Main",
      component: Mainpage,
      meta: {
        requiresAuth: true,
      },
      // beforeEnter: requireAuth(),
    },
    {
      path: "/alarm",
      name: "Alarm",
      component: Alarmmain,
    },
    {
      path: "/users/edit",
      name: "UserEdit",
      component: Useredit,
    },
    {
      path: "/users/editpass",
      name: "UserEditPass",
      component: Usereditpass,
    },
    {
      path: "/mypage",
      name: "MyPage",
      component: Mypage,
    },
    {
      path: "/diarywrite",
      name: "DiaryWrite",
      component: Diarywrite,
    },
    {
      path: "/BookMark",
      name: "BookMark",
      component: Bookmark,
    },
    {
      path: "/Service/write",
      name: "ServiceWrite",
      component: Servicewrite,
    },
    {
      path: "/Service/notice",
      name: "ServiceNotice",
      component: Servicenotice,
    },
    {
      path: "/Service/question",
      name: "ServiceQuestion",
      component: Servicequestion,
    },
    {
      path: "/Service/faq",
      name: "ServiceFaq",
      component: Servicefaq,
    },
    {
      path: "/findtags/populartags",
      name: "PopularTag",
      component: Populartag,
    },
    {
      path: "/findtags/recommendtags",
      name: "RecommendTag",
      component: Recommendtag,
    },
    {
      path: "/selectliketags",
      name: "SelectGoodTag",
      component: Selectgoodtag,
    },
    {
      path: "/selectdisliketags",
      name: "SelectDislikeTag",
      component: Selectdisliketag,
    },
    {
      path: "/managerpage",
      name: "ManagerPage",
      component: Managerpage,
    },
    {
      path: "/managerpage/report",
      name: "ReportManagement",
      component: Reportmanagement,
    },
    {
      path: "/managerpage/user",
      name: "UserManagement",
      component: Usermanagement,
    },
    {
      path: "/editPost",
      name: "EditPost",
      component: Editpost,
    },
    {
      path: "/mydiary",
      name: "MyDiary",
      component: Mydiary,
    },
    {
      path: "/postwrite",
      name: "DiaryWriteEdit",
      component: DiaryWriteEdit,
    },
    {
      path: "/edittags",
      name: "EditTag",
      component: EditTag,
    },
    {
      path: "/userbookmark",
      name: "UserBookmark",
      component: UserBookmark,
    },
    {
      path: "/read",
      name: "Read",
      component: Read,
    },
    {
      path: "/NoticeRead",
      name: "NoticeRead",
      component: NoticeRead,
    },
    {
      path: "/FaqRead",
      name: "FaqRead",
      component: FaqRead,
    },
    {
      path: "/EditNotice",
      name: "EditNotice",
      component: EditNotice,
    },
  ],
});

// 1 /home 2 /todos 3 /todos/create 4 /todos/:id

// https://m.blog.naver.com/1ilsang/221338086140

// function requireAuth(to, from, next) {
//   const { $cookies } = router.app.config.globalProperties;
//   console.log("_ga", $cookies.get("_ga"));
//   next();
// }

export default router;
