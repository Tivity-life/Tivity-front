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
        <Menu :username="user? user.username: ''" />
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
      :style="[menuVisibility ? 'max-width: 78%;' : '']"
    >
      <router-view
        :user="user"
        @user-data="getUserData"
        @change-section="changeSection"
      ></router-view>
    </div>
    <div :class="[menuVisibility ? 'flex-column' : 'd-none']">
      <!-- This div is used to align correctly -->
    </div>
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
          this.user = await  getUser();
        }

        this.menuVisibility = true;
        destination === "/map" | destination === "/calendar"
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
