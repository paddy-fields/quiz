<template lang="html">

	<div class="content">
        <h1>Please select your language</h1>
        <select v-model="lang">
          <option 
          	v-for="(text, index) in content"
          	v-bind:value="index">
            {{text.language}}
          </option>    
        </select>
         
        <button class="submit" @click="redirectUser()">Submit</button>

      </div>
  
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        content: null,
        lang: 0
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
            this.content = response.data;
          })
          .catch(error => {
            console.log(error);
          })
      },
      redirectUser(){
      	var countryCode = this.content[this.lang].countryCode;
      	this.$router.push({ name: 'question', query: { lang: countryCode }})
      }
    }
  }
</script>