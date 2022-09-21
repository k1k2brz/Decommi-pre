<template>
  <div class="top-margin">
    <div class="mb-4">
      <span class="home-title">나의 관심태그</span>
    </div>
  </div>
  <div>여기로 말고 태그 추가 페이지로 이동</div>
  <div>삭제는 그냥 마이페이지에서 가능하게 하자</div>
  <div>제일 메인페이지 꾸밀 것</div>
  <div>Disabled해야 될 버튼들 보기</div>
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
  >
    <MiniPost v-for="content in 4" :key="content" />
  </div>
</template>

<script>
import MiniPost from "@/components/MiniPost.vue";
export default { components: { MiniPost } };
</script>
