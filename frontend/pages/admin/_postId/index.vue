<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
export default {
  layout: 'admin',
    middleware: ['is-auth', 'auth'],
  asyncData(context) {
    return axios
      .get(process.env.baseUrl + '/posts/' + context.params.postId)
      .then( res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        };
      })
      .catch( e => context.error());
  },
  methods: {
    onSubmitted (editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    }
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
