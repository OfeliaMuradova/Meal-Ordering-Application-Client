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

  <button type="button" v-on:click="callTest()">CLICK HERE</button>

</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'

@Component({})
export default class Slider extends Vue{
  
  private callTest(){
    debugger;
    //axios.defaults.headers.common['Authorization'] = 'common';
    //console.log(axios.defaults.headers);
    axios.get('http://localhost:8080/companies/list', {
       headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Access-Control-Allow-Origin': '*',
             'Access-Control-Allow-Headers': 'Content-Type',
             'crossDomain': true,
             'Authorization': 'Bearer' + this.getCookie('access_token')
         }
      }).then( (response: any) => {
          console.log("request sent successfully");
      })
      .catch((error: any) => {
        console.log(error.response)
    });

  }

  set_cookie(name:string, value:string) {
    document.cookie = name +'='+ value +'; Path=/;';
  }

  getCookie(name:string) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }


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




