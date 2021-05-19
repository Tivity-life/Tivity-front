<template>
  <div
    class="d-flex flex-column p-3 pe-5 text-white bg-dark"
    style="width: 100%; height: 100vh"
  >
    <a href="/" class="fs-4 ps-4 mb-md-0 text-white text-decoration-none">
      Tivity
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li>
        <router-link class="nav-link text-white bi ms-2me-2" to="/to-do"
          >✔️ To Do</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link text-white bi ms-2me-2 text-decoration-none"
          to="/map"
          >🌎 La tua mappa</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link text-white bi ms-2me-2 text-decoration-none"
          to="/calendar"
          >🗓️ Calendario</router-link
        >
      </li>
      <li>
        <router-link
          class="nav-link text-white bi ms-2me-2 text-decoration-none"
          to="/habits"
          >📚 Il tuo habit tracker</router-link
        >
      </li>
    </ul>
    <hr />
    <div>
      <!-- TODO: connect to be and take the name with token -->
      Benvenuto 
      <span style= "color: #bd2a3e">{{ username }}</span>!
    </div>
  <button type="button" class="btn" style="color: white" @click="removeUser">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open" viewBox="0 0 16 16">
  <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
  <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z"/>
    </svg> Logout
  </button>
  <hr>
  </div>
</template>

<script>
export default {
  name: "Start",
  data() {
    return {
     username: "",
   };
 },
 methods: {
   getUser() {
     console.log(sessionStorage.length)
      if (sessionStorage.length > 0) {
        const key= sessionStorage.key(0)
        this.username= JSON.parse(sessionStorage.getItem(key)).username;
      }
      else {
        this.$router.push("/");
      }
    },

    removeUser() {
      this.$router.push("/");
      sessionStorage.clear()
    }
 },
 beforeMount() {
    this.getUser();
 }
};
</script>

<style>
</style>
