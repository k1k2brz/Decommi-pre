<template>
  <div class="p-0 m-0">
    <div>
      <div class="backgrondBox p-4">
        <div class="d-flex justify-content-between flex-column gap-4">
          <div class="d-flex flex-column gap-1">
            <h5 class="card-title">고도를 기다리며를 보고</h5>
            <div class="d-flex align-items-center">
              <span class="days">2022.08.11</span>
              <span class="lastTime ml-1">1일 전</span>
            </div>
          </div>
          <span class="card-text">대충 비평인지 감상인지 모를 애매한 글</span>
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
  // props: {
  //   minipost: {
  //     type: Object,
  //     required: true,
  //   },
  // },
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
