<template>
  <div class="top-margin">
    <div class="mb-4">
      <div class="home-title">
        <span class="home-title">태그찾기</span>
      </div>
      <div class="mb-5 mt-1">관심있는 태그를 찾아보세요!</div>
    </div>
  </div>
  <div>
    <div class="d-flex gap-3">
      <router-link class="nav-link mr-3" :to="{ name: 'PopularTag' }"
        >인기태그</router-link
      >
      <router-link class="nav-link mr-3" :to="{ name: 'RecommendTag' }"
        >맞춤 추천태그</router-link
      >
    </div>
    <div class="purple mt-1"></div>
    <hr />
  </div>
  <div class="purple-box">
    <div class="d-flex justify-content-between mb-2">
      <span>상위태그 하위태그 구별을 어떻게 할 것인지 백엔드팀과 상의</span>
    </div>
    <div class="d-flex flex-column gap-2">
      <div class="d-flex flex-column gap-2">
        <hr />
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <span class="bold font-tag mr-1">#고양이</span>
              <span class="font-tag-sm">3500posts · 12035favorites</span>
            </div>
            <button class="bi bi-three-dots"></button>
          </div>
          <span class="font-tag-sm"
            >#러시안 블루 · #페르시안 · #샴 · #벵갈 · #먼치킨 · #길고양이</span
          >
        </div>
        <div class="orange p-3">
          <div>3500개의 다이어리</div>
          <div>12035명이 이 태그에 관심있어 합니다.</div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped>
hr
    margin: 0
    padding: 0

.purple-box
    padding: 40px 30px

.purple
    background-color: #AE6EFF
    width: 70px
    height: 8px

.nav-link
    font-size: 18px
    font-weight: 500

.font-tag
  font-size: 18px

.font-tag-sm
  font-size: 14px
  color: #6C6C6C

.orange
  background-color: #FFECEC
  border-radius: 15px
</style>
