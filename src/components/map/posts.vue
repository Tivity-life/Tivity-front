<template>
  <div v-for="post in posts" :key="post" style="height: 100%; width: 200px">
    <div class="form-control">
      <h6>
        {{ post.text }}
        <i @click="$emit('delete-post', post.id)" class="fas fa-times"></i>
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  props: {
    posts: Array,
  },
  emits: ["delete-post"],
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
