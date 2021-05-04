<template>
  <div class="container text-center">
    <Italy />
  </div>
</template>

<script>
import Italy from "../components/map/Italy";

export default {
  name: "Map",
  components: {
    Italy,
  },
  emits: ["start-app"],
   created() {
       console.log("emitto");
    this.$emit('start-app');
  },

};
</script>