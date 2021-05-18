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
          >🕮 Il tuo habit tracker</router-link
        >
      </li>
    </ul>
    <hr />
    <div>
      <!-- TODO: connect to be and take the name with token -->
      Benvenuto {{ username }}!
    </div>
  </div>
</template>

<script>
export default {
  name: "Start",
  props: ["username"],
  // data() {
  //   return {
  //     username: "patato",
  //   };
  // },
};
</script>

<style>
</style>
