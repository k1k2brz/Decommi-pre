<template>
  <h4>double count Computed: {{ doubleCountComputed }}</h4>
  <h4>double count Computed: {{ doubleCountComputed }}</h4>
  <h4>double count method: {{ doubleCountMethod() }}</h4>
  <h4>double count method: {{ doubleCountMethod() }}</h4>
  <button @click="count++">Add One</button>
</template>

<script>
import { computed, ref } from "vue";

export default {
  setup() {
    //computed 버전
    //숫자 증가
    const count = ref(1);
    const doubleCountComputed = computed(() => {
      count.value * 2;
      return console.log(count.value);
    });

    // computed와의 차이 : 괄호 안 값 받아와서 사용 가능 (이미 계산되어 출력되므로 한 번)
    // computed는 한 번만 실행되지만 함수형은 {{ }}를 사용하는 만큼(호출) 실행
    const doubleCountMethod = () => {
      count.value * 2;
      return console.log(count.value);
    };
    return {
      count,
      doubleCountComputed,
      doubleCountMethod,
    };
  },
};
</script>

<style></style>
