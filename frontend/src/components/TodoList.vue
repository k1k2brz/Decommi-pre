<template>
  <!-- <div v-for="(todo, index) in todos" :key="todo.id" class="card mt-2"> -->
  <!-- @click의 코드가 밑의 div 클릭시 페이지 이동하도록 해줌 -->
  <!-- todos를 items라는 props로 내려보낸다 -->
  <List :items="todos">
    <!-- template는 아무것도 설정하지 않았을 때 기본으로 default다 -->
    <template #default="{ item, index }">
      <!-- ListList에서 올려준 props를 item에 접근해서 사용 -->
      <div
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input
            class="ml-2 mr-2"
            type="checkbox"
            :checked="item.completed"
            @change="toggleTodo(index, $event)"
            @click.stop
          />
          <!-- change에 stop걸면 위의 div가 먼저 실행되어 링크넘어감 그럴땐 따로 걸어주자 -->
          <span :class="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <!-- 빨간버튼 -danger -->
          <!-- .stop 버블링 막기 (=stopPropagation) -->
          <button
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
  <!-- </div> -->
  <teleport to="#modal">
    <div class="backgroundBox">
      <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
    </div>
  </teleport>
</template>

<script>
// moveToPage사용을 위한 useRouter
import { useRouter } from "vue-router";
import Modal from "@/components/DeleteModal.vue";
import { ref, getCurrentInstance } from "vue";
import List from "@/components/ListList.vue";
// import { watchEffect } from "vue";
export default {
  // App의 todos에 접근 가능해짐
  //   props: ["todos"],

  // 타입 정하기
  components: {
    Modal,
    List,
  },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  //노란색 경고창 Vue warn어쩌고가 안뜨려면 emits추가
  emits: ["toggle-todo", "delete-todo"],
  // context.emit의 코드를 줄이기 위해 { emit }으로 대체
  setup() {
    const { emit } = getCurrentInstance();
    const router = useRouter();
    const showModal = ref(false);
    const todoDeleteId = ref(null);
    // watchEffect(() => {
    // console.log(props.todos.length);
    // 처음에 ref([])이라 0으로 받고 나중에 5페이지가 됨으로 5를 다시 받음
    // });
    const toggleTodo = (index, event) => {
      emit("toggle-todo", index, event.target.checked);
    };

    // 일단은 delete창 누르면 Modal창 열리는 함수
    // 위에 todo.id를 받았기 때문에
    const openModal = (id) => {
      todoDeleteId.value = id;
      showModal.value = true;
    };

    // 모달을 삭제하기 때문에 원래대로 돌려줌
    const closeModal = () => {
      todoDeleteId.value = null;
      showModal.value = false;
    };

    const deleteTodo = () => {
      emit("delete-todo", todoDeleteId.value);
      //삭제 버튼 누른 뒤 모달창 닫히게 하기
      showModal.value = false;
      todoDeleteId.value = null;
    };

    const moveToPage = (todoId) => {
      // 아래의 방법은 간단하나 대규모 작업시 하나씩 수정해줘야함
      // router.push("/todos/" + todoId);
      // 아래의 방법은 이름만 같으면 주소 바꿔도 받아와짐
      router.push({
        name: "Todo",
        params: {
          id: todoId,
        },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      showModal,
      openModal,
      closeModal,
    };
  },
};
</script>

<style></style>
