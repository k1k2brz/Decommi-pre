<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">마이페이지</span>
    </div>
  </div>
  <div class="w-100 d-flex justify-content-between">
    <div class="d-flex w-100">
      <MyCalender class="mr-3" />
      <TodoForm />
    </div>
  </div>
  <div class="d-flex flex-column gap-5">
    <div>
      <h3 class="mt-5 pt-5">활동기록</h3>
      <div class="position-relative">
        <div class="position-absolute">시간 남으면 도표 만들어 넣을 것</div>
      </div>
    </div>
    <div class="pt-5">
      <h3>자주 사용하는 태그</h3>
      <div class="mb-4 mt-1 subtext">내가 자주 사용하는 태그입니다.</div>
      <div class="backgrondBox pt-4 pb-4 pr-4 pl-4">
        <div class="grid pb-2">
          <div class="bold">태그이름</div>
          <div class="bold">태그 사용횟수</div>
          <div class="bold">전체 인기도</div>
          <div class="bold">컨텐츠</div>
          <div class="bold">최근 사용일</div>
        </div>
        <div
          class="grid freTag pt-1"
          v-for="(i, item, index) in frequentlyUsedTag"
          :key="i + item + index"
        >
          <!-- <div class="grid" v-for="(n, idx) in i" :key="n + idx"> -->
          <div>
            {{ i[0] }}
          </div>
          <div>
            {{ i[1] }}
          </div>
          <div>
            {{ i[2] }}
          </div>
          <div>
            {{ i[3] }}
          </div>
          <div>
            {{ i[4] }}
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
  <div class="pt-5">
    <h3 class="">내가 관심있는 태그</h3>
    <div class="d-flex justify-content-between mb-4 mt-1">
      <div class="subtext">관심있는 태그를 찾아보세요!</div>
      <button
        @click="btnTagEdit"
        style="text-decoration: none"
        class="text-btn routerHover mt-2"
      >
        태그 수정하기
      </button>
    </div>
    <div class="purple-box pl-4 pr-4">
      <div class="input-group mb-5">
        <input
          type="text"
          class="form-control"
          placeholder=""
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          태그추가
        </button>
      </div>
      <hr class="mb-5" />
      <div class="ml-2 mr-2 d-flex justify-content-between">
        <div class="flex-wrap gap-2 d-flex">
          <div class="tag" v-for="(tag, index) in myFavTags" :key="tag + index">
            <span class="btn-tag d-flex align-items-center">
              <button
                @click="deleteTag(tag, index)"
                class="bi bi-x-lg mr-1"
              ></button
              >{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodoForm from "@/pages/todos/IndexPage.vue";
import MyCalender from "@/components/MyCalender.vue";
import { reactive } from "@vue/reactivity";

export default {
  setup() {
    const myFavTags = reactive([
      "#인테리어 디자인",
      "#독서",
      "#운동",
      "#시네마토그래피",
      "#연극",
      "#클래식",
      "#인테리어 디자인",
      "#독서",
      "#운동",
      "#시네마토그래피",
      "#연극",
      "#클래식",
      "#인테리어 디자인",
      "#독서",
      "#운동",
      "#시네마토그래피",
      "#연극",
      "#클래식",
    ]);
    const frequentlyUsedTag = reactive({
      json1: ["#인테리어 디자인", "180", "96%", "???", "2022.09.13"],
      json2: ["#연극", "144", "89%", "???", "2022.09.10"],
    });

    const deleteTag = (tag, index) => {
      console.log(tag);
      console.log(index);
      myFavTags.splice(index, 1);
    };

    const btnTagEdit = () => {};

    return { myFavTags, frequentlyUsedTag, deleteTag, btnTagEdit };
  },
  components: { TodoForm, MyCalender },
};
</script>

<style lang="sass" scoped>
.btn-outline-secondary
  border: lightgrey solid 1px

.purple-box
  padding: 40px 0 40px 0

.routerHover
  color: lightgrey
  &:hover
    color: #AE6FFF

.grid
  display: grid
  grid-template-columns: 2fr 3fr 2fr 2fr 1fr

.purple-box
  border-radius: 10px

button
  background: none
  border: none

.freTag
  font-size: 15px

.btn-tag
  padding: 5px 12px
  background-color: #AE6FFF
  border: none
  border-radius: 20px
  color: white
  font-weight: 400
  font-size: 15px
  white-space: nowrap

.subtext
  font-size: 15px
  font-weight: 300
  color: #6C6C6C
</style>
