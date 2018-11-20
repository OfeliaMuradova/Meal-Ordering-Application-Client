<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <HelloWorld msg="Parent class property"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/fragments/HelloWorld.vue'; // @ is an alias to /src
import Component from 'vue-class-component'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue{
  name: String = 'home';
}



</script>
