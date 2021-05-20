<template>
  <div :class="[menuVisibility ? '' : 'd-none']">
      <Menu
      class="sidenav"
        :username="user ? user.username : ''"
      />
  </div>

  <div
    :class="[
      menuVisibility
        ? isFluidContainer
          ? 'container-fluid'
          : 'container'
        : '',
    ]"
    class="main"
  
  >
    <router-view
      :user="user"
      @user-data="getUserData"
      @change-section="changeSection"
    ></router-view>
  </div>
</template>

<script>
import Menu from "../components/navigationMenu/navigationMenu";
import { getUser } from "../utility/user";
import { navigationMenuLocations } from "../router/consts";

export default {
  components: { Menu },
  methods: {
    log() {
      console.log(this.menuVisibility);
    },
    async changeSection(destination) {
      // Manage navigation menu visibility
      if (navigationMenuLocations.includes(destination)) {
        if (!this.user.username) {
          this.user = await getUser();
        }

        this.menuVisibility = true;
        (destination === "/map") | (destination === "/calendar")
          ? (this.isFluidContainer = true)
          : (this.isFluidContainer = false);
      } else {
        this.menuVisibility = false;
      }
    },
    getUserData(user) {
      this.user = user;
    },
  },
  data() {
    return {
      menuVisibility: false,
      isFluidContainer: false,
      username: "",
      user: new Object(),
    };
  },
};
</script>

<style>
.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 220; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
}

.main {
  margin-left: 220px; /* Same as the width of the sidebar */
  padding: 0px 0px;
    width: 81%;
}
</style>
