<template>
  <!-- nav를 따로 뺀다 (가독성)-->
  <!-- <div class="bg"> -->
  <div class="container absolute bg100">
    <div class="relative">
      <Navbar class="fixed-top backgroundColor" />
      <!-- index.js에서 설정한 home component가 여기에 들어온다 -->
      <!-- 설정에 따라 Home컴포 todos컴포가 들어간다는 뜻 -->
      <router-view />
    </div>
  </div>
  <!-- vue에서 기본적으로 제공하는 애니메이션 (공식 웹 읽어보기)-->
  <!-- 창이 이동했을때도 위에 메세지 띄어 줌 props안받기 때문에 지움 -->
  <Footer />
  <!-- </div> -->
</template>

<script>
import Navbar from "@/components/NavBar.vue";
import Footer from "@/components/FooterV.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style lang="sass">
.backgroundColor
  background-color: white

.bg100
  width: 100%

.bg
  background-color: #FBF9FF
</style>
