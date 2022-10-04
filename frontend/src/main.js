import { createApp } from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import router from "./router";
import store from "./store";
import CKEditor from "@ckeditor/ckeditor5-vue";
// CKEditor Translation
import "@ckeditor/ckeditor5-build-classic/build/translations/ko";
// import "@ckeditor/ckeditor5-editor-inline";

import "./plugins/chart.js";

import "@/sass/style.sass";
// Bootstrap importing
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
//Bootstrap Icon https://icons.getbootstrap.com/
import "bootstrap-icons/font/bootstrap-icons.css";

// import { globalCookiesConfig } from "vue3-cookies";

// globalCookiesConfig({
//   expireTimes: "30d",
//   path: "/",
//   domain: "",
//   secure: true,
//   sameSite: "None",
// });

// store를 추가함으로써 vuex state에 접근이 가능해진다.
createApp(App)
  .use(VueCookies, { expireTimes: "30d", secure: true })
  // .use(globalMethods)
  .use(store)
  .use(router)
  .use(CKEditor)
  .mount("#app");

// 배열에서 index를 쓸 대는 Vue.set을 써준다.
