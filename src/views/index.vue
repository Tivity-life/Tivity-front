<template>
<div :class="[menuVisibility ? 'd-flex justify-content-between align-items-stretch' : '']">
    <div :class="[menuVisibility ? 'flex-column align-items-stretch' : 'd-none']"> 
      <div :class="[menuVisibility ? '' : 'd-none']" >
        <Menu />
      </div>
      </div>

      <div :class="[menuVisibility ? 'container  flex-column m-3' : '']" >
        <router-view
          @disable-menu="disableMenu"
          @active-menu="activeMenu"
        ></router-view>
      </div>
      <div :class="[menuVisibility ? 'flex-column' : 'd-none']" ><!-- to align correctly --></div>
</div>

</template>

<script>
import Menu from "../components/navigationMenu/navigationMenu";

export default {
  components: { Menu },
  methods: {
    activeMenu() {
      this.menuVisibility = true;
    },
    disableMenu() {
      this.menuVisibility = false;
    },
  },
  data() {
    return {
      menuVisibility: false,
    };
  },
  emits: ["start-app"],
};
</script>
