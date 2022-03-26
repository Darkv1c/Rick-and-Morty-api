<template>
  <div class="d-flex index-container">
    <Header title="Rick & Morty" class="index-header"/>
    <h2 class="test">Hola</h2>
  </div>
</template>

<style lang="scss" scoped>
.test{
    color: $red;
}
  .index-container{
    height: 100vh;
  }
  .index-card-list{
    min-height: 70vh;
    margin: auto;
    box-sizing: border-box;
    padding: 2% 5% 2% 5%;
  }

//   @media screen and (max-width: 700px) {
//     .index-card-list{
//       padding: 0;
//       margin: 0;
//       max-height: calc(100vh - 60px);
//     }
//     .index-header{
//       display: none;
//     }
//   }
</style>
