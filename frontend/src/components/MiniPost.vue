<template>
  <div class="p-0 m-0">
    <div>
      <div class="backgrondBox p-4">
        <div class="d-flex justify-content-between flex-column gap-4">
          <div class="d-flex flex-column gap-1">
            <h5 class="card-title">{{ bm.title }}</h5>
            <div class="d-flex align-items-center">
              <span class="days">{{ bm.regDate.split("-")[0] }}.</span>
              <span class="days">{{ bm.regDate.split("-")[1] }}.</span>
              <span class="days">{{
              bm.regDate.split("-")[2].split("T")[0]
              }}</span>
              <span class="ml-1 lastTime margin5">{{
              getTimeFromJavaDate(bm.regDate)
              }}</span>
            </div>
          </div>
          <span class="card-text">{{bm.content}}</span>
        </div>
        <div class="d-flex justify-content-end">
          <button class="font12">게시글 전체보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bm: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props.bm)

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
    return { getTimeFromJavaDate }
  }
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
  color: skyblue
  text-decoration: none
  border: none
  background: none

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
