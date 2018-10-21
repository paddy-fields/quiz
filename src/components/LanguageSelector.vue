<template lang="html">

	<div class="content">
    <div class="container language--selector">
      <h1>Please select your language</h1>
      <!-- when a language is selected, the index of the array is binded to 'lang' in vue -->
      <select v-model="lang">
        <option 
          v-for="(text, index) in content"
          v-bind:value="index">
          {{text.language}}
        </option>    
      </select>
     
      <button class="btn" @click="redirectUser()">Submit</button>
      
    </div>
  </div>
  
</template>

<script>

  /* 
     I have chosen to keep all of the language data in a single json file.
     This way, when any a new language is added, it will automatically be added to the 
     drop down list as the above v-for loops through the array

     Alternatively the languages could have been split into their own json files, eg)
     en.json, fr.json, however I feel the chosen method is easier to scale.

     With more time it would be valuable to have an admin section when the JSON 
     file can be updated.
  */

  // axios used to make the http requests
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
      //Get the translations from mydata.json, and store as 'content'
      // For local environment, change to /static/mydata.json
      getLanguage() {
        axios.get('/data/mydata.json')
          .then(response => {
            this.content = response.data;
          })
          .catch(error => {
            console.log(error);
          })
      },
      // When submit is clicked, find the country code of the chosen language
      // and send this as a query string in the URL.
      // The advantage of this method is that it would allow a link to be 
      // sent to users with their language already pre-populated
      redirectUser(){
      	var countryCode = this.content[this.lang].countryCode;
      	this.$router.push({ name: 'question', query: { lang: countryCode }})
      }
    }
  }
</script>

<style lang="scss">

  .language--selector {
    text-align: center;
  }
  
</style>