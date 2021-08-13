<template>
  <div>
    <div class="card my-2 is-wide-card mt-6">
            <div class="card-content is-wide-card-content ml-5">
                <span class="is-vote-icons">
                    <br>
                    <br>
                    <br>
                </span>
                <h2 class="is-size-4 is-card-title">
                    <i class="fas fa-crown is-crown"></i>
                    <br>
                    <b>
                        {{topic.title}}
                    </b>
                </h2>
                <h2 class="is-size-5">
                    {{bestAnswer.body}}
                </h2>
            </div>
        </div>
        <RandomTopic
            @openRandomTopic="openRandomTopic($event)"
            :buttonText="'Get Random Topic'"
            class="mb-6"
        />
        <div
            class="columns is-variable is-0-mobile is-1-tablet is-3-desktop"
            v-for="(answer, index) in answers"
            :key="index"
        >   
            <div class="column" v-if="answer.length>1">
                <card
                    :type="'answer'"
                    :card="answer[0]"
                    @openEditModal="openEditModal($event)"
                    :cardNumber="Math.floor(Math.random() * 4) + 1"
                    @openDeleteModal="openDeleteModal($event)"
                />
            </div>
            <div class="column" v-if="answer.length>1">
                <card
                    :type="'answer'"
                    :card="answer[1]"
                    @openEditModal="openEditModal($event)"
                    :cardNumber="Math.floor(Math.random() * 4) + 1"
                    @openDeleteModal="openDeleteModal($event)"
                />
            </div>
            <div class="column" v-if="answer.length>2">
                <card
                    :type="'answer'"
                    :card="answer[2]"
                    @openEditModal="openEditModal($event)"
                    :cardNumber="Math.floor(Math.random() * 4) + 1"
                    @openDeleteModal="openDeleteModal($event)"
                />
            </div>

            <div class="singleColumn" v-if="answer.length===1">
                <card
                    :type="'answer'"
                    :card="answer[0]"
                    @openEditModal="openEditModal($event)"
                    :cardNumber="Math.floor(Math.random() * 4) + 1"
                    @openDeleteModal="openDeleteModal($event)"
                />
            </div>
        </div>
        <AnswerModal
            v-if="openAnswerModal"
            :answerToEdit="answerToEdit"
            :edit="edit"
            :topicId="topicId"
            @closeModal="closeModal()"
        />
        <DeleteModal
            @deleteCard="deleteCard()"
            @closeDeleteModal="deleteModal=false"
            v-if="deleteModal"
        />
        <AddButton
            @openNewModal="openNewModal()"
        />
  </div>
</template>

<script>
import card from '@/components/start/Card.vue'
import RandomTopic from '@/components/start/RandomTopic.vue'
import AnswerModal from '@/components/modals/AnswerModal.vue'
import AddButton from '@/components/start/AddButton.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import { mapState } from 'vuex'

const chunk = require('chunk')
export default {
    components: {
        card,
        RandomTopic,
        AnswerModal,
        AddButton,
        DeleteModal
    },
    data () {
        return {
            topicId: '',
            openAnswerModal: false,
            answerToEdit: {},
            deleteModal: false
        }
    },
    created () {
        this.topicId = this.$route.params.uuid
        if (this.$auth.user === undefined) {
            this.$auth.user = {}
        } 
        if (this.topicId !== undefined) {
            this.$store.dispatch('answerModule/getAllByTopic', {topicId: this.topicId, userId: this.$auth.user.sub})
            this.$store.dispatch('topicModule/getOne', this.topicId)
        }
    },
    computed: {
        ...mapState(['answerModule']),
        ...mapState(['topicModule']),
        answers () {
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
        },
        bestAnswer () {
            if (this.answers === []) {
                return {text: '', votes: 0}
            }
            let bestAnswer = {votes: -5}
            this.answers.forEach(el => {
                el.forEach(answer => {
                    let votes = 0
                    answer.votes.forEach(vote => {
                        if (vote.upvote === 'true') {
                            votes++
                        } else if (vote.upvote === 'false') {
                            votes--
                        }
                    })
                    if (votes > bestAnswer.votes) {
                        bestAnswer.body = answer.body
                        bestAnswer.votes = votes
                        // if (this.topic.id !== undefined) {
                        //     this.$store.dispatch('topicModule/updateBestAnswer', this.topic)
                        // }
                    }
                })
            });
            return bestAnswer
        },
        topic () {
            return (!this.topicModule.topic.loading && this.topicModule.topic.data) || {"title":"Loading...","body":"Loading...","username":"Loading"}
        }
    },
    methods: {
        openNewModal () {
            this.openAnswerModal = true
        },
        openEditModal (answer) {
            this.openAnswerModal = true
            this.edit = true
            this.answerToEdit = answer
        },
        closeModal () {
            this.openAnswerModal=false
            this.edit = false
        },
        openDeleteModal (card) {
            this.cardToDelete = card
            this.deleteModal = true
        },
        deleteCard () {
            this.$store.dispatch('answerModule/deleteOne', this.cardToDelete)
            this.dropdownActive = false
            this.deleteModal = false
        }
    }
}
</script>