<template>
  <div id="profile" class="container">
    <div class="row">
      <div class="col-md-6 img">
        <img src="@/assets/profile.png"  alt="Profile picture" class="img-rounded">
      </div>
      <div class="col-md-6 details">
        <blockquote>
          <h5>{{ user.name }}</h5>
          <small><cite title="title">{{ user.location }} <i class="icon-map-marker"></i></cite></small>
        </blockquote>
        <p>
          {{ user.phone }}  <br>
          {{ user.email }} <br>
        </p>

        <button v-if="showEditButton" type="button" class="btn btn-info">Edit profile</button>

      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Profile extends Vue{
  private user = {
    //name: '',
    //email: '',
    //phone: '',
    //location: ''
  }

  private showEditButton = false;
  
  
  mounted(){
    debugger;
    this.$root.$on('managePages', (user: {}, showEditButton: boolean ) => {
      this.showEditButton = showEditButton;
      this.user = user;
    });
  }
  

  
}
</script>


<style lang="scss" scoped>
.container{
  padding:5%;
  
  .img{
    text-align:center;

    .img-rounded{
      width: 300px;
      height: 300px;
    }
  }

  .details{
    border-left:3px solid #ded4da;

    p{
      font-size:15px;
      font-weight:bold;
    }
  }
}
</style>


