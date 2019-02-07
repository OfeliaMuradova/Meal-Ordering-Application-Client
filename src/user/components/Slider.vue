<template>
  <div>
    <div id="carouselSlider" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselSlider" data-slide-to="0" class="active"></li>
        <li data-target="#carouselSlider" data-slide-to="1"></li>
        <li data-target="#carouselSlider" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="@/assets/slider1.jpg" alt="First slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/slider2.jpg" alt="Second slide">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="@/assets/slider4.jpg" alt="Third slide">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselSlider" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselSlider" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import * as constants from '@/constants.ts';

@Component({})
export default class Slider extends Vue{
  
}
</script>

<style lang="scss" scoped>

  #carouselSlider{
    .carousel-inner{
      width: 100%;
      max-height: 400px !important;

      .carousel-item img{
        width: 100%;
        height: 900px;
      }
  }

  
}

</style>




