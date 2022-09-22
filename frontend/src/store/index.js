// Vuex설치 후 사용한다.
// emit으로 하나하나 올리는걸 편하게 하기 위해
import { createStore } from "vuex";
import modules from "./modules";
import VuexPersistence from "vuex-persist";
// import users from "./modules/users";

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  modules: ["users"],
  reducer: (state) => ({ session: state.users.me, token: state.users.token }),
});

export default createStore({
  // state를 관련된 것 끼리 묶어서 폴더화하는 것 modules
  // 여태 만든걸 다 toast안에 넣는다
  modules,
  plugins: [new VuexPersistence().plugin, vuexLocal.plugin],
});
