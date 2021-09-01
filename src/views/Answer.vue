<template>
  <div class="container">
        <Answer v-if="!$auth.loading || $auth === undefined" />
        <!-- <Answer /> -->
  </div>
</template>

<script>
import Answer from '@/components/answers/Answer.vue'

export default {
    components: {
        Answer
    }
}
</script>

<style>

</style>