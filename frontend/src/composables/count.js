import { reactive, toRefs } from "vue";

export const useCount = () => {
  const state = reactive({
    // count의 값이 reactive하기 않기 때문에 컴포넌트에 ++버튼을 만들어도 추가 X
    // 그래서 toRefs를 사용해야 count값이 ref로 바뀜
    count: 0,
  });

  return toRefs(state);
};
