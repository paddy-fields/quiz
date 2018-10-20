<template>
  <div id="app">

    <router-view></router-view>
    
  </div>
</template>

<script>
 
  export default {
    data () {
      return {
        content: null,
      }
    },

    name: 'app'

  }
</script>

<style lang="scss">
  
  #app {
    padding: 50px;
  }

  body {
      font-family: arial;
  }

  .content {
    float: left; 
    text-align: center;
    margin: 0 auto;
    width: 100%;
    padding-top: 150px;
  }

  h1 {
    font-size: 40px;
  }

  select {
    display: block;
    margin: 0 auto;
    width: 300px;
    height: 40px;
    font-size: 20px;
    margin-bottom: 30px;
  }

  .submit {
    width: 300px;
    padding: 10px;
    background: #9DCA83;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }

   ul {
    list-style: none;
   }

   li {
    font-size: 25px;
   }


</style>
