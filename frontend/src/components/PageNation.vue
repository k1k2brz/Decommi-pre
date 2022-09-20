<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <!-- 첫 페이지때 Previous출력 안되게 -->
      <li v-if="currentPage !== 1" class="page-item">
        <!-- 현재페이지 -1 -->
        <a
          style="cursor: pointer"
          class="page-link"
          @click="onClick(currentPage - 1)"
        >
        <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <!-- numberOfPages만큼 {{ page }}에 하나씩 출력 -->
      <li
        v-for="page in numberOfPages"
        :key="page"
        class="page-item"
        :class="currentPage === page ? 'active' : ''"
      >
        <!-- currentPage와 page가 같을 때 active로 색 넣어줌 -->
        <!-- 클릭시 getTodos함수 실행시켜 페이지 이동 (현재page)-->
        <a style="cursor: pointer" class="page-link" @click="onClick(page)">{{
          page
        }}</a>
      </li>
      <li v-if="numberOfPages !== currentPage" class="page-item">
        <a
          style="cursor: pointer"
          class="page-link"
          @click="onClick(currentPage + 1)"
          >
          <span aria-hidden="true">&raquo;</span>
          </a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { getCurrentInstance } from "vue";

export default {
  props: {
    numberOfPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  // getTodos가 받는 Page의 숫자를 emit을 통해 위로 올려줌
  // getTodos를 onClick으로 대체
  // emits의 이름은 click으로
  emits: ["click"],
  setup() {
    const limit = 5
    const { emit } = getCurrentInstance();
    const onClick = (page) => {
      // emit을 위로 올려주는 작업
      emit("click", page);
    };
    return {
      onClick,
      limit,
    };
  },
};
</script>

<style></style>
