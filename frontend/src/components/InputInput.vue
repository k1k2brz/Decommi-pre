<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <!-- 컴포넌트를 옮기면서 더이상 v-model사용을 못하기 때문에 :value사용 -->
    <input :value="subject" @input="onInput" type="text" class="form-control" placeholder="제목을 입력해주세요." />
    <!-- subject 공백시 에러 메세지 띄우는 div -->
    <div v-if="error" style="color: red">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  setup() {
    // emit을 받아왔음으로 setup의 props와 emit을 지운다
    // emit이 실행되며 subject의 input이 부모 컴포넌트의 todo에도 실시간 업데이트 됨
    const { emit } = getCurrentInstance();
    const onClick = (page) => {
      emit("click", page);
    };
    const onInput = (e) => {
      //subject input안의 값이 target
      // update-subject를 콜론으로 바꿔줌(TodoForm에서 v-model을 통해 subject를 받기위해)
      // vue에서 v-model로 emit을 쏴주기 위한 약속 (update:프롭스이름)
      emit("update:subject", e.target.value);
    };
    return {
      onInput,
      onClick,
    };
  },
};
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
