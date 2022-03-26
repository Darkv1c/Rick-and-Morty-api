<template lang="">
  <div>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    color: $clr-black;
    font-weight: 600;
}

#app {
    width: 100vw;
    min-height: 100vh;
    background-image: url("./assets/images/background.png");
    background-position: 50% 50%;
    background-size: cover;
    display: flex;
    flex-direction: column;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba($clr-black, 0.5);
}

::-webkit-scrollbar-thumb {
    background-color: rgba($clr-green, 0.8);
    border-radius: 50px;

    :hover {
        background-color: rgba($clr-green, 1);
    }
}
</style>