<template>
  <div :class="[menuVisibility ? 'container mt-5' : '', '']">
      <div :class="[menuVisibility ? '' : 'd-none', '']">
        <Menu/>
      </div>
    <router-view @disable-menu='disableMenu' @active-menu='activeMenu'></router-view>
  </div>
</template>

<script>
import Menu from "../components/navigationMenu/navigationMenu";

export default {
  components: { Menu },
  methods: {
      activeMenu() {
          this.menuVisibility = true
      },
      disableMenu() {
          this.menuVisibility = false
      }
  },
  data() {
    return {
      menuVisibility: false,
    };
  },  emits: ["start-app"],

};
</script>
