<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.user">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail Link</AppControlInput>
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.description">Content</AppControlInput>
    <AppControlInput
      control-type="textarea"
      v-model="editedPost.previewText">Preview Text</AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  components: {
    AppControlInput,
    AppButton
  },
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            user: '',
            title: '',
            thumbnail: '',
            description: '',
            previewText: ''
          }
    }
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit('submit', this.editedPost);
    },
    onCancel() {
      // Cancel the post
      this.$router.push('/admin');
    }
  },
}
</script>
