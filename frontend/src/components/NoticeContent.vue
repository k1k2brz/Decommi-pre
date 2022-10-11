<template>
  <div class="colors d-flex justify-content-between mb-2">
    <div class="d-flex flex-row">
      <div class="hbnoMargin">
        <span>{{ notice.hbno }}</span>
      </div>
      <span>{{ notice.helpType }}</span>
      <div class="contentTitle">
        <span @click="hbnoTest(notice.hbno)" type="button" class="card-title">{{
          notice.title
        }}</span>
      </div>
    </div>
    <div class="d-flex flex-row">
      <div>
        <span>{{ notice.modDate.split("-")[0] }}.</span>
        <span>{{ notice.modDate.split("-")[1] }}.</span>
        <span>{{ notice.modDate.split("-")[2].split("T")[0] }}</span>
      </div>
      <div class="margin">
        <span>관리자</span>
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
    notice: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    console.log(props.notice);
    const state = reactive({
      hbno: "",
    });
    const hbnoTest = (hbno) => {
      router.push(`/NoticeRead?id=${hbno}`);
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

.margin
  margin-left: 20px
  width: 80px

.contentTitle
  margin-left: 40px
  &:hover
    color: black

.card-title
  &:hover
    font-weight: 500
    color: #AE6FFF


</style>
