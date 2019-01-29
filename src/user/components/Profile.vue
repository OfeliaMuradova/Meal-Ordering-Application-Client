<template>
  <div id="profile" class="container">
    <div class="row" style="align-items: center;">
      <div class="col-md-5 img">
        <img src="@/assets/profile.png"  alt="Profile picture" class="img-rounded">
      </div>
      <div class="col-md-5 details">
        <blockquote>
          <div id="name">
            <b><h3>{{ user.name }}</h3></b>
          </div>
          <div class="info-block">
            <label>Position: </label>
            <cite title="title">{{ user.position }} <i class="icon-map-marker"></i></cite>
          </div>
          <div class="info-block">
            <label>Phone number: </label>
            <cite title="title">{{ user.phone_number }} <i class="icon-map-marker"></i></cite>
          </div>
          <div class="info-block">
            <label>E-mail: </label>
            <cite title="title">{{ user.email }} <i class="icon-map-marker"></i></cite>
          </div>
           <button id="btnEditProfile" type="button" class="btn btn-info" data-toggle="modal" data-target="#modalEditProfile" >
            <img src="@/assets/editicon2.png" alt="Edit" width="20px" height="20px"/> 
            <span>Edit Profile</span>
          </button>
        </blockquote>

        <div class="modal fade" id="modalEditProfile" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Profile: </h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                
                <div class="row" id="fieldContainer">
                  <div class="col">
                    <label class="top">Name, Surname:</label>
                    <input type="text" class="form-control user-data" ref="inputName" placeholder="Enter name" v-model="user.name">
                    <label class="top">Username:</label>
                    <input type="text" class="form-control user-data" ref="inputUsername" placeholder="Enter username" v-model="user.username">
                    <label class="top">E-mail:</label>
                    <input type="email" class="form-control user-data" ref="inputEmail" placeholder="Enter email" v-model="user.email">
                  </div>
                  <div class="col">
                    <label class="top">Phone number:</label>
                    <input type="tel" class="form-control user-data" placeholder="Enter phone" ref="inputPhone" v-model="user.phone_number">
                    <label class="top">Position:</label>
                    <input type="text" class="form-control user-data" placeholder="Enter position" ref="inputPosition" v-model="user.position">
                  </div>
                </div>

                <div class="modal-footer row" id="modalMiddleFooter" >
                  <button type="button" class="btn btn-info" @click="editUserProfile()">Submit changes</button>
                </div>

                <div class="row" id="passwordContainerRow" >
                  <div class="col">
                    <label class="top" >Old password:</label>
                    <div class="passwordContainer">
                      <input type="password" class="form-control user-data" placeholder="Enter password" ref="inputOldPassword" v-model="oldPassword">
                      <span id="iconEye" ref="iconEye" class="fa fa-fw fa-eye" @click="switchVisibility($event)"></span>
                    </div>
                    <label class="top" >New password:</label>
                    <div class="passwordContainer">
                      <input type="password" class="form-control user-data" placeholder="Enter password" ref="inputNewPassword" v-model="newPassword">
                      <span id="iconEye" ref="iconEye" class="fa fa-fw fa-eye" @click="switchVisibility($event)"></span>
                    </div>
                    <label class="top" >Repeat password:</label>
                    <div class="passwordContainer">
                      <input type="password" class="form-control user-data" placeholder="Enter password" ref="inputRepeatedPassword" v-model="repeatedPassword">
                      <span id="iconEye" ref="iconEye" class="fa fa-fw fa-eye" @click="switchVisibility($event)"></span>
                    </div>
                  </div>
                </div>

              </div> <!-- modal-body -->

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="constants.reload()">Cancel</button>
                <button type="button" class="btn btn-info" @click="changePassword()">Change Password</button>
              </div>
            </div>
          </div>
        </div>
               
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { User } from '@/types.ts';
import * as constants from "@/constants.ts";
import axios from 'axios';

@Component({})
export default class Profile extends Vue{
  private oldPassword: string = '';
  private newPassword: string = '';
  private repeatedPassword: string = '';

  private user: User = { 
    id: null,
    name: '',
    username: '',
    email: '',
    position: '',
    phone_number: ''
  };
  
  created(){
    let savedUser = <User>constants.getObjectCookie("user");
    
    this.user = {
      id: savedUser.id,
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
      position: savedUser.position,
      phone_number: savedUser.phone_number
    };
  }

  private editUserProfile(){
    debugger;
    axios.put(constants.SERVERURL + '/user/' + this.user.id, this.user, {
      headers: constants.DEFAULT_HEADERS
      }).then( (response: any) => {
        constants.delete_cookie('user');
        constants.set_cookie("user", JSON.stringify(this.user));
        location.reload();
      })
      .catch((error: any) => {
        console.log(error.response)
    }); 
  }

  private changePassword(){
    if( ((<HTMLInputElement>this.$refs.inputOldPassword).value.trim() == "") ||
        ((<HTMLInputElement>this.$refs.inputNewPassword).value.trim() == "") ||
        ((<HTMLInputElement>this.$refs.inputRepeatedPassword).value.trim() == "")) {
          alert('empty!')
    }
    else{
      if((<HTMLInputElement>this.$refs.inputNewPassword).value !== (<HTMLInputElement>this.$refs.inputRepeatedPassword).value){
        alert("Passwords should match");
      }
      else{
        debugger;
        axios.post(constants.SERVERURL + '/user/changePassword/' + this.user.id, { oldPassword: this.oldPassword, newPassword: this.newPassword }, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          debugger;
          alert("Password successfully changed!");
          location.reload();
        })
        .catch((error: any) => {
          console.log(error.response)
        }); 
      }
    }

      
  }

  private switchVisibility(event: any) {
    debugger;
    let span = <Element>event.target;
    let input = <Element>span.previousSibling;

    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      span.removeAttribute('class');
      span.setAttribute('class', 'fas fa-eye-slash');
    }
    else{ 
      input.setAttribute('type', 'password');
      span.removeAttribute('class');
      span.setAttribute('class', 'fa fa-fw fa-eye');
    }
  }

}
</script>

<style lang="scss" scoped>
#profile{
  margin: 0 auto;

  .img{
    text-align:center;

    .img-rounded{
      width: 300px;
      height: 300px;
    }
  }

  .details{
    border-left:3px solid #ded4da;
    margin-top: 20px;
    padding-left: 4%;

    p{
      font-size:15px;
      font-weight:bold;
    }
  }

  blockquote label{
    color: grey;
    margin-right: 4px;
    margin-bottom: 16px;
  }

  h3{
    display: inline;
  }

  .info-block{
    display: block;
  }

  #btnEditProfile span {
    padding-left: 9px;
  }
  
  #modalEditProfile{
    label{
      margin-top: 15px;
      margin-bottom: 3px;
      color: #46484a;
    }
  }

  #iconEye{
    cursor: pointer;
    position: absolute;
    top: 25%;
    right: 3%;
    color: darkgrey;
  }

  .passwordContainer{
    position: relative;
  }

  #passwordContainerRow{
    border-top: 1px solid #e9ecef;
  }

  #exampleModalLabel{
    color: #17a2b8;
    font-size: 24px;
  }
  
  .modal-body{
    padding-top: 0;
  }

  #modalMiddleFooter{
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: none;
  }

  blockquote{
    b{
      h3{
        font-size: 35px;
      }
    }
  }

  div#name{
    margin-bottom: 15px;
  }

}
</style>