<template>
  <div id="app">
    
    <Login></Login>

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Login from '@/pages/Login.vue'

@Component({
  components: { Login }
})
export default class App extends Vue{
  
}
</script>


<style lang="scss">
@import "@/styles/variables.scss";

#app {
  font-family: $font-default;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
