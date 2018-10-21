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


  /* Decided to build custom grid system, as a framework may be 
     too bloated for the size of this application currently. 
     If the application were to grow, Bootstrap or Foundation could be integrated.
  */

  // Breakpoints
  $screen-xs-max: '767px';
  $screen-sm-min: '768px';
  $screen-sm-max: '991px';
  $screen-md-min: '992px';
  $screen-md-max: '1999px';

  body {
    background: #eee;
  }

  .content {
    background: white;
    padding: 150px 30px 120px;
    @media only screen and (max-width: $screen-xs-max){
      padding: 20px 10px 50px;
    }
    max-width: 1200px;
    margin: 50px auto;
    border-radius: 40px;
  }

  .container {
    overflow: auto;
    width: 100%;
  }

  .row {
    float: left;
  }

  .col-12 {
    width: 100%;
    float: left;
    overflow: auto;
  }

  .col-6 {
    width: 50%;
    float: left;
    @media only screen and (max-width: $screen-xs-max){
      width: 100%;
    }
  }

  .padded {
    padding: 0 20px;
  }

  /* For a larger application then CSS architecture such as SMACCS should be 
    considered to better organise the classes. */

  body {
      font-family: arial;
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


  ul {
    list-style: none;
  }

  li {
    font-size: 25px;
  }

  .btn {
    width: 300px;
    padding: 10px;
    background: #9DCA83;
    color: white;
    font-size: 30px;
    cursor: pointer;
  }

</style>
