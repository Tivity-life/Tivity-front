<template>
  <div class="container mt-5 text-center">
    <Menu />
    <!-- We have to add something here.  -->
    <p class="h16"> Click something ! </p>
  </div>
</template>

<script>
import Menu from "../navigationMenu/navigationMenu.vue";
export default {
  name: "Start",
  components: {
    Menu,
  },
};
</script>
