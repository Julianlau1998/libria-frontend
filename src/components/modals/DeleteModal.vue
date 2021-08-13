<template>
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content is-login-modal">
      <h1 class="heading is-size-4 mb-4 mt-5">
          Are you sure?
      </h1>
      <br>
      <button
        class="button is-danger is-outlined mx-2 "
        @click="closeModal()"
      >
        <span>
            Cancel
        </span>
        <span class="icon is-small">
            <i class="fas fa-times"></i>
        </span>
    </button>
    <button
        class="button is-danger mx-2 "
        @click="deleteCard()"
      >
        <span>
            Delete
        </span>
        <span class="icon is-small">
            <i class="fas fa-trash"></i>
        </span>
    </button>
    <br><br>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="closeModal()"></button>
</div>
</template>

<script>
export default {
    name: 'deleteModal',
    methods: {
        closeModal () {
          this.$emit('closeDeleteModal')
        },
        deleteCard () {
          this.$emit('deleteCard')
        }
    },
}
</script>

<style>
    .modal-content {
        background-color: white;
        color: black;
    }
</style>