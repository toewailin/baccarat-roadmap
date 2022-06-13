<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/index";

* {
  box-sizing: border-box !important;
}

body,
html,
#app {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: theme("colors.black");
  color: theme("colors.blue.50");
}
</style>
