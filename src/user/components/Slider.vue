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
    <div class="container-fluid">
      <div class="row" id="greeting">
        Good afternoon! Let's plan the upcoming week with the Meal Ordering Application.
      </div>
      <div class="row">
        <div class="col text-column" id="text-col1">
          The Meal Ordering Application is a Web Application, developed for the Community4you AG. 
          It's an easy to use, convenient and simple application that aims to help the employees of
          the company to order and manage their meal plans for current and upcoming weeks. 
          For the customer, this application provides a view of current food information
          and ordering logic on the website. For the administrator in the company, 
          it offers a series of operations to add,
          update, delete and read the information of meals, companies, orders with their summary and employees.
        </div>
        <div class="col text-column" id="text-col2">
          The application includes two parts: Background Management Platform and Website
          Foreground Public Page. The Background Management
          Platform was implemented with Spring Boot framework and JPA framework with PostgreSQL as a database. 
          Vue.js and Typescript were used in the Website
          Foreground Public Page.
          So far, all core functions were developed successfully and the progress of the
          project was most rewarding and generated an excellent experience in
          programming.          
        </div>
      </div>
    </div>

    <footer class="bg-light" id="page-footer">
      Copyright 2019 &copy; All rights reserved
    </footer>

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

<style lang="scss">

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

  .text-column{
    // font: normal normal normal 18px enriqueta, serif;
    color: rgb(70, 70, 70);
    text-indent: 30px;
    font: normal normal 18px tahoma, sans-serif;
    letter-spacing: 0.3px;
  }

  #text-col1, #text-col2{
    padding: 0px 50px 40px 50px;
    line-height: inherit;
    
  }

  #greeting{
    font: normal normal normal 30px Raleway, sans-serif;
    text-align: center;
    width: 60%;
    line-height: 50px;  
    margin: 40px auto;
    letter-spacing: 2px;
  }

  #page-footer{
    color: rgba(0, 0, 0, 0.5);
    height: 100px;
    line-height: 100px;
    vertical-align: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    align-items: center;
  }

</style>




