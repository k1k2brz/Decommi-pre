<template>
  <div class="d-flex justify-content-center align-items-center">
    <button
      type="button"
      class="btn-regular-round"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      회원탈퇴
    </button>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">회원탈퇴</h5>
            <button
              @click="fal2"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label mb-1 ml-2"
                >한 번 탈퇴한 계정은 복구 할 수 없습니다.</label
              >
              <input
                v-model="pass"
                type="text"
                class="form-control"
                id="recipient-name"
                placeholder="비밀번호를 입력해주세요."
              />
              <div class="font14 mt-1 ml-2" v-if="passError">
                비밀번호가 올바르지 않습니다.
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="fal"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              닫기
            </button>
            <button @click="btnWithdraw" type="button" class="btn btn-primary">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const showModal = ref(true);
    const btnCancel = () => {
      if (showModal.value == true) {
        showModal.value = false;
        passError.value = false;
      }
      showModal.value = true;
      passError.value = false;
    };
    const pass = ref("");
    const passError = ref(false);

    const fal = () => {
      passError.value = false;
      pass.value = "";
    };
    const fal2 = () => {
      passError.value = false;
      pass.value = "";
    };

    const btnWithdraw = async () => {
      try {
        const url = "/decommi/member/checkpw";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          email: store.state.users.me.email,
          pw: pass.value,
        };
        console.log(body);
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res.data);
            if (res.data == false) {
              pass.value = "";
              passError.value = true;
              return;
            }
            try {
              axios
                .post(
                  "/decommi/member/deleteMember",
                  {
                    mid: store.state.users.me.mid,
                    writer: store.state.users.me.id,
                  },
                  { headers }
                )
                .then((response) => {
                  console.log(response.data);
                  localStorage.removeItem("vuex");
                  localStorage.removeItem("TOKEN");
                  localStorage.removeItem("id");
                  router.push("/");
                  setTimeout(() => {
                    router.go(0);
                  }, 100);
                });
            } catch (error) {
              console.log(error);
            }
            passError.value = false;
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
    };

    return {
      btnCancel,
      showModal,
      btnWithdraw,
      pass,
      passError,
      fal,
      fal2,
    };
  },
};
</script>

<style lang="sass" scoped>
.modal-dialog
    margin-top: 300px
</style>
