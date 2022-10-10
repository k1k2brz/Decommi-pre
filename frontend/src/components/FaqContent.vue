<template>
  <div class="colors d-flex justify-content-between mb-2">
    <div class="d-flex flex-row">
      <div class="hbnoMargin">
        <span>{{ faq.hbno }}</span>
      </div>
      <div class="helpType d-flex justify-content-center">
        <span>{{ faq.helpType }}</span>
      </div>
      <div class="contentTitle">
        <span @click="hbnoTest(faq.hbno)" type="button" class="card-title">{{
          faq.title
        }}</span>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div>
        <span>{{ faq.modDate.split("-")[0] }}.</span>
        <span>{{ faq.modDate.split("-")[1] }}.</span>
        <span>{{ faq.modDate.split("-")[2].split("T")[0] }}</span>
      </div>
      <div class="margin">
        <span>{{ faq.content }}</span>
      </div>
    </div>
  </div>
  <hr />
</template>

<script>
import router from "@/router";
import { reactive } from "@vue/reactivity";
export default {
  props: {
    faq: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props.faq);
    const state = reactive({
      hbno: "",
    });
    const hbnoTest = (hbno) => {
      router.push(`/FaqRead?id=${hbno}`);
    };

    return { hbnoTest, state };
  },
};
</script>

<style lang="sass" scoped>
.hbnoMargin
  margin-left: 15px
  width: 60px
  color: black

.helpType
  width: 54px

.margin
  margin-left: 20px
  width: 80px

.contentTitle
  margin-left: 50px
  &:hover
    color: black

.card-title
  &:hover
    font-weight: 500
    color: #AE6FFF
</style>
