<template>
  <div v-for="post in posts" :key="post">
    <div class="post">
      <h6>
        {{ post.text }}
        <i @click="$emit('delete-post', post.id)" class="fas fa-times " ></i>
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

.post {
  text-align: left;
  background: #ffffff;
  border-style: ridge;
  border-radius: 3%;
  margin: 5px;
  padding: 10px 5px;
  cursor: pointer;
}

.post h6 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
