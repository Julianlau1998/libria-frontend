<template>
  <div class="control has-icons-right searchDiv">
      <input
        v-model="searchText"
        class="input is-info mt-4"
        type="text"
        placeholder="Search Topic"
        size="1"
        @click="scrollToSearch()"
        id="search"
      >
      <span class="icon is-small is-right mt-4 is-search-icon">
          <i v-if="!searchText" class="fas fa-search"></i>
          <i v-else @click="clear()" class="fas fa-times clearIcon"></i>
      </span>
      <br>
      <RandomTopic :buttonText="'Or Get Random Topic'" />
  </div>
</template>

<script>
import RandomTopic from '@/components/start/RandomTopic.vue'

export default {
    name: 'search',
    components: { RandomTopic },
    props: {
      topics: {
          type: Array,
          required: true,
      }
    },
    data () {
      return {
        searchText: '',
        topicsList: []
      }
    },
    watch: {
      searchText (val) { 
        let foundTopics = []
        if (val !== '') {
          foundTopics = this.topicsList.filter(el => el.title.toLowerCase().includes(val.toLowerCase()))
        } else {
          foundTopics = this.topicsList
        }
        this.$emit('topicsFound', foundTopics)
      },
      topics () {
        this.topicsList = []
        this.topics.forEach(el => {
          el.forEach(topic => {
            this.topicsList.push(topic)
          })
        });
      }
    },
    methods: {
      clear () {
        alert('test')
        this.searchText = ''
      },
      scrollToSearch () {
        const id = 'search';
        const yOffset = -60; 
        const element = document.getElementById(id);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    }
}
</script>