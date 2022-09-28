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
              <input
                v-model="myWriteTitle"
                type="text"
                class="myWriteTitle none form-control"
                placeholder="제목을 입력하세요."
              />
              <textarea
                spellcheck="false"
                v-model="myWriteContent"
                @input="autoResize"
                class="myWriteContent form-control"
                placeholder="오늘의 다이어리를 작성해 보세요!"
                id="floatingTextarea"
              />
              <div>
                <div class="flex-wrap gap-2 d-flex">
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
                <div class="d-flex justify-content-center align-items-center">
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
              <button
                v-if="privacyPermit"
                @click="publicPrivacy"
                class="purple-color mb-3"
              >
                모든 사람이 다이어리를 읽을 수 있습니다.
              </button>
              <button v-else @click="publicPrivacy" class="purple-color mb-3">
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
            </div>
            <div>
              <div class="LoginLine mb-3"></div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-1">
                <div class="form-group centerz">
                  <div class="filebox">
                    <label
                      for="ex_file"
                      ref="selectedFile"
                      class="bi bi-file-image"
                    ></label>
                    <input
                      ref="imgInput"
                      v-on:change="handleFileUpload"
                      type="file"
                      id="ex_file"
                      multiple
                    />
                  </div>
                  <!-- vue3 image upload easy (v-upload-image) 참고 -->
                  <!-- npm설치해야하면 설치할 것 -->
                  <!-- <button @click="onUpload">Upload</button> -->
                </div>
                <div class="filebox">
                  <label
                    for="ex_gif"
                    ref="selectedGif"
                    class="bi bi-filetype-gif"
                  ></label>
                  <input
                    ref="gifInput"
                    v-on:change="handleGifUpload()"
                    type="file"
                    id="ex_gif"
                  />
                </div>
                <div class="icon"></div>
                <div class="icon"></div>
              </div>
              <button
                @click="writeCompletedBtn"
                class="btn-regular"
                :class="{
                  btnDisabled:
                    myWriteTitle.length < 1 || myWriteContent.length < 1,
                }"
                :disabled="myWriteTitle.length < 1 || myWriteContent.length < 1"
              >
                수정완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed, onMounted } from "@vue/runtime-core";

export default {
  setup() {
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
    const imgInput = ref(null);
    const gifInput = ref(null);
    const privacyPermit = ref(true);
    const tagValue = ref("");
    let tags = reactive([]);
    const file = ref("");

    const addTag = () => {
      let result = tagValue.value.trim().replace(/ /, "");
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

    // intersection observe로 무한 스크롤링

    const handleFileUpload = (e) => {
      // image는 Json이 아니라 FormData로 보낸다.
      console.log(e.target.files[0]);
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f); // { image: [file1, file2] }
      });
      console.log(imageFormData);
      // store.dispatch("posts/uploadImages", imageFormData);
    };

    const handleGifUpload = () => {
      console.log("selected file", gifInput.value.files);
    };

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

    // 만약 백엔드에서 날짜 관련 자동으로 안받아지면 이거 하나하나 넣어야함
    const today = new Date();
    // time: today.getMonth(),

    let params = new URLSearchParams(window.location.search).get("edit");

    const axiosComponent = async () => {
      const url = "./api/diary/modify/check";
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        dino: params,
        writer: store.state.users.me.email,
      };
      console.log(body);
      await axios
        .post(url, body, { headers })
        .then((res) => {
          console.log(res.data);
          myWriteTitle.value = res.data.title;
          myWriteContent.value = res.data.content;
          for (let i = 0; i < res.data.tagList.length; i++) {
            tags.push(res.data.tagList[i]);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };

    onMounted(() => {
      axiosComponent();
    });

    const writeCompletedBtn = async () => {
      try {
        const url = "./api/diary/modify/register";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          dino: params,
          title: myWriteTitle.value,
          content: myWriteContent.value,
          openYN: diaryPrivacyCheck.value,
          replyYN: commentPrivacyCheck.value,
          writer: store.state.users.me.email,
          tagList: tags,
        };
        console.log(body);
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
    };

    const autoResize = (e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return {
      // axiosComponent,
      autoResize,
      pp,
      publicPrivacy,
      diaryPrivacyCheck,
      commentPrivacyCheck,
      diaryPP,
      commentDisable,
      commentPP,
      writeCompletedBtn,
      WCDisabled,
      myWriteTitle,
      myWriteContent,
      selectedFile,
      selectedFiles,
      imgInput,
      handleFileUpload,
      handleGifUpload,
      today,
      gifInput,
      privacyPermit,
      me,
      tagValue,
      tags,
      addTag,
      removeTag,
      file,
    };
  },
};
</script>

<style lang="sass" scoped>
.myWriteContent
  overflow: visible
  border: none
  text-decoration: none
  &:hover
    text-decoration: none
    border: none

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
