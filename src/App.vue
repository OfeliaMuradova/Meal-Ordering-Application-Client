<template>
  <div id="app">
    
    <!--<router-link to="/">Home</router-link> 
      <router-link to="/about">About</router-link>

    <router-view/>-->
  

  <LoginComponent></LoginComponent>

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import LoginComponent from '@/components/layout/LoginComponent.vue'

@Component({
  components: {
    LoginComponent
  }
})
export default class App extends Vue{
  
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

</style>
