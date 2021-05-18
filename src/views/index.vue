<template>

  <div
    :class="[
      menuVisibility
        ? 'd-flex justify-content-between align-items-stretch'
        : '',
    ]"
  >
    <div
      :class="[menuVisibility ? 'flex-column align-items-stretch' : 'd-none']"
    >
      <div :class="[menuVisibility ? '' : 'd-none']">
        <Menu />
      </div>
    </div>

    <div
      :class="[
        menuVisibility
          ? isFluidContainer
            ? 'container-fluid'
            : 'container'
          : '',
      ]"
      class="flex-column m-3"
      :style="[menuVisibility? 'max-width: 80%;':''] "
    >
      <router-view @change-section="changeSection"></router-view>
    </div>
    <div :class="[menuVisibility ? 'flex-column' : 'd-none']">
      <!-- This div is used to align correctly -->
    </div>
  </div>
</template>

<script>
import Menu from "../components/navigationMenu/navigationMenu";
import { navigationMenuLocations } from "../router/consts";


export default {
  components: { Menu },
  methods: {
    log(){
      console.log(this.menuVisibility)
    },
    changeSection(destination) {
      if (navigationMenuLocations.includes(destination)) {
        this.menuVisibility = true;
        destination === "/map"
          ? (this.isFluidContainer = true)
          : (this.isFluidContainer = false);
      } else {
        this.menuVisibility = false;
      }
    },
  },
  data() {
    return {
      menuVisibility: false,
      isFluidContainer: false,
    };
  },
};
</script>
