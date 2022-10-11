<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">글 수정하기</span>
    </div>
  </div>
  <div class="half d-flex justify-content-between">
    <div class="card-line w-70">
      <div class="card mb-4">
        <div class="form-floating">
          <div class="card-body">
            <div>
              <div class="textareaPadding">
                <input
                  v-model="myWriteTitle"
                  @click="clickTextarea"
                  type="text"
                  class="borderBind myWriteTitle none form-control mb-3"
                  maxlength="80"
                  placeholder="제목을 입력하세요."
                />
              </div>

              <ckeditor
                @ready="onReady"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
                class="myWriteContent ck-placeholder"
                id="editor"
                style="border: 1px solid #d8d8d8; border-radius: 10px"
              ></ckeditor>

              <div>
                <div class="textareaPadding flex-wrap mt-3 gap-2 d-flex">
                  <div
                    class="tag"
                    v-for="(tag, index) in tags"
                    :key="'tag' + index"
                  >
                    <span class="btn-tag-sm d-flex align-items-center">
                      <button
                        @click="removeTag(index)"
                        class="bi bi-x-lg mr-1"
                      ></button>
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div
                  class="textareaPadding d-flex justify-content-center align-items-center"
                >
                  <input
                    maxlength="12"
                    v-model="tagValue"
                    @keyup.enter="addTag"
                    type="text"
                    class="tagTextbox form-control mr-1 mb-4 mt-4"
                    placeholder="태그 추가하기"
                  />
                </div>
              </div>
            </div>
            <div class="textareaPadding">
              <div class="LoginLine mb-3"></div>
            </div>
            <div
              class="textareaPadding d-flex justify-content-between align-items-center"
            >
              <button
                v-if="privacyPermit"
                @click="publicPrivacy"
                class="zidx purple-color mb-3"
              >
                모든 사람이 다이어리를 읽을 수 있습니다.
              </button>
              <button
                v-else
                @click="publicPrivacy"
                class="zidx purple-color mb-3"
              >
                나만이 다이어리를 읽을 수 있습니다.
              </button>
              <div v-if="pp" class="d-flex position-absolute">
                <div
                  class="bg-white d-flex flex-column box-shadow p-4 position-relative gap-1"
                >
                  <div>
                    <button @click="diaryPP" class="privacy-public">
                      내 다이어리 공개
                    </button>
                    <i v-if="diaryPrivacyCheck" class="bi bi-check-lg"></i>
                  </div>
                  <div>
                    <button
                      :disabled="commentDisable"
                      @click="commentPP"
                      class="privacy-public"
                    >
                      내 다이어리에 댓글 허용
                    </button>
                    <i v-if="commentPrivacyCheck" class="bi bi-check-lg"></i>
                  </div>
                </div>
              </div>
              <div>
                <!-- :class="{
                  btnDisabled:
                    myWriteTitle.length < 1 || editorData.length < 1,
                }" :disabled="
                  myWriteTitle.length < 1 || editorData.length < 1
                " -->
                <button @click="editCompleteBtn" class="btn-regular">
                  수정완료
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import ClassicEditor from "@ckeditor/ck5/build/ckeditor";
import { computed, onMounted } from "@vue/runtime-core";
// import store from "@/store";

export default {
  data() {
    let store = useStore();
    let token = store.state.users.me.token;
    let md = store.state.users.me.mid;
    return {
      shareable: true,
      openable: true,
      editor: ClassicEditor,
      // 여기에 본문
      editorData: localStorage.getItem("Content"),
      editorConfig: {
        language: "ko",
        placeholder: "오늘의 다이어리를 작성해보세요.",
        simpleUpload: {
          uploadUrl: "/decommi/api/diary/write/image",
          withCredentials: true,
          headers: {
            Authorization: token,
            mid: md,
          },
        },
      },
    };
  },
  mounted() {
    // this.editorData = localStorage.getItem('Content');
    // console.log("늦게뜨기");
  },
  setup() {
    function onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    }
    // Comments, Images, id(고유번호), createdAt 등 어케 받을건지 백엔드와 상의
    const router = useRouter();
    const store = useStore();
    const pp = ref(false);
    const diaryPrivacyCheck = ref(true);
    const commentPrivacyCheck = ref(true);
    const commentDisable = ref(false);
    const WCDisabled = ref(true);
    const myWriteTitle = ref("");
    const myWriteContent = ref("");
    const selectedFile = ref(null);
    const selectedFiles = ref(null);
    const privacyPermit = ref(true);
    const tagValue = ref("");
    let tags = reactive([]);
    const file = ref("");
    const state = reactive({
      myContent: "",
      context: "",
      count: 0,
    });
    let getContext = onMounted(() => {
      state.context = getCurrentInstance().data.editorData;
    });

    // onBeforeMount(()=>{
    //   axiosComponent()
    //   console.log(state.myContent)
    // })

    const addTag = () => {
      let result = tagValue.value.trim().replace(/ /, "");
      if (tags.includes(result) == true) {
        alert("이미 등록된 태그입니다.");
        tagValue.value = "";
        return;
      }
      if (!result == "") {
        tags.push(result);
        tagValue.value = "";
      }
      tagValue.value = "";
    };

    const removeTag = (index) => {
      tags.splice(index, 1);
    };

    const me = computed(() => {
      return store.state.users.me;
    });

    const publicPrivacy = () => {
      if (pp.value == false) {
        pp.value = true;
      } else if (pp.value == true) {
        pp.value = false;
      }
    };

    const diaryPP = () => {
      if (diaryPrivacyCheck.value == false) {
        diaryPrivacyCheck.value = true;
        commentDisable.value = false;
        commentPrivacyCheck.value = true;
        privacyPermit.value = true;
      } else if (diaryPrivacyCheck.value == true) {
        diaryPrivacyCheck.value = false;
        commentDisable.value = true;
        commentPrivacyCheck.value = false;
        privacyPermit.value = false;
      }
    };

    const commentPP = () => {
      if (commentPrivacyCheck.value == true) {
        commentPrivacyCheck.value = false;
      } else if (commentPrivacyCheck.value == false) {
        commentPrivacyCheck.value = true;
      }
    };

    let params = new URLSearchParams(window.location.search).get("edit");

    const axiosComponent = async () => {
      const url = "/decommi/api/diary/modify/check";
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        dino: params,
        writer: store.state.users.me.id,
      };
      console.log(body);
      await axios
        .post(url, body, { headers })
        .then((res) => {
          localStorage.setItem("Content", res.data.content);
          myWriteTitle.value = res.data.title;
          diaryPrivacyCheck.value = res.data.openYN;
          commentPrivacyCheck.value = res.data.replyYN;
          state.myContent = JSON.parse(JSON.stringify(res.data.content));
          store.dispatch("posts/setContent", {
            content: res.data.content,
          });
          for (let i = 0; i < res.data.tagList.length; i++) {
            tags.push(res.data.tagList[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(store.state.posts.count);
      if (store.state.posts.count == true) {
        store.dispatch("posts/setCount", {
          count: false,
        });
        router.go(0);
      }
    };

    axiosComponent();

    const editCompleteBtn = async () => {
      try {
        const url = "/decommi/api/diary/modify/register";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        getContext();
        const body = {
          dino: params,
          title: myWriteTitle.value,
          content: state.context,
          openYN: diaryPrivacyCheck.value,
          replyYN: commentPrivacyCheck.value,
          writer: store.state.users.me.id,
          tagList: tags,
        };
        console.log(body);
        localStorage.removeItem("Content");
        await axios
          .post(url, body, { headers })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.log(err);
      }
      router.push({ name: "Main" });
      // store.count = true
      store.dispatch("posts/setCount", {
        state: state.count,
      });
    };

    return {
      pp,
      publicPrivacy,
      diaryPrivacyCheck,
      commentPrivacyCheck,
      diaryPP,
      commentDisable,
      commentPP,
      editCompleteBtn,
      WCDisabled,
      myWriteTitle,
      myWriteContent,
      selectedFile,
      selectedFiles,
      privacyPermit,
      me,
      tagValue,
      tags,
      addTag,
      removeTag,
      file,
      ClassicEditor,
      onReady,
      state,
      getContext,
    };
  },
};
</script>

<style lang="sass" scoped>
.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable)
  box-shadow: none !important


.ck-placeholder::before
  color: #d21714

.myWriteTitle::placeholder,
.tagTextbox::placeholder
  font-weight: 300

.textareaPadding
  padding: 0 2rem

.borderBind
  border: 1px solid #D8D8D8 !important

.tagTextbox
  border: 1px solid #D8D8D8 !important


.ck-editor__editable
  height: 60vh

.tagContainer
  border: 1px solid lightgrey
  border-radius: 10px

.ck-content
  margin: 0 2rem

.myWriteContent
  overflow: visible
  border: none
  text-decoration: none
  &:hover
    text-decoration: none
    border: none

.zidx
  z-index: 21

a
  text-decoration: none
  cursor: pointer

.margin5
  margin-left: 5px

.card
  padding: 20px 15px

.text-btn-big
  padding: 0
  color: #AE6FFF
  background: none
  border: none
  font-weight: 500
  font-size: 14px
  font-size: 20px
  font-weight: 700

.btnTag
    background-color: #E8E8E8
    border-radius: 20px

.privacy-public
  padding: 0
  background: none
  border: none

.form-control
  border: none
  resize: none
  &:focus
    box-shadow: none

.homeDiary
    width: 100%

.icon
    width: 20px
    height: 20px
    border-radius: 50%
    background-color: lightgrey

.tagSearch
    background-color: white

.none
  border: none

.purple-color
  padding: 0.375rem 0.75rem
  font-size: 15px
  font-weight: 500
  border: none
  background: none

.btnDisabled
  background-color: lightgrey
  opacity: 80%

.box
  width: 30px
  height: 30px
  border-radius: 5px
  background-color: #D8D8D8

.bg-white
  background-color: white
  top: 60px

.picIcon
  overflow: hidden

.filebox label
  display: inline-block
  padding: 0.5em 0.75em
  color: #999
  background-color: #fdfdfd
  font-size: 15px
  cursor: pointer
  border: 1px solid #ebebeb
  border-radius: 3.25em

.filebox input[type="file"]
  position: absolute
  width: 1px
  height: 1px
  padding: 0
  margin: -1px
  overflow: hidden
  clip: rect(0,0,0,0)
  border: 0
</style>
