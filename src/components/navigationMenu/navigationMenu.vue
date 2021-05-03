<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/to-do">✔️ To Do</router-link> |
    <router-link to="/map">🌎 La tua mappa</router-link> |
    <router-link to="/calendar">🗓️ Calendario</router-link> |
    <router-link to="/habits">🕮 Il tuo habit tracker</router-link>
  </div>
</template>

<script>
export default {
  name: "Start",
};
</script>
