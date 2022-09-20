// 로그인한 사용자라면 HOME페이지로 보내버린다
export default function ({ store, redirect }) {
  if (store.state.users.me) {
    redirect("/pages/mainpage");
  }
}
