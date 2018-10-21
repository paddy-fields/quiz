<template>

	<div class="content" v-if="content">

    <div class="container">

      <div class="row">

        <div class="col-6">

          <div class="question--block">
            <!-- question -->
            <h1>{{content[lang].question}}</h1>
            <ul v-model="answer">
              <li><input v-model="answer" type="radio" value="1" name="question">{{content[lang].answer1}}</li>
              <li><input v-model="answer" type="radio" value="2" name="question">{{content[lang].answer2}}</li>
              <li><input v-model="answer" type="radio" value="3" name="question">{{content[lang].answer3}}</li>
            </ul>
            <button class="btn" @click="checkAnswer()">Submit</button>
            <!-- /question -->  
          </div>
          
        </div>
        
        <div class="col-6">
          <div class="question--map">
            <img src="../assets/gomo-map.png">
          </div>
        </div>

      </div><!--/row-->

      <div class="row">
        
        <div v-show="showFacts" class="row question--fact">
          <div class="col-12">  
            <!-- facts -->
            <div>
              <h1 class="question--fact_title">{{ content[lang].factsHeading }} </h1>
              <p class="question--fact_content">{{ content[lang].factsContent }} </p>
            </div>
            <!-- /facts-->     
          </div>
        </div>

      </div>
  
      
      
    </div><!--/container-->
			
		<!-- modal -->
		<div v-show="showModal" id="modal-userfeedback">
		    <div class="modal-mask">
		        <div class="modal-container">
              <div class="modal-content">
                <p>{{ message }}</p>
                <button class="btn" @click="closeModal()">close</button>
              </div>
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


<style lang="scss">

 // Breakpoints
  $screen-xs-max: '767px';
  $screen-sm-min: '768px';
  $screen-sm-max: '991px';
  $screen-md-min: '992px';
  $screen-md-max: '1999px';


  .question--block {
    text-align: center;
    margin: 0 auto;
    @media only screen and (min-width: $screen-md-min){
      padding: 0 100px;
    }
  }

  .question--map {
    img {
      width: 80%;
       @media only screen and (max-width: $screen-xs-max){
        width: 100%;
      }
    }
    @media only screen and (max-width: $screen-xs-max){
      width: 100%;
      margin-top: 30px;
    }
  }

  .question--fact {
    text-align: left;
    display: block;
    margin-top: 50px;
    padding: 50px 150px;
    @media only screen and (max-width: $screen-sm-max){
      padding: 50px 30px;
    }
    border-top: 1px solid #949494;
    @media only screen and (max-width: $screen-xs-max){
      text-align: center;
      padding: 0 20px;  
    }
    &_content {
      column-count: 2;
      @media only screen and (max-width: $screen-xs-max){
        column-count: 1;
      }
    }
  }

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
	  width: 500px;
	  margin: 0px auto;
	  margin-top: 30vh;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    @media only screen and (max-width: 767px){
      width: 80%;
      margin-top: 10vh;
      font-size: 25px;
    }
	  border-radius: 20px;
	  background-color: #fff;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, .33); 
	}

  .modal-content {
    padding: 20px 20px 40px;
    .btn {
      width: 70%;
    }
  }
		
</style>
