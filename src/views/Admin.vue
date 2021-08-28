<template>
  <div class="mt-6 px-5">
    <br><br>
    <h1 class="is-header is-size-3">
        Hello Admin
    </h1>
    <h1 class="is-header is-size-5">
        Thank you for helping with keeping Libria a friendly place to find information and learn new things.
    </h1>

    <button class="button is-rounded is-warning mt-6" @click="feedType='topics'">
        <b>
            Reported Topics
        </b>
    </button>
    <br>
    <button class="button is-rounded is-warning mt-6" @click="feedType='answers'">
        <b>
            Reported Answers
        </b>
    </button>
    <br>
    <button class="button is-rounded is-warning mt-6" @click="feedType='comments'">
        <b>
            Reported Comments
        </b>
    </button>
    <feed v-if="feedType!==''" :type="feedType" />
  </div>
</template>

<script>
import feed from '@/components/admin/Feed.vue'

export default {
    components: { feed },
    data () {
        return {
            feedType: ''
        }
    },
    beforeCreate () {
        if (this.$auth.user.name[0] !== 'admin') {
            this.$router.push('/')
        }
    }
}
</script>