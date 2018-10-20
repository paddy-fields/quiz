<template>

	<div class="content" v-if="content">
		<h1>{{content[lang].question}}</h1>
		<ul>
		  <li><input type="radio" name="question">{{content[lang].answer1}}</li>
		  <li><input type="radio" name="question">{{content[lang].answer2}}</li>
		  <li><input type="radio" name="question">{{content[lang].answer3}}</li>
		</ul>
		<button class="submit">Submit</button>
    </div>
	
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        content: null,
        lang: null
      }
    },

    created() {
      this.getLanguage();
    },

    methods: {
      getLanguage() {
        // json file added to static folder for local development
        // real-world would be hosted, and http path referenced here
        axios.get('/static/mydata.json')
          .then(response => {
          	var response = response.data;
          	var lang = this.$route.query.lang
            this.content = response;
            this.lang = response.findIndex(function(item, i){
			  return item.countryCode === lang
			});
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
</script>


<style>
	
</style>
