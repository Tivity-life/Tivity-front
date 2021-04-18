<template>
  <Header />
  <br />
  <HomePageSignUp />
</template>

<script>
import Header from "./components/Header.vue";
import HomePageSignUp from "./components/home-page/HomePageSignUp.vue";

export default {
  name: "App",
  components: {
    Header,
    HomePageSignUp,
  },
};
</script>

<style>
</style>
