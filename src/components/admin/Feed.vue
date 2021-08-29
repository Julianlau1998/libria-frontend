<template>
  <div>
      <div
        class="columns is-variable is-0-mobile is-1-tablet is-3-desktop mt-6"
        v-for="(topic, index) in cards"
        :key="index"
    >   
        <div class="column" v-if="topic.length>1">
            <card 
                :card="topic[0]"
                :type="`${type}`"
                :cardNumber="Math.floor(Math.random() * (4 - 3 + 1) + 3)"
                :admin-page="true"
                @openDeleteModal="openDeleteModal($event)"
             />
        </div>
        <div class="column" v-if="topic.length>1">
            <card
                :card="topic[1]"
                :type="`${type}`"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                :admin-page="true"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="column" v-if="topic.length>2">
            <card
                :card="topic[2]"
                :type="`${type}`"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                :admin-page="true"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="singleColumn" v-if="topic.length===1">
            <card 
                :card="topic[0]"
                :type="`${type}`"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                :admin-page="true"
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
import { mapState } from 'vuex'
import card from '@/components/start/Card.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'

const chunk = require('chunk')

export default {
    components: {card, DeleteModal},
    props: {
        type: {
            type: String,
            required: true,
        }
    },
    data () {
        return {
            cardToDelete: {},
            deleteModal: false
        }
    },
    created () {
        if (this.type === 'topics') {
            this.$store.dispatch('topicModule/getReported', {userId: this.$auth.user.sub})
        } else if (this.type === 'answers') {
            this.$store.dispatch('answerModule/getReported', {userId: this.$auth.user.sub})
        } else if (this.type === 'comments') {
            this.$store.dispatch('commentModule/getReported', {userId: this.$auth.user.sub})
        }
    },
    watch: {
        type (val) {
            if (val === 'topics') {
            this.$store.dispatch('topicModule/getReported', {userId: this.$auth.user.sub})
            } else if (val === 'answers') {
                this.$store.dispatch('answerModule/getReported', {userId: this.$auth.user.sub})
            } else if (val === 'comments') {
                this.$store.dispatch('commentModule/getReported', {userId: this.$auth.user.sub})
            }
        }
    },
    computed: {
        ...mapState(['answerModule']),
        ...mapState(['topicModule']),
        ...mapState(['commentModule']),
        cards () {
            if (this.type === 'topics') {
                let topics = (!this.topicModule.topics.loading && this.topicModule.topics.data) || [{"title":"Loading...","body":"Loading...","username":"Loading"},{"title":"Loading...","body":"Loading...","username":"Loading"},{"title":"Loading...","body":"Loading...","username":"Loading"}]
                topics = topics.sort(function(a,b) {
                    return new Date(b.created_date) - new Date(a.created_date);
                });
                return chunk(topics, 3)
            } else if (this.type === 'answers') {
                let answers = (!this.answerModule.answers.loading && this.answerModule.answers.data) || [{"body":"Loading...","username":"Loading", "votes": []},{"body":"Loading...","username":"Loading","votes": []},{"body":"Loading...","username":"Loading", "votes": []}]
                answers = answers.sort(function(a,b) {
                    // ToDo imrove sorting
                    let aVotes = 0
                    a.votes.forEach(vote => {
                        if (vote.upvote === 'true') {
                            aVotes++
                        } else if (vote.upvote === 'false') {
                            aVotes--
                        }
                    })
                    let bVotes = 0
                    b.votes.forEach(vote => {
                        if (vote.upvote === 'true') {
                            bVotes++
                        } else if (vote.upvote === 'false') {
                            bVotes--
                        }
                    })
                    return  bVotes - aVotes
                });
                return chunk(answers, 3)
            } else if (this.type === 'comments') {
                let comments = (!this.commentModule.comments.loading && this.commentModule.comments.data) || [{"text":"Loading...","username":"Loading"},{"text":"Loading...","username":"Loading"},{"text":"Loading...","username":"Loading"}]
                comments = comments.sort(function(a,b) {
                    return new Date(b.created_date) - new Date(a.created_date);
                });
                return chunk(comments, 3)
                }
                return []
        }
    },
    methods: {
        openDeleteModal (card) {
            this.cardToDelete = card
            this.deleteModal = true
        },
        deleteCard () {
            if (this.type === 'topics') {
                this.$store.dispatch('topicModule/deleteOne', this.cardToDelete)
            } else if (this.type === 'answers') {
                this.$store.dispatch('answerModule/deleteOne', this.cardToDelete)
            } else if (this.type === 'comments') {
                this.$store.dispatch('commentModule/deleteOne', this.cardToDelete)
            }
            this.dropdownActive = false
            this.deleteModal = false
        }
    }
}
</script>

<style scoped>
@media (max-width: 769px) {
    .singleColumn {
        width: 90vw !important;
    }   
}
</style>