<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Welcome</h5>
              <form class="form-signin" method="post" action="login" >
                <div class="form-label-group">
                  <label for="inputUsername">Username</label>
                  <input type="text" id="inputUsername" ref="inputUsername" v-model="username" class="form-control" :data-state="usernameState" autofocus >  
                  <label id="errorUsername" ref="errorUsername">Please enter a username!</label>
                </div>
                <div class="form-label-group">
                   <label for="inputPassword">Password</label>
                   <input type="password" id="inputPassword" ref="inputPassword" v-model="password" class="form-control" :data-state="passwordState" > 
                   <label id="errorPassword" ref="errorPassword">Please enter a password!</label>
                </div>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" v-on:click="login" type="button">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios';
import * as constants from '@/constants.ts';
import { User } from "@/types.ts";

@Component({})
export default class Login extends Vue{
  private username: string = '';
  private password : string = '';
  private usernameState: string = '';
  private passwordState: string = '';
  private user: User = {
    id: null,
    name: '',
    username: '',
    email: '',
    password: '',
    position: '',
    phone_number: '',
    userRole: {
      id: null,
      name: ''
    }
  };

  private login() {
    if(constants.validatorEmpty(<Element>this.$refs.inputUsername, <Element>this.$refs.errorUsername)
       && constants.validatorEmpty(<Element>this.$refs.inputPassword, <Element>this.$refs.errorPassword) ){
        let data = {
          username: this.username,
          password: this.password
        }

        //todo: 
        //daloginebis dros token plaxoi
        //orders are always disabled

        axios.post( constants.SERVERURL + '/login', data, {
          headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'crossDomain': true,
            }
          }).then( (response: any) => {
              this.user = {
                id: response.data.id,
                name: response.data.name,
                username: response.data.username,
                email: response.data.email,
                position: response.data.position,
                phone_number: response.data.phone_number,
                userRole: {
                  id: response.data.userRole.id,
                  name: response.data.userRole.name
                }
              }

              constants.delete_cookie("access_token");
              constants.set_cookie("access_token", response.data.token);
              constants.set_cookie("user", JSON.stringify(this.user));

              if(this.user.userRole.name == "USER")          
                this.$router.replace({ name: "slider"});
              else if(this.user.userRole.name == "ADMIN")              
                this.$router.replace({ name: "admin" });
              else{
                alert('Something went wrong!');
                this.$router.replace({ name: "login" });
              }

          })
          .catch((error: any) => {
            console.log(error.response)
            if (error.response.status === 401) {
              alert("Failed to login");
            }
            this.$router.replace({ name: "login" });
        });
    }
  }

}
</script>

<style scoped lang="scss">
  #errorUsername, #errorPassword{
    display: none;
    color: red;
    font-size: 14px;
  }

  .card-signin {
    border: 0;
    border-radius: 1rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  }

  .card-signin .card-title {
    margin-bottom: 2rem;
    font-weight: 300;
    font-size: 1.5rem;
  }

  .card-signin .card-body {
    padding: 2rem;
  }

  .form-signin {
    width: 100%;

    .btn {
      font-size: 80%;
      letter-spacing: .1rem;
      font-weight: bold;
      padding: 1rem;
      transition: all 0.2s;
    }
  }

  .form-label-group {
    position: relative;
    margin-bottom: 1rem;

    input{
      padding: 10px;
      font-size: 15px;
    }

    input::-webkit-input-placeholder {
      color: transparent;
    }

    input:-ms-input-placeholder {
      color: transparent;
    }

    input::-ms-input-placeholder {
      color: transparent;
    }

    input::-moz-placeholder {
      color: transparent;
    }

    input::placeholder {
      color: transparent;
    }

  }

</style>
