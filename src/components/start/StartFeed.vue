<template>
  <div class="mb-8">
    <h1 class="is-size-3 mt-5 mb-5">
          Feed
    </h1>
    <div
        class="columns is-variable is-0-mobile is-1-tablet is-3-desktop"
        v-for="(topic, index) in topics"
        :key="index"
    >   
        <div class="column" v-if="topic.length>1">
            <card 
                :card="topic[0]"
                :type="'topic'"
                :cardNumber="Math.floor(Math.random() * (4 - 3 + 1) + 3)"
                @openTopic="openTopic($event)"
                @openEditModal="openEditModal($event)"
                @openDeleteModal="openDeleteModal($event)"
             />
        </div>
        <div class="column" v-if="topic.length>1">
            <card
                :card="topic[1]"
                :type="'topic'"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openTopic="openTopic($event)"
                @openEditModal="openEditModal($event)"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="column" v-if="topic.length>2">
            <card
                :card="topic[2]"
                :type="'topic'"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openTopic="openTopic($event)"
                @openEditModal="openEditModal($event)"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="singleColumn" v-if="topic.length===1">
            <card 
                :card="topic[0]"
                :type="'topic'"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openTopic="openTopic($event)"
                @openEditModal="openEditModal($event)"
                @openDeleteModal="openDeleteModal($event)"
             />
        </div>
    </div>
    <DeleteModal
        @deleteCard="deleteCard()"
        @closeDeleteModal="deleteModal=false"
        v-if="deleteModal"
    />
  </div>
</template>

<script>
import card from '@/components/start/Card.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'

const chunk = require('chunk')
export default {
    name: "startFeed",
    components: {
        card,
        DeleteModal
    },
    props: {
        topics: {
            type: Array,
            required: true,
        },
        foundTopics: {
            type: Array,
            required: false
        }
    },
    data () {
        return {
            deleteModal: false,
            cardToDelete: false
        }
    },
    created () {
        this.$store.dispatch('topicModule/getAll')
},
    watch: {
        foundTopics (val) {
            this.topics = chunk(val, 3)
        },
    },
    methods: {
        openTopic (topicUuid) {
            this.$router.push(
                {
                    name: 'Topic', 
                    params: {uuid: topicUuid}
                }
            )
        },
        openEditModal (topic) {
            this.$emit('openEditModal', topic)
        },
        openDeleteModal (card) {
            this.cardToDelete = card
            this.deleteModal = true
        },
        deleteCard () {
            this.$store.dispatch('topicModule/deleteOne', this.cardToDelete)
            this.dropdownActive = false
            this.deleteModal = false
        }
    }
}
</script>

<style>

</style>