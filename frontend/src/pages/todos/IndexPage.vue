<template>
  <div class="w-30 d-flex flex-column flex-wrap p-0 m-0">
    <div class="backgrondBox p-4">
      <div class="d-flex flex-column">
        <div class="pb-3">
          <div class="todayTitle">
            7월 30일 <span class="purple-color">오늘의 할 일</span>
          </div>
        </div>
        <button class="btn btn-primary" @click="moveToCreatePage">
          Todo list 추가하기
        </button>
        <TodoList
          :todos="todos"
          @toggle-todo="toggleTodo"
          @delete-todo="deleteTodo"
        />
        <!-- <div clss="d-flex">
          <hr />
          <input
            class="form-control"
            type="text"
            v-model="searchText"
            placeholder="Search"
            @keyup.enter="searchTodo"
          />
        </div> -->
      </div>
      <!-- enter쳤을 때 이벤트발생 -->
      <!-- 자식 컴포넌트 생성 -->
      <!-- 자식 컴포넌트 emit안의 add-todo를 가져옴 -->
      <!-- <TodoSimpleForm @add-todo="addTodo" /> -->
      <div style="color: red">{{ error }}</div>

      <div v-if="!todos.length">There is nothing to display</div>
      <hr />
      <!-- 페이지네이션vue에서 props 받아오고 getTodos함수를 실행 -->
      <!-- v-if를 통해 페이지에 뭐가 있을때만 보이게 -->
      <div class="d-flex justify-content-center">
        <Pagenation
          v-if="todos.length"
          :numberOfPages="numberOfPages"
          :currentPage="currentPage"
          @click="getTodos"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
// 화면변경은 ref
// v-show가 if에 비해 초기 렌더비용 많이 듬
// @는 src를 가리킨다 복붙할 때 경로 고치기 싫으면 이렇게 쓰자
// import TodoSimpleForm from "@/components/TodoSimpleForm.vue";
import TodoList from "@/components/TodoList.vue";
import axios from "@/axios";
// // Toast로직을 Componsition함수로 추출하기 위한 import
// import Toast from "@/components/TodoToast.vue";
import { useToast } from "@/composables/toast";
import { useRouter } from "vue-router";
import Pagenation from "@/components/PageNation.vue";

// json-server를 사용

export default {
  components: {
    TodoList,
    Pagenation,
  },
  setup() {
    const router = useRouter();
    const todos = ref([]);
    const error = ref("");
    // total page 시작
    const numberOfTodos = ref(0);
    // 페이지 보여줄 한도
    let limit = 5;
    // 페이지 초기값
    const currentPage = ref(1);
    const searchText = ref("");

    // const a = reactive({
    //   b: 1,
    // });
    //함수 안의 reactive가 바뀌면 watchEffenct가 실행 (reactive와 state가 아니면 실행X)
    //numberOftodos만 바껴도 W.E가 발동 : 단, currentPage가 바껴도 둘 다 찍힘
    // 안에 값이 바뀌기만 하면 실행되므로 성능문제가 생길지도?
    // watchEffect(() => {
    // console.log(currentPage.value);
    // console.log(numberOfTodos.value);
    //   console.log(a.b);
    // });
    // a.b = 4;

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    // return되는 값을 대괄호 안에 넣는다
    const { toastMessage, toastAlertType, showToast, tiggerToast } = useToast();

    // currentPage.value를 고정으로
    // 검색어 db에 요청 보내면 거기서 검색어 포함 db를 1p에 띄워줄 것 (watch)
    const getTodos = async (page = currentPage.value) => {
      // 페이지 누를 때 그 페이지로 업데이트
      currentPage.value = page;
      try {
        // page와 limit을 받음
        // subject_like를 붙여서 특정 값을 받음
        // sort=id로 id정렬 // order=desc내림차순 (최근추가순)
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        );
        // db의 데이터 받아오기 res."data"
        // console.log(res.data);

        // 총 데이터 개수 찍기
        // console.log(res.headers["x-total-count"]);
        numberOfTodos.value = res.headers["x-total-count"];
        // 응답 데이터
        todos.value = res.data;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        tiggerToast("Something went wrong", "danger");
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      // 데이터베이스에 투두를 저장
      error.value = "";
      try {
        await axios.post("todos/", {
          // subject랑 completed가 db.json에 들어감
          subject: todo.subject,
          completed: todo.completed,
        });
        // getTodos추가로 todo입력시 6개 보이는 문제 해결
        getTodos(1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        tiggerToast("Something went wrong", "danger");
      }
      // .then((res) => {
      //   console.log(res);
      //   todos.value.push(res.data);
      // })
      // .catch((err) => {
      //   console.log(err);
      //   error.value = "Something went wrong.";
      // });
      console.log("hello");
    };

    // 함수명은 같은 컴포넌트 안에 있는것과 같으면 됨 (todoList와는 별개)
    const deleteTodo = async (id) => {
      error.value = "";
      // index를 통해 삭제할 아이디 찾음
      // const id = todos.value[index].id;
      // +id로 id를 지워달라는 요청을 한다.
      try {
        await axios.delete("todos/" + id);
        // 삭제시 5개 안보이는 문제 getTodos추가로 해결
        getTodos(1);
        // todos.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        tiggerToast("Something went wrong", "danger");
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = "";
      const id = todos.value[index].id;
      try {
        await axios.patch("todos/" + id, {
          completed: checked,
          // !todos.value[index].completed, < 이것보다 좀 더 정확하게 하기위해 checked
        });
        todos.value[index].completed = checked;
        // !todos.value[index].completed;
      } catch (err) {
        console.log(err);
        error.value = "Something went wrong.";
        tiggerToast("Something went wrong", "danger");
      }
    };

    const moveToCreatePage = () => {
      router.push({
        name: "TodoCreate",
      });
    };

    // clearTimeout사용을 위한 변수선언
    let timeout = null;
    // 위의 keyup이벤트 사용한 엔터치면 바로 요청
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };
    // watch로 서치 구현
    watch(searchText, () => {
      // 2초 이내로 쳤을 때 요청보내기 방지 (이벤트루프에서 빼버림)
      clearTimeout(timeout);
      // 검색시 한글자 치고 바로 요청 보내지 않도록 딜레이 줌
      timeout = setTimeout(() => {
        // 검색 할 때 마다 첫 페이지를 보여줄 수 있도록 (7이 2p에 있으면 1p에서 7만 보여주는)
        getTodos(1);
      }, 2000);
    });
    // 필터를 해서 searchText와 일치하는 경우에만
    // const filterTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter((todo) => {
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }

    //   return todos.value;
    // });

    return {
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      error,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
      toastMessage,
      toastAlertType,
      showToast,
      tiggerToast,
      moveToCreatePage,
    };
  },
};
</script>

<style lang="sass" scoped>
.todo
  color: gray
  text-decoration: line-through

.todayTitle,
.purple-color
  font-weight: 500
</style>
