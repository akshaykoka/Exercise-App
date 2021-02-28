<template>
   <div id="app">
        <div id="nav">
          <!-- including home page on the APP module-->
          <router-view/>
          <router-link to="/"></router-link> |
          <Mynav></Mynav>
        </div>
   </div>
</template>

//Importing and exporting the feature so that we can use it in APP module
<script>
   import Mynav from "../src/components/Nav";
   export default{
        components:{
                  Mynav
      }
   }
</script>