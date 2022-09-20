<template>
  <!-- 보낸 todo를 받아(items) item으로 하나씩 -->
  <div v-for="(item, index) in items" :key="item.id" class="card mt-2">
    <!-- TodoList의 <List>로 감싼 자리가 Slot으로 들어온다 -->
    <!-- item을 List로 올려보내기 위해 -->
    <slot :item="item" :index="index"></slot>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
