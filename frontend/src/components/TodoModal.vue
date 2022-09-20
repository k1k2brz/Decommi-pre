<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="backgroundBox d-flex gap-3 modal-content">
        <div class="modal-header">
          <!-- modal이나 button 등 props로 보낼 수 없는 경우 slot을 사용 -->
          <h5 class="modal-title">
            <!-- slot을 만들고 바뀌는 부분을 slot으로 채워줌 -->
            <!-- 각각 다른 이름으로 바꾸고 싶다면 name을 만든다 -->
            <slot name="title"></slot>
          </h5>
          <button type="button" class="close">
            <!-- 밑의 onClose는 여기서 다 받을 수 있는거? -->
            <span @click="onClose">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance } from "vue";
export default {
  // onClose만 필요해서 남기고 DeleteModal로 보내버림
  setup() {
    const { emit } = getCurrentInstance();
    // 부모 컴포넌트에서 close이벤트를 사용할 수 있도록
    const onClose = () => {
      emit("close");
    };

    return {
      onClose,
    };
  },
};
</script>

<style lang="sass" scoped>
.backgroundBox
  background-color: white
  padding: 30px
  border-radius: 15px
  
.modal-wrapper
  position: fixed
  z-index: 1050
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
</style>
