<template>
<div class="p-2 flex-grow-1 bd-highlight">
        <img
          src="https://source.unsplash.com/1600x900/?travel,map,adventure"
          style= "width:100%"
        />
  </div>
  <div v-for="(post, index) in marker.posts" :key="post" style="height: 100%; width: 200px; padding: 5px">
    <div class="form-control">
      <h6>
        {{ post }}&nbsp;
        <i @click="$emit('delete-post', index,markerIndex)" class="fas fa-minus-circle"></i>
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  props: {
    marker: Object,
    markerIndex: Number,
  },
  emits: ["delete-post"]
};
</script>

<style>
.fas {
  color: rgb(255, 51, 0);
}

.form-control {
  text-align: left;
  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: small;
  background: #ffffff;
  border-style: dotted;
  border-radius: 3%;
  margin: 2px;
  padding: 10px 10px;
  cursor: pointer;
}

.form-control h6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
