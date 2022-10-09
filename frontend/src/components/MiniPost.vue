<template>
  <div class="p-0 m-0">
    <div class="backgrondBox p-4">
      <div class="d-flex flex-column">
        <div class="d-flex mb-2">
          <h5>{{ bm.title }}</h5>
          <div>
            <span class="days ml-2">{{ bm.regDate.split("-")[0] }}.</span>
            <span class="days">{{ bm.regDate.split("-")[1] }}.</span>
            <span class="days">{{
              bm.regDate.split("-")[2].split("T")[0]
            }}</span>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button @click="postLink" class="font12">게시글 전체보기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    bm: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const postLink = () => {
      router.push(`/read?id=${props.bm.dino}`);
    };

    function getTimeFromJavaDate(s) {
      const cont = new Date(s);
      let date = new Date();
      let calculated = (new Date(date.getTime()) - cont) / 1000; //초 계산
      if (calculated < 60) {
        return "방금 전";
      } else if (calculated < 60 * 60) {
        return `${Math.round(calculated / 60)}분 전`;
      } else if (calculated < 60 * 60 * 24) {
        return `${Math.round(calculated / (60 * 60))}시간 전`;
      } else if (calculated < 60 * 60 * 24 * 7) {
        return `${Math.round(calculated / (60 * 60 * 24))}일 전`;
      } else if (calculated < 60 * 60 * 24 * 7 * 5) {
        return `${Math.round(calculated / (60 * 60 * 24 * 7))}주 전`;
      } else if (calculated > 31536000) {
        return `${Math.round(calculated / 31536000)}년 전`;
      }
    }
    return { getTimeFromJavaDate, postLink };
  },
};
</script>

<style lang="sass" scoped>
.stroke-default
  width: 100%
  height: 0.5px
  margin-top: 100px
  margin-bottom: 100px

.font12
  font-size: 12px
  color: #AE6FFF
  text-decoration: none
  border: none
  background: none
  &:hover
    color: #9b4efc

.card-title
   max-width: 480px
   text-overflow: ellipsis
   overflow: hidden
   word-break: break-word

   display: -webkit-box
   -webkit-line-clamp: 1 // 원하는 라인수
   -webkit-box-orient: vertical

.card-text
   max-width: 500px
   text-overflow: ellipsis
   overflow: hidden
   word-break: break-word

   display: -webkit-box
   -webkit-line-clamp: 3 // 원하는 라인수
   -webkit-box-orient: vertical

.backgrondBox
  max-width: 550
</style>
