<template>
  <div :class="[menuVisibility ? 'sidebar fixed' : 'd-none']">
    <Menu
      @close-menu="menuVisibility = false"
      :username="user ? user.username : ''"
    />
  </div>

  <div
    :class="[
      menuVisibility ? '' : 'justify-content-center align-items-stretch',
    ]"
    class="d-flex"
  >
    <div :class="[menuVisibility ? 'sidebar flex-column ' : 'd-none']">
      <!-- This div is used to align correctly (has the position of the fixed sidebar) -->
    </div>

    <div
      :class="[
        menuVisibility
          ? isFluidContainer
            ? 'container-fluid'
            : 'container'
          : '',
      ]"
      class="flex-column m"
      :style="[menuVisibility ? 'max-width: 78%;' : '']"
    >
    <!-- Icon than show menu in mobile devices -->
      <svg
        v-if="
          isMobile() &&
          !menuVisibility &&
          (this.$route.name == 'map') |
            (this.$route.name == 'calendar') |
            (this.$route.name == 'habits') |
            (this.$route.name == 'to-do')
        "
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        :class="[menuVisibility ? 'd-none ' : '']"
        height="30"
        fill="currentColor"
        class="bi bi-arrow-right mt-3 ms-4"
        @click="menuVisibility = true"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
        />
      </svg>

      <router-view
        :user="user"
        :isMenu="menuVisibility"
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
import Menu from "./components/navigationMenu/navigationMenu";
import { getUser } from "./utility/user";
import { navigationMenuLocations } from "./router/consts";

export default {
  name: "App",
  components: { Menu },
  emits: ["updatedcount,change-section"],
  methods: {
    log() {
      console.log(this.menuVisibility);
    },
    closeMenu() {},
    async changeSection(destination) {
      // Manage navigation menu visibility
      if (navigationMenuLocations.includes(destination)) {
        if (!this.user.username) {
          this.user = await getUser();
        }

        if (!this.isMobile()) this.menuVisibility = true;
        (destination === "/map") | (destination === "/calendar")
          ? (this.isFluidContainer = true)
          : (this.isFluidContainer = false);
      } else {
        this.menuVisibility = false;
      }
    },
    isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
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
.fixed {
  position: fixed;
}

.sidebar {
  width: 220px;
  height: 100vh;
}
</style>
