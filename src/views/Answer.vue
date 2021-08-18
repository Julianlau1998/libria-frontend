<template>
  <div class="container mb-8">
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