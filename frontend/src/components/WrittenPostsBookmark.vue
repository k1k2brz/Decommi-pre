<template>
    <div class="d-flex container bmSave position-relative">
        <div class="d-flex flex-column box-shadow position-absolute zindex p-3 gap-2" style="min-width: 250px">
            <div class="d-flex justify-content-between">
                <div style="margin: auto; width: 100%">
                    <span class="bold">내 북마크에 저장</span>
                </div>
                <button @click="bookmarkPlus" class="text-btn-big">+</button>
            </div>
            <div class="stroke-default"></div>
            <div @click="bookmarkSaveBtn" class="mt-2 d-flex gap-3">
                <button class="d-flex gap-3 bookmarkBtn">
                    <div class="box"></div>
                    <span>bookmark1</span>
                </button>
            </div>
        </div>
    </div>
    <div>
        <div v-if="addBookmark" class="container report position-relative">
            <div class="d-flex flex-column box-shadow position-absolute zindex p-3 gap-2">
                <div class="d-flex justify-content-between">
                    <div>
                        <!-- style="margin: auto" -->
                        <span class="bold">북마크를 추가해주세요</span>
                    </div>
                </div>
                <div class="stroke-default"></div>
                <div class="gap-2 mt-1 d-flex flex-column justify-content-center">
                    <input v-model="sendBookmarkInput" maxlength="20" type="text" class="form-control" />
                    <button @click="sendBookmark" class="btn-regular">
                        북마크 생성
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="bookmarkSaveCheck" class="container bm-container d-flex position-absolute">
        <div class="position-relative bookmarks flex-wrap bg-white d-flex box-shadow p-3">
            <span class="ml-3 d-flex">북마크가 저장되었습니다.</span>
            <button @click="bookmarkChecking" class="text-btn pr-3">
                저장된 북마크 확인하기
            </button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const addBookmark = ref(false);
        const sendBookmarkInput = ref("");
        const bookmarkSaveCheck = ref(false);

        const bookmarkSave = computed(() => {
            return store.state.posts.bookmarkSave
        })

        const bookmarkPlus = () => {
            // 북마크 모달창
            // store.state.posts.bookmarkSave = false;
            addBookmark.value = true;
            console.log(addBookmark.value)
        };

        const sendBookmark = () => {
            console.log(sendBookmarkInput.value);
            sendBookmarkInput.value = "";
            addBookmark.value = false;
            // store.state.posts.bookmarkSave = true;
        };

        const bookmarkSaveBtn = () => {
            if (bookmarkSaveCheck.value == false) {
                bookmarkSaveCheck.value = true;
                store.state.posts.bookmarkSave = false;
                setTimeout(() => {
                    // 마우스가 올라가 있으면 사라지지 않게 이벤트 추가
                    // Fade 애니메이션 줄 것
                    bookmarkSaveCheck.value = false;
                }, 5000);
            } else if (bookmarkSaveCheck.value == true)
                bookmarkSaveCheck.value = false;
        };

        const bookmarkChecking = () => {
            router.push({
                name: "BookMark",
            });
        };

        return {
            bookmarkSave,
            bookmarkPlus,
            addBookmark,
            sendBookmark,
            sendBookmarkInput,
            bookmarkSaveCheck,
            bookmarkSaveBtn,
            bookmarkChecking,
        }
    }
}

</script>

<style lang="sass" scoped>
.box
    width: 30px
    height: 30px
    border-radius: 5px
    background-color: #D8D8D8
    
.bmSave
  top: 10px

.text-btn-big
  padding: 0
  color: #AE6FFF
  background: none
  border: none
  font-weight: 500
  font-size: 14px
  font-size: 20px
  font-weight: 700

.zindex
  z-index: 10
  background-color: white

.bookmarkBtn
  border: none
  background: none

.report
  top: 10px

.bookmarks
    font-size: 15px
    top: 80px
    right: 11px
  
.bm-container
    width: 500px
</style>