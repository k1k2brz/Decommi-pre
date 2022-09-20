<template>
  <!-- https://app.siter.io/ -->
  <div class="background">
    <div
      class="container container_default d-flex justify-content-center align-items-center p-0 m-0"
    >
      <div class="d-flex justify-content-center align-items-center">
        <div
          class="d-flex justify-content-center align-items-center flex-column absoulte"
        >
          <h1 class="yearText year1">1 YEAR</h1>
          <h1 class="yearText months12">12 MONTHS</h1>
          <h1 class="yearText textpurple days365">365 DAYS</h1>
          <p class="yearTextsub mt-3 mb-4">SOCIAL NETWORK PRIVACY DIARY</p>
          <router-link class="nav-link" :to="{ name: 'Signup' }">
            <button class="mainbtn">지금 시작하기</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  // 로그인한 사용자만 접근
  middleware: "anonymous",
};
</script>

<style lang="sass" scoped>
.yearText
  background: linear-gradient(150deg, #0D324D, #7F5A83)
  color: transparent
  -webkit-background-clip: text
  font-family: 'Noto Sans KR', sans-serif
  font-size: 90px
  font-weight: 900
  line-height: 110%

.yearTextsub
  font-family: 'Noto Sans KR', sans-serif
  font-size: 20px
  font-weight: 400
</style>
