<template>
  <div class="container">
        <Topic v-if="!$auth.loading || $auth === undefined" />
        <!-- <Topic /> -->
  </div>
</template>

<script>
import Topic from '@/components/topics/Topic.vue'

export default {
    components: {
        Topic
    }
}
</script>

<style>

</style>