<template>
  <div :class="[menuVisibility ? 'visible' : 'd-none','container mt-5']">
    
    <Menu />
      <router-view></router-view>

  </div>
</template>

<script>
import Menu from "../components/navigationMenu/navigationMenu";

export default {
  components: { Menu },
  data() {
    return {
      menuVisibility: true,
    };
  },
};
</script>
