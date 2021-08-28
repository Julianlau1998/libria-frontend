<template>
    <span>
        <div
            class="card is-one-third is-smaller-card-width"
            @click="openTopic()"
        >
            <div
                class="card-content" 
                :class="adminPage ? 'mt-5' : ''"
                :id="`card-content-${type}`"
                ref="cardTitle"
            >
                <p class="is-username">
                    @{{card.username}}
                </p>
                <i class="fas fa-flag is-flag-icon" v-if="card.reported"/>
                <span class="is-vote-icons" v-if="type === 'answer'">
                    <i 
                        class="fas fa-chevron-up"
                        :class="(card.upvoted_by_me) ? 'upvote' : 'no-upvote'"
                        @click.stop="upvoteAnswer()"
                        ref="upvote"
                    ></i>
                    <br>
                    {{votes}}
                    <br>
                    <i
                        class="fas fa-chevron-down"
                        :class="(card.downvoted_by_me) ? 'downvote' : 'no-downvote'"
                        @click.stop="downvoteAnswer()"
                        ref="downvote"
                    ></i>
                </span>
                <span class="is-vote-icons" v-else>
                    <br><br>
                </span>
                <span>
                    <h2 class="is-size-4 is-card-title" v-if="card.title">
                        <b>
                            {{card.title}}
                        </b>
                    </h2>
                    <h2 class="is-size-6 is-card-title" v-else>
                        <b>
                            &nbsp;
                        </b>
                    </h2>
                    <h2 class="is-size-5 card-body mb-3" :id="`card-body-${cardNumber}`">
                        {{card.body}}
                    </h2>
                </span>
                <i v-if="type==='topic'" class="fas fa-comment-alt is-comment-icon">
                    <span class="is-comment-text">
                        {{card.amount_of_answers}}
                    </span>
                </i>
            </div>
        </div>
        <div class="dropdown is-active">
            <div class="dropdown-trigger" v-if="!$auth.loading && $auth.isAuthenticated">
                <i 
                    class="fas fa-ellipsis-h is-option-icon"
                    @click.stop="dropdownActive=!dropdownActive"
                ></i>
            </div>
            <div
                v-if="dropdownActive"
                class="dropdown-menu mt-2 is-dropdown-item"
                id="dropdown-menu"
                role="menu"
            >
                <div class="dropdown-content pl-5">
                    <a
                        @click="deleteCard()"
                        class="dropdown-item"
                        v-if="card.username === $auth.user.nickname || $auth.user.name[0]==='admin' && adminPage"
                    >
                        <i class="fas fa-trash dropdownIcon" />
                        Delete
                    </a>
                    <a
                        @click="editCard()"
                        v-if="type!=='comment' && card.username === $auth.user.nickname"
                        class="dropdown-item"
                    >
                        <i class="fas fa-edit dropdownIcon" />
                        Edit
                    </a>
                    <a
                        @click="report(card)"
                        class="dropdown-item"
                        v-if="!adminPage"
                    >
                        <i class="fas fa-flag dropdownIcon" />
                        Report
                    </a>
                    <a
                        @click="unreport(card)"
                        class="dropdown-item"
                        v-else
                    >
                        <i class="fas fa-flag dropdownIcon" />
                        Unreport
                    </a>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'card',
    props: {
        card: {
            required: true,
            type: Object
        },
        type: {
            type: String,
            required: true,
            default: 'topic'
        },
        cardNumber: {
            type: Number,
            required: false
        },
        adminPage: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data () {
        return {
            dropdownActive: false,
            upvote: false,
            downvote: false,
            user_id: '',
            deleteModal: false
        }
    },
    watch: {
        is_loading (val) {
            if (val === false) {
                this.user_id = this.$auth.user.sub
            }
        },
        votes (val) {
            if (val <= -5) {
                this.$store.dispatch('answerModule/deleteOne', this.card)
            }
        }
    },
    computed: {
        is_loading () {
            return this.$auth.loading
        },
        votes () {
            let votes = 0
            if (this.card.votes) {
                this.card.votes.forEach(vote => {
                    if (vote.upvote === 'true') {
                        votes++
                    } else if (vote.upvote === 'false') {
                        votes--
                    }
            })
            }
            return votes
        }
    },
    methods: {
        ...mapState(['answerModule']),
        ...mapState(['reportModule']),
        openTopic () {
            if (this.type === 'topic') {
                this.$emit('openTopic', this.card.id)
            } else if (this.type === 'answer') {
                this.$emit('openAnswer', this.card.id)
            }
        },
        deleteCard () {
            this.$emit('openDeleteModal', this.card)
            this.dropdownActive = false
        }, 
        editCard () {
            this.$emit('openEditModal', this.card)
            this.dropdownActive = false
        },
        upvoteAnswer () {
            if (this.$auth.isAuthenticated) {
                if (this.type === 'answer' && !this.card.upvoted_by_me && !this.card.downvoted_by_me) {
                    this.upvote = true
                    this.$store.state.answerModule.answers.data.forEach(answer => {
                        if (answer.id === this.card.id) {
                            answer.upvoted_by_me = true
                            answer.votes.push({ upvote: 'true', user_id: this.$auth.user.sub})
                        }
                    })
                    this.$store.dispatch('votesModule/post', {upvote: 'true', answer_id: this.card.id, user_id: this.$auth.user.sub})
                }
            } else {
                this.$store.state.login_modal = true
            }
        },
        downvoteAnswer () {
            if (this.$auth.isAuthenticated) {
                if (this.type === 'answer' && !this.card.upvoted_by_me && !this.card.downvoted_by_me) {
                    this.downvote = true
                    this.$store.state.answerModule.answers.data.forEach(answer => {
                        if (answer.id === this.card.id) {
                            answer.downvoted_by_me = true
                            answer.votes.push({ upvote: 'false', user_id: this.$auth.user.sub})
                        }
                    })
                    this.$store.dispatch('votesModule/post', {upvote: 'false', answer_id: this.card.id, user_id: this.$auth.user.sub})
                }
            } else {
                this.$store.state.login_modal = true
            }
        },
        report (card) {
            this.dropdownActive = false
            this.$store.dispatch('reportModule/report', {id: card.id, contentType: `${this.type}s`})
        },
        unreport (card) {
            this.dropdownActive = false
            this.$store.dispatch('reportModule/unreport', {id: card.id, contentType: `${this.type}`})
        }
    }
}
</script>

<style>

</style>