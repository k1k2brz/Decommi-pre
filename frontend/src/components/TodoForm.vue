<template>
  <div v-if="loading">loading...</div>
  <!-- save버튼 작동을 위한 submit onsave추가 -->
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <!-- <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" /> -->
        <!-- subject 공백시 에러 메세지 띄우는 div -->
        <!-- <div v-if="subjectError" style="color: red">
            {{ subjectError }}
          </div>
        </div> -->
        <!-- String으로 가기 때문에 :필요없음 -->
        <!-- subject props로 내려보낸다 -->
        <!-- v-model걸고 input을 받는 inputinput의 props이름 넣어준다 -->
        <!-- 여러개를 받고 싶을 땐 v-model추가 후 : 뒤만 바꾼다 -->
        <!-- 하나만 받을 시 v-model="받는거" 해도 됨 -->
        <Input
          label="Subject"
          v-model:subject="todo.subject"
          :error="subjectError"
        />
      </div>
      <!-- editing일 때만 보는 if문 (create todo에서 status안보이게) -->
      <div v-if="editing" class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? "Completed" : "Incompleted" }}
            </button>
            <!-- :class로 상황에 따라 버튼색 변경 -->
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label>Body</label>
          <textarea
          style="resize: none;"
          placeholder="내용을 입력해주세요."
            v-model="todo.body"
            class="form-control"
            id=""
            cols="30"
            rows="10"
          >
          </textarea>
        </div>
      </div>
    </div>
    <!-- disabled앞에 bind를 안붙이면 String으로 들어간다 -->
    <!-- 데이터가 같으면 Save(update)를 못 누르도록 -->
    <!-- lodash다운 이후 할 것 (lodash는 배열 안의 객체들의 값을 핸들링할 때 유용함.) -->
    <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
      <!-- editing일 땐 Update로 아니면 Create로 버튼 텍스트 출력 -->
      {{ editing ? "수정하기" : "작성하기" }}
    </button>
    <!-- 캔슬 누르면 todos로 이동하도록 -->
    <button class="btn btn-outline-dark ml-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
</template>

<script>
// IndexPage에서 재사용을 위해 컴포넌트 따로 만들어 TodoForm에다 저장한 것

// id를 가진 todo의 정보 (url이 id에 접근)
// url에 적힌 값을 받아온다.
import { useRoute, useRouter } from "vue-router";
import axios from "@/axios";
import { ref, computed } from "vue";
import _ from "lodash";
// composable사용을 위한 import
import { useToast } from "@/composables/toast";
import Input from "@/components/InputInput.vue";

export default {
  components: {
    Input,
  },
  // 차이점을 주기 위한 props
  props: {
    editing: {
      type: Boolean,
      default: false,
    },
  },

  // props를 setup에다 넣어주어 props안 editing에 접근해준다.
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    // null설정하면 subject가 null이 되어 오류가 뜸
    // 그래서 첨에 true or false설정하는 변수 선언
    const todo = ref({
      subject: "",
      completed: false,
      body: "",
    });
    const subjectError = ref("");
    const originalTodo = ref(null);
    const loading = ref(false);
    // 중복된 코드를 composable - toast.js로 뺀다 (useToast를 받아주도록)
    const { toastMessage, toastAlertType, showToast, tiggerToast } = useToast();

    const todoId = route.params.id;

    // input에서 올라온 업데이트서브젝트 값
    // v-model에서 직접 emit을 받기때문에 필요없어짐
    // const updateTodoSubject = (newValue) => {
    //   todo.value.subject = newValue;
    // };

    const getTodo = async () => {
      // 기본 로딩값 false로 바꾸고 getTodo실행시 true를 주도록
      loading.value = true;
      try {
        const res = await axios.get(`todos/${todoId}`);
        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };

        // 응답을 받으면 false로 바꿈
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
        tiggerToast("Something went wrong", "danger");
      }
    };

    // 위의 리터럴 객체 비교
    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

    // true면 false로 false면 true로
    const toggleTodoStatus = () => {
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: "MyPage",
      });
    };

    if (props.editing) {
      //Todo 정보를 가져오는 함수
      getTodo();
    }

    // ref를 쓸 땐 항상 value를 써야한다.

    // Save버튼
    // Save완료 되면 tiggerToast발동
    const onSave = async () => {
      //onSave 시작시 초기화
      subjectError.value = "";
      // subject가 비어있을 시 입력불가 (create, update 공유하기 때문에 둘 다 뜸)
      if (!todo.value.subject) {
        subjectError.value = "Subject is required";
        return;
      }
      try {
        // 응답을 res변수에 담아주기 위해 선언
        let res;
        // 중복되는 데이터들은 리터럴 객체로 따로 빼준다.
        const data = {
          subject: todo.value.subject,
          completed: todo.value.completed,
          body: todo.value.body,
        };
        // editing일 땐 put create일 땐 post요청
        if (props.editing) {
          res = await axios.put(`todos/${todoId}`, data);
          // Update의 Save버튼을 눌렀으면 다시 disabled시켜주는 코드
          originalTodo.value = { ...res.data };
        } else {
          res = await axios.post("todos", data);
          // todo 추가시 empty string
          todo.value.subject = "";
          todo.value.body = "";
        }

        const message =
          "Successfully " + (props.editing ? "Updated!" : "Created!");
        tiggerToast(message);

        // 생성할 때면 TodoList로 이동
        if (!props.editing) {
          router.push({
            name: "MyPage",
          });
        }
      } catch (error) {
        console.log(error);
        tiggerToast("Something went wrong", "danger");
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      originalTodo,
      todoUpdated,
      showToast,
      toastMessage,
      toastAlertType,
      subjectError,
    };
  },
};
</script>

<style scoped>
/* Scoped를 사용하지 않으면 연결된 모든 곳(다른컴포넌트)에 Style이 적용됨 */

/* vue의 기본 애니메이션 작동법 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
</style>
