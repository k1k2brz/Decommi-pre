<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">글 수정하기</span>
    </div>
  </div>
  <div>
    <input
      type="text"
      placeholder="제목"
      class="form-control my-3 rounded-0 title"
      v-model="title"
      id="title"
    />
    <ckeditor
      @ready="onReady"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
    <input
      type="text"
      v-model="tag"
      @keyup.space="makingTag"
      @keyup.enter="makingTag"
      placeholder="태그"
      class="form-control my-3 rounded-0 hashtag"
    />
    <div class="hashtags d-flex g-4 overflow-auto">
      <div
        class="btn-tag-sm tag d-flex justify-content-center align-items-center"
        v-for="(item, i) in taghistory"
        :key="item"
      >
        <span class="m-1">#{{ item }}</span>
        <button class="d-flex justify-content-center align-items-center px-1">
          <span v-on:click="deleteTag(i)">x</span>
        </button>
      </div>
    </div>
    <div class="tagwarning" ref="warning"></div>
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasBottom"
      aria-controls="offcanvasBottom"
    >
      수정하기
    </button>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "CKEditor",
  components: {
    ckeditor: CKEditor.component,
  },
  data: () => ({
    title: "",
    tag: "",
    taghistory: [],
    editor: ClassicEditor,
    editorData: "",
    editorConfig: {
      // The configuration of the editor.
      height: "500px",
      language: "ko",
    },
  }),
  methods: {
    onReady: function onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    makingTag: function () {
      let result = this.tag.trim().replace(/ /, "");
      if (result.length == 0) {
        this.$refs.warning.innerText = "공백은 태그로 사용이 불가능합니다";
        this.tag = "";
        return;
      }
      if (this.taghistory.includes(result)) {
        this.$refs.warning.innerText = "이미 등록된 태그입니다";
        this.tag = "";
        return;
      }
      this.taghistory.push(result);
      this.tag = "";
      console.log(result);
    },
    deleteTag: function deltag(i) {
      this.taghistory.splice(i, 1);
    },

    mounted() {
      console.log(this.$store.state.posts.mainPosts);
    },
  },

  // const removeTag = (index) => {
  //   tags.splice(index, 1);
  // };
  // }
};
</script>

<style lang="sass" scoprd>
.ck-editor__editable_inline
  max-height: 50vh
  height: 50vh
</style>
