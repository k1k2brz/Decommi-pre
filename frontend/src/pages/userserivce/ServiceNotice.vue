<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title purple-color">고객센터</span>입니다.
      </div>
      <div class="home-title">무엇을 도와드릴까요?</div>
    </div>
  </div>
  <div>
    <div class="d-flex gap-3">
      <router-link class="nav-link mr-3" :to="{ name: 'ServiceNotice' }"
        >공지사항</router-link
      >
      <router-link class="nav-link mr-3" :to="{ name: 'ServiceFaq' }"
        >FAQ</router-link
      >
    </div>
    <div class="purple mt-1"></div>
    <hr />
  </div>
  <div class="purple-box mb-4">
    <div class="d-flex justify-content-between flex-row">
      <div class="d-flex flex-row">
        <div class="hbno">
          <div>글번호</div>
        </div>
        <div>카테고리</div>
        <div class="contentTitle">
          <div>게시글</div>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div class="Timemargin">
          <div>작성시간</div>
        </div>
        <div class="margin">
          <div>작성자</div>
        </div>
      </div>
    </div>
    <hr class="mt-3 mb-4" />
    <notice-content
      v-for="notice in state.noticePosts"
      :key="notice"
      :notice="notice"
    />
  </div>
  <!-- <div class="m-3 d-flex justify-content-center">
    <i class="bi bi-chevron-double-left"></i>
    <i class="bi bi-chevron-left"></i>
    <span>page</span>
    <i class="bi bi-chevron-right"></i>
    <i class="bi bi-chevron-double-right"></i>
  </div> -->
  <div class="d-flex justify-content-center">
    <nav aria-label="Page">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            v-if="state.info.page != 1"
            @click="getListWithPage(state.info.page - 1)"
            >Previous</a
          >
        </li>
        <li
          :class="state.info.page == page ? 'page-item active' : 'page-item'"
          v-for="page in state.info.pageList"
          :key="page"
        >
          <a class="page-link" @click="getListWithPage(page)">{{ page }}</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            v-if="state.info.page != state.info.totalPage"
            @click="getListWithPage(state.info.page + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
  <div class="mb-3 d-flex justify-content-center gap-3">
    <div class="d-flex">
      <select class="form-select form-control" id="inputGroupSelect02">
        <option value="1">제목</option>
        <option value="2">내용</option>
        <option value="3">제목+내용</option>
      </select>
    </div>
    <input
      type="text"
      class="form-control serviceSearch"
      aria-label="Text input with segmented dropdown button"
    />
    <button class="btn-regular">검색</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import NoticeContent from "@/components/NoticeContent.vue";
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

export default {
  components: { NoticeContent },
  setup() {
    const store = useStore();
    const state = reactive({ noticePosts: [], body: 1, info: "" });
    onMounted(async () => {
      try {
        const url = "/decommi/help/notice";
        const headers = {
          "Content-Type": "application/json",
          Authorization: store.state.users.me.token,
          mid: store.state.users.me.mid,
        };
        const body = {
          page: state.body,
        };
        console.log(body);
        await axios.post(url, body, { headers }).then((res) => {
          state.noticePosts.push(...res.data.dtoList);
          state.info = JSON.parse(JSON.stringify(res.data));
          console.log("========================" + res.data.totalPage);
          console.log("page" + res.data.page);
          console.log("page" + res.data.size);
          console.log("page" + res.data.start);
          console.log("page" + res.data.end);
          console.log("page" + res.data.prev);
          console.log("page" + res.data.next);
          console.log("page" + res.data.pageList);
          res.data.writer;
        });
      } catch (err) {
        console.log(err);
      }
    });
    console.log(state.noticePosts);

    function getListWithPage(num) {
      let body = num;
      state.body = num;
      const url = "/decommi/help/notice";
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };

      axios.post(url, { page: body }, { headers }).then((res) => {
        state.noticePosts = [];
        state.noticePosts.push(...res.data.dtoList);
        state.info = JSON.parse(JSON.stringify(res.data));
        console.log("========================" + res.data.totalPage);
        console.log("page" + res.data.page);
        console.log("page" + res.data.size);
        console.log("page" + res.data.start);
        console.log("page" + res.data.end);
        console.log("page" + res.data.prev);
        console.log("page" + res.data.next);
        console.log("page" + res.data.pageList);
        res.data.writer;
      });
    }
    return { store, state, getListWithPage };
  },
};
</script>

<style lang="sass" scoped>
.page-item
  cursor: pointer

hr
  margin: 0
  padding: 0

.purple-box
  padding: 40px 30px

.purple
  background-color: #AE6EFF
  width: 70px
  height: 8px

.nav-link
  font-size: 18px
  font-weight: 500

.serviceSearch
  width: 400px

.btn-regular
  width: 65px

.hbno
  width: 72px

.hbnoMargin
  margin-left: 15px
  width: 60px

.Timemargin
  width: 70px

.margin
  margin-left: 20px
  width: 80px

.contentTitle
  margin-left: 53px
</style>
