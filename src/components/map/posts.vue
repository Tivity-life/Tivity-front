<template>
  <div v-for="(post, index) in marker.posts" :key="post" style="height: 100%; width: 200px">
    <div class="form-control">
      <h6>
        {{ post }}
        <i @click="$emit('delete-post', index,markerIndex)" class="fas fa-times"></i>
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
  color: red;
}

.form-control {
  text-align: left;
  background: #ffffff;
  border-style: ridge;
  border-radius: 3%;
  margin: 5px;
  padding: 10px 5px;
  cursor: pointer;
}

.form-control h6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
