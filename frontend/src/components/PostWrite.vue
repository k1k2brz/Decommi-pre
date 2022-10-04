<template>
  <div>
    <input
      v-model="myWriteTitle"
      @click="clickTextarea"
      type="text"
      class="myWriteTitle none form-control"
      maxlength="80"
      placeholder="제목을 입력하세요."
    />
    <textarea
      v-if="clickTA"
      spellcheck="false"
      v-model="myWriteContent"
      @input="autoResize"
      class="myWriteContent form-control"
      placeholder="오늘의 다이어리를 작성해 보세요!"
    />
    <ckeditor
      v-if="clickTA"
      @ready="onReady"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      class="myWriteContent ck-placeholder"
      id="editor"
      data-placeholder="Type some text..."
      style="border: 1px solid lightgrey; border-radius: 10px"
      >::before</ckeditor
    >
    <div v-if="clickTA">
      <div class="flex-wrap gap-2 d-flex">
        <div class="tag" v-for="(tag, index) in tags" :key="'tag' + index">
          <span class="btn-tag-sm d-flex align-items-center">
            <button @click="removeTag(index)" class="bi bi-x-lg mr-1"></button>
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
  </div>
  <div>
    <div class="LoginLine mb-3"></div>
  </div>
  <div class="d-flex justify-content-between align-items-center">
    <!-- <div class="d-flex gap-1">
      <div class="form-group centerz">
        <div class="filebox">
          <input
            ref="imgInput"
            @change="handleFileUpload($event)"
            type="file"
            id="ex_file"
            multiple
          />
          <label
            for="ex_file"
            ref="selectedFile"
            class="bi bi-file-image"
          ></label>
        </div>
      </div>
      <div class="filebox">
        <label
          for="ex_gif"
          ref="selectedGif"
          class="bi bi-filetype-gif"
        ></label>
        <input
          ref="gifInput"
          @change="handleGifUpload($event)"
          type="file"
          id="ex_gif"
        />
      </div>
      <div class="icon"></div>
      <div class="icon"></div>
    </div> -->
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
    <button
      @click="writeCompletedBtn"
      class="btn-regular"
      :class="{
        btnDisabled: myWriteTitle.length < 1 || myWriteContent.length < 1,
      }"
      :disabled="myWriteTitle.length < 1 || myWriteContent.length < 1"
    >
      작성완료
    </button>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import { computed } from "@vue/runtime-core";
import ClassicEditor from "@ckeditor/ck5/build/ckeditor";
// import InlineEditor from "@ckeditor/ck5/build/ckeditor";
import store from "@/store";

export default {
  data() {
    let token = store.state.users.me.token;
    let md = store.state.users.me.mid;
    return {
      shareable: true,
      openable: true,
      editor: ClassicEditor,
      // 여기에 본문
      editorData: "",
      editorConfig: {
        language: "ko",
        simpleUpload: {
          uploadUrl: "./api/diary/write/image",
          withCredentials: true,
          headers: {
            Authorization: token,
            mid: md,
          },
        },
      },
    };
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

    const router = useRouter();
    const store = useStore();
    const pp = ref(false);
    const diaryPrivacyCheck = ref(true);
    const commentPrivacyCheck = ref(true);
    const commentDisable = ref(false);
    const WCDisabled = ref(true);
    const myWriteTitle = ref("");
    const myWriteContent = ref("");
    const clickTA = ref(false);
    const selectedFile = ref(null);
    const selectedFiles = ref(null);
    const privacyPermit = ref(true);
    const tagValue = ref("");
    let tags = reactive([]);
    const file = ref("");

    // image upload
    // regex 가능한 정규표현식만 넣기
    const regex = new RegExp("(.*?).(exe|sh|zip|alz|tiff)$");
    const maxSize = 1024 * 1024 * 10; //10MB
    const state = reactive({
      imgInput: "",
      gifInput: "",
      appended: false,
      // uploaded : '',
    });
    const imgInput = ref("");
    const gifInput = ref("");

    const checkExtension = (fileName, fileSize) => {
      if (fileSize > maxSize) {
        alert("파일사이즈초과");
        return false;
      }
      if (regex.test(fileName)) {
        alert("해당파일은 업로드 될 수 없습니다.");
        return false;
      }
      return true;
    };

    const handleFileUpload = async () => {
      // console.log(e.target.files[0])
      const fileName = imgInput.value.value.split("\\").pop(); //맨끝만 나옴.
      console.log(fileName);
      // fileLabel.value.innerHTML = (imgInput.value.files.length-1)==0?"":
      //             fileName+" 외 "+(imgInput.value.files.length-1)+"개";
      let formData = new FormData();
      let files = imgInput.value.files;

      for (let i = 0; i < files.length; i++) {
        if (!checkExtension(files[i].name, files[i].size)) {
          // fileLabel.value.innerHTML = ""
          // this.value = ''
          return false;
        }
        formData.append("uploadFiles", files[i]);
        state.appended = true;
      }

      //전송할 파일이 없으면 여기서 끝.
      if (!state.appended) return;

      for (let value of formData.values()) console.log(value);

      // formData 보내지 말고 세팅만 해주고
      // submit할 때 한 번에 보낼 것
      console.log(formData);

      // const url = './api/diary/write/uploadAjax'
      // await axios.post(url, formData, {
      //   headers: {
      //     "Content-Type" : "multipart/form-data",
      //     "process-data" : false
      //     },
      // }).then(function(res){
      //   console.log(res.data)
      //   showResult(res.data);
      // }).catch(function(err){
      //   console.log(err)
      // })
    };

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

    // intersection observe로 무한 스크롤링

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

    const clickTextarea = () => {
      clickTA.value = true;
    };

    // 만약 백엔드에서 날짜 관련 자동으로 안받아지면 이거 하나하나 넣어야함
    const today = new Date();
    // time: today.getMonth(),

    const writeCompletedBtn = async () => {
      try {
        const url = "./api/diary/write";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          title: myWriteTitle.value,
          content: myWriteContent.value,
          openYN: diaryPrivacyCheck.value,
          replyYN: commentPrivacyCheck.value,
          writer: store.state.users.me.id,
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
        myWriteTitle.value = "";
        myWriteContent.value = "";
        tagValue.value = "";
        privacyPermit.value = true;
        pp.value = false;
        tags.length = 0;
        router.go(0);
      } catch (err) {
        console.log(err);
      }
    };

    const autoResize = (e) => {
      e.target.style.height = "auto";
      e.target.style.height = `${e.target.scrollHeight}px`;
    };

    return {
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
      clickTextarea,
      clickTA,
      selectedFile,
      selectedFiles,
      handleFileUpload,
      handleGifUpload,
      today,
      privacyPermit,
      me,
      tagValue,
      tags,
      addTag,
      removeTag,
      file,
      regex,
      maxSize,
      state,
      checkExtension,
      imgInput,
      gifInput,
      onReady,
      // fileChange
    };
  },
};
</script>

<style lang="sass" scoped>
.ck-placeholder::before
  color: #d21714

.tagContainer
  border: 1px solid lightgrey
  border-radius: 10px

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
