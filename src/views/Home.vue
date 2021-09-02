<template>
  <div class="container">
    <h2 class="is-size-2 mt-6">
        Welcome
    </h2>
    <h3 class="is-sub-header">
      Find quick and understandable information on any topic you'd like.
    </h3>
    <Search @topicsFound="topicsFound($event)" :topics="topics" />
    <StartFeed :topics="topics" :foundTopics="foundTopics" @openEditModal="openEditModal($event)"/>
    <AddButton
      @openNewModal="openNewModal()"
     />
    <TopicModal
      :topicToEdit="topicToEdit"
      :edit="edit"
      @closeModal="closeModal()"
      v-if="openTopicModal"
    />
  </div>
</template>

<script>
import Search from '@/components/start/Search.vue'
import StartFeed from '@/components/start/StartFeed.vue'
import AddButton from '@/components/start/AddButton.vue'
import TopicModal from '@/components/modals/TopicModal.vue'
import { mapState } from 'vuex'

const chunk = require('chunk')

export default {
  name: 'Home',
  components: {
    Search,
    StartFeed,
    AddButton,
    TopicModal
  },
  data () {
    return {
      openTopicModal: false,
      edit: false,
      topicToEdit: {},
      foundTopics: [],
      auth: {},
      limit: 30,
      offset: 0,
      searchText: '',
      total: 0
    }
  },
  computed: {
    ...mapState(['topicModule']),
    topics () {
      let topics
      if (this.offset <= 30) {
        topics = (!this.topicModule.topics.loading && this.topicModule.topics.data) || [{"title":"Loading...","body":"Loading...","username":"Loading"},{"title":"Loading...","body":"Loading...","username":"Loading"},{"title":"Loading...","body":"Loading...","username":"Loading"}]
      } else {
        topics = ( this.topicModule.topics.data) || []
      }
      topics = topics.sort(function(a,b) {
        return new Date(b.created_date) - new Date(a.created_date);
      });
      return chunk(topics, 3)
    }
  },
  watch: {
    topics (val) {
      if (val[0][0].amount !== undefined) {
        this.amount = val[0][0].amount
      }
    }
  },
  mounted () {
    this.getNextTopics()
  },
  methods: {
    openNewModal () {
      this.openTopicModal = true
    },
    openEditModal (topic) {
      this.topicToEdit = topic
      this.edit = true
      this.openTopicModal = true
    },
    closeModal () {
      this.openTopicModal=false
      this.edit = false
    },
    topicsFound (foundTopics) {
      this.foundTopics = foundTopics
    },
    getNextTopics() {
      window.onscroll = () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          if (this.amount > this.topicModule.topics.data.length && !this.topicModule.topics.loading) {
            this.offset += 30
            this.$store.dispatch('topicModule/getAll', {limit: this.limit, offset: this.offset, searchText: this.searchText})
          }
        }
      }
    }
  }
}
</script>
