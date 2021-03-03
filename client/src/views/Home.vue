<template>
   <div>
     <nav class="level">
       <div class="level-left">
          <p class="level-item title is-2 has-text-centered">
              <a class="link is-info is-large">Exercise Tracker</a>
          </p>
        </div>
        <div class="level-right subtitle is-bold right-content">
           <p class="level-item ">
              <a class="link is-link "><router-link to="/SignUp">Sign Up</router-link></a>
           </p>
           <p class="level-item ">
             <a class="link is-link "><router-link to="/Login">Log In</router-link></a>
          </p>
        </div>
    </nav>
  </div>
</template>
//Exporting the page so that other vue modules can access it
<script>
// @ is an alias
export default {
  name: 'Home'
}
</script>
<style scoped>
    .right-content{
        margin-right: 20px;
    }
</style>