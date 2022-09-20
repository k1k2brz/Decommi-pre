<template>
  <div class="tagBox d-flex flex-column">
    <div class="mt-4 mb-1 d-flex justify-content-center">
      <p class="filterTitle">검색어 필터</p>
    </div>
    <div class="p-3 d-flex height100 justify-content-between flex-column">
      <div class="ml-2 mr-2 d-flex justify-content-between">
        <div class="flex-wrap gap-2 d-flex">
          <div class="tag" v-for="(tag, index) in tags" :key="'tag' + index">
            <span class="btn-tag-sm d-flex align-items-center">
              <button
                @click="removeTag(index)"
                class="bi bi-x-lg mr-1"
              ></button>
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div
        class="input-group mb-3 mt-3 d-flex justify-content-center align-items-center"
      >
        <div class="d-flex justify-content-center align-items-center w-95">
          <input
            v-model="tagValue"
            @keyup.enter="addTag"
            type="text"
            class="form-control mr-1"
            placeholder="태그 검색"
          />
          <button
            @click="addTag"
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            <i class="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";

export default {
  setup() {
    const tagValue = ref("");
    let tags = reactive([]);

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

    return { tagValue, tags, addTag, removeTag };
  },
};
</script>

<style lang="sass" scoped>
.btn-outline-secondary
  &:hover
    background-color: #AE6FFF
    border: 1px solid #AE6FFF

.tagBox
    border-radius: 5px
    min-height: 400px

.height100
    height: 100%
</style>
