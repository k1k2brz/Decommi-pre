<template>
  <div
    class="container container_default d-flex justify-content-center align-items-center p-0 m-0 flex-column"
  >
    <div class="d-flex justify-content-center align-items-center flex-column">
      <p class="success mb-2">
        <span class="success purple-color">다이어리 작성이 완료</span
        >되었습니다.
      </p>
      <span class="success-sm"
        >내가 작성한 #태그와 비슷한 다이어리를 찾아보세요.</span
      >
    </div>
    <div class="stroke-default"></div>
    <div class="d-flex flex-column w-100">
      <div class="mb-4">
        <span class="mini-title">#연극</span>
      </div>
      <div class="d-flex gap-4 w-100">
        <div class="backgrondBox p-4 w-50">
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
        <div class="backgrondBox p-4 w-50">
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
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
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
</style>
