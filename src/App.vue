<template>
<div>
  <Header />
  <br />
  <HomePageSignUp />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import HomePageSignUp from "./components/home-page/HomePageSignUp.vue";
import login from "./components/login/login.vue"
import signin from "./components/sign-in/signin.vue"


export default {
  name: "App",
  components: {
    Header,
    HomePageSignUp,
    'login': login,
    'signin': signin,
  },
};
</script>

<style>
</style>
