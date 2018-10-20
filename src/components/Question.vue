<template>

	<div class="content" v-if="content">
		<!-- question -->
		<h1>{{content[lang].question}}</h1>
		<ul v-model="answer">
		  <li><input v-model="answer" type="radio" value="1" name="question">{{content[lang].answer1}}</li>
		  <li><input v-model="answer" type="radio" value="2" name="question">{{content[lang].answer2}}</li>
		  <li><input v-model="answer" type="radio" value="3" name="question">{{content[lang].answer3}}</li>
		</ul>
		<button class="btn" @click="checkAnswer()">Submit</button>
		<!-- /question -->

		<!-- facts -->
		<div v-show="showFacts">
			<h1>{{ content[lang].factsHeading }} </h1>
			<p>{{ content[lang].factsContent }} </p>
		</div>
		<!-- /facts-->
		
		<!-- modal -->
		<div v-show="showModal" id="modal-userfeedback">
		    <div class="modal-mask">
		        <div class="modal-container">
	            	<p>{{ message }}</p>
	            	<button class="btn" @click="closeModal()">close</button>
		    	</div>
		    </div> 
		</div>
		<!-- /modal -->

    </div>
	
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        content: null,
        lang: null,
        answer: null,
        correct: false,
        showModal: false,
        showFacts: false
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
          	var countryCode = this.$route.query.lang
            this.content = response;
            this.lang = response.findIndex(function(item, i){
			  return item.countryCode === countryCode
			});
          })
          .catch(error => {
            console.log(error);
          })
      },
      checkAnswer() {
      	if(this.answer===this.content[this.lang].correctAnswer){
      		this.correct = true;
      	}
      	else {
      		this.correct = false;
      	}
      	this.showModal = true;
      },
      closeModal() {
      	this.correct ? this.showFacts = true : this.showFacts = false;	
      	this.showModal = false;
      }
    },
    computed: {
    	message: function(){
    		if(this.correct){
    			return this.content[this.lang].feedbackCorrect;
    		}
    		else {
    			return this.content[this.lang].feedbackWrong;
    		}
    	}
    }
  }
</script>

<!-- template for the modal component -->


<style>



	.modal-mask {
	  position: fixed;
	  z-index: 999;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: rgba(0, 0, 0, .5);
	}

	.modal-container {
	  width: 300px;
	  margin: 0px auto;
	  margin-top: 30vh;
	  padding: 80px;
	  border-radius: 20px;
	  background-color: #fff;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	  font-size: 30px;
	  line-height: 40px;
	}

		
</style>
