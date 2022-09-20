// 로그인한 상태가 아니면 메인페이지로 보내버린다
export default function ({ store, redirect }) {
  if (!store.state.users.me) {
    redirect("/");
  }
}