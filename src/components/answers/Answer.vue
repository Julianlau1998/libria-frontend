<template>
<div>
    <div class="card my-2 is-wide-card mt-6 mb-5">
        <div class="card-content is-wide-card-content ml-5">
            <span class="is-vote-icons">
                <br>
                <br>
                <br>
            </span>
            <h2 class="is-size-4 is-card-title">
                <br>
                <b>
                {{answer.title}}
                </b>
            </h2>
            <h2 class="is-size-5">
                {{answer.body}}
            </h2>
        </div>
    </div>
    <h1 class="is-heading is-size-4 mb-5">
        <b>
            Comments:
        </b>
    </h1>
    <div
        class="columns is-variable is-0-mobile is-1-tablet is-3-desktop"
        v-for="(comment, index) in comments"
        :key="index"
    >   
        <div class="column" v-if="comment.length>1">
            <card
                :type="'comment'"
                :card="comment[0]"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="column" v-if="comment.length>1">
            <card
                :type="'comment'"
                :card="comment[1]"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
        <div class="column" v-if="comment.length>2">
            <card
                :type="'comment'"
                :card="comment[2]"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>

        <div class="singleColumn" v-if="comment.length===1">
            <card
                :type="'comment'"
                :card="comment[0]"
                :cardNumber="Math.floor(Math.random() * 4) + 1"
                @openDeleteModal="openDeleteModal($event)"
            />
        </div>
    </div>
    <div>
        <textarea
            class="input commentInput"
            v-model="comment"
            placeholder="comment"
            rows=30
            ref="commentInput"
        />
        <button
            @click="submitComment()" 
            class="button is-warning commentButton mr-2"
        >
            <i class="fas fa-share" name="send"/>
        </button>
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
    name: "answer",
    components: { card, DeleteModal },
    data () {
        return {
            answerId: '',
            comment: '',
            deleteModal: false
        }
    },
    created () {
        this.answerId = this.$route.params.uuid
        if (this.$auth.user === undefined) {
            this.$auth.user = {}
        } 
        if (this.answerId !== undefined) {
            this.$store.dispatch('commentModule/getAllByAnswer', {answerId: this.answerId, userId: this.$auth.user.sub})
            this.$store.dispatch('answerModule/getOne', this.answerId)
        }
    },
    methods: {
        submitComment () {
            if (this.comment !== '' && this.$auth.isAuthenticated) {
                const comment = {
                    body: this.comment,
                    user_id: this.$auth.user.sub,
                    username: this.$auth.user.nickname,
                    answer_id: this.answerId
                }
                this.$store.dispatch('commentModule/post', comment)
            } else if (!this.$auth.isAuthenticated) {
                this.$store.state.login_modal = true
            }
            this.comment = ''
        },
        openDeleteModal (card) {
            this.cardToDelete = card
            this.deleteModal = true
        },
        deleteCard () {
            this.$store.dispatch('commentModule/deleteOne', this.cardToDelete)
            this.dropdownActive = false
            this.deleteModal = false
        }
    },
    computed: {
        ...mapState(['commentModule']),
        ...mapState(['answerModule']),
        comments () {
            let comments = (!this.commentModule.comments.loading && this.commentModule.comments.data) || [{"text":"Loading...","username":"Loading"},{"text":"Loading...","username":"Loading"},{"text":"Loading...","username":"Loading"}]
            comments = comments.sort(function(a,b) {
                return new Date(b.created_date) - new Date(a.created_date);
            });
            return chunk(comments, 3)
        },
        answer () {
            return (!this.answerModule.answer.loading && this.answerModule.answer.data) || {"title":"Loading...","text":"Loading...","username":"Loading"}
        }
    },
    watch: {
        comment(val) {
            if (val.length > 0) {
                this.$refs.commentInput.style.height = '5rem'
            } else {
                this.$refs.commentInput.style.height = '2.5rem'
                this.$refs.commentInput.style.paddingBottom = '0.5rem'
            }
        }
    }
}
</script>

<style>

</style>