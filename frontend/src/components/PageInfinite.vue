<template>
  <div></div>
  <button>더보기</button>
</template>

<script>
export default {
  //     window.addEventListener("scroll", windowSize)
  //     function windowSize(){
  //  if(window.innerHeight+window.scrollY>=document.body.offsetHeight){
  //         getMoreCards()
  //       }
  //       }
  // 이렇게 해서 창 내리면 getMoreCards() 불러오기
  //     function getMoreCards(){
  //       body.reqPage+=1
  //         getCardsInformation()
  // }
  //  getMoreCards() : reqPage 증가시켜서 다음 페이지 보여주게 하기 위한 준비 그리고 axios가 담긴 겟카드인포 넣어주기
  // 그런다음 axios가 담긴  getCardsInformation()라는 함수 안에
  //         if (body.reqPage == 0) {
  //           state.cards = res.data.articles;
  //         } else {
  //           for (let i = 0; i < 9; i++) {
  //             state.cards.push(res.data.articles[i]);
  //           }
  //         }
  // 이런식으로 reqPage가 0 이면 그냥 집어넣고 1 이상이면 그 밑에 push로 추가해주기
};
</script>

<style></style>
