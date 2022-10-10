<template>
  <div v-if="state.purple" class="tags">
    <button @click="tagSelectBtn" class="btnTag d-flex align-items-center">
      {{ tag }}
    </button>
  </div>
  <div v-else class="tags">
    <button @click="tagSelectBtn" class="btnTag2 d-flex align-items-center">
      {{ tag }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
// import { getCurrentInstance } from "vue";

export default {
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    // const { emit } = getCurrentInstance();
    const store = useStore();
    const state = reactive({
      liketag: [],
      tagNeme: "",
      purple: false,
    });
    let tagSelection = reactive([]);

    const tagSelectBtn = (e) => {
      tagSelection.push(e.target.innerHTML);
      const url = "/decommi/member/editliketaglist";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        tagName: e.target.innerHTML,
        email: store.state.users.me.email,
      };
      console.log(body);
      axios
        .post(url, body, { headers })
        .then((res) => {
          state.purple = res.data;
          // emit("tagButton", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    // const tagPurple = () => {
    //   const url = "/decommi/member/liketaglist";
    //   const headers = {
    //     "Content-Type": "application/json",
    //   };
    //   const body = {
    //     email: store.state.users.me.email,
    //   };
    //   console.log(body);
    //   axios
    //     .post(url, body, { headers })
    //     .then((res) => {
    //       state.purple = res.data;
    //       // emit("tagButton", res.data);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // };

    // tagPurple();

    const tagList = async () => {
      const headers = {
        "Content-Type": "application/json",
        Authorization: store.state.users.me.token,
        mid: store.state.users.me.mid,
      };
      const body = {
        email: store.state.users.me.email,
      };
      await axios
        .post("/decommi/member/liketaglist", body, { headers })
        .then((res) => {
          state.liketag.push(...res.data);
          if (state.liketag.includes(props.tag) == true) {
            state.purple = true;
          }
          //   for (let i = 0; i < favTags.value.length; i++) {
          //     const element = favTags.value[i];
          //     if (state.liketag.includes(element) == true) {
          //       console.log(element);
          //       state.allTag.push(element);
          //     } else if (state.liketag.includes(element) == false) {
          //       state.allTag.push(element);
          //     }
          //   }
          //   console.log(state.allTag);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    tagList();
    return { tagList, state, tagSelection, tagSelectBtn };
  },
};
</script>

<style lang="sass">
.btnTag
  padding: 5px 12px
  background-color: #AE6FFF
  border: none
  border-radius: 20px
  color: white
  font-weight: 400
  font-size: 15px
  white-space: nowrap

.btnTag2
  padding: 5px 12px
  background-color: #E1E8ED
  border: none
  border-radius: 20px
  color: darkgrey
  font-weight: 400
  font-size: 15px
  white-space: nowrap
</style>
