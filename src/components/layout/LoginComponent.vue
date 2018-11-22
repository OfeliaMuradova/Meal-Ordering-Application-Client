<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign In</h5>

              <form class="form-signin" method="post" action="login" >
                <div class="form-label-group">
                  <label for="inputEmail">Username</label>
                  <input type="text" id="inputEmail" class="form-control"  autofocus>
                </div>

                <div class="form-label-group">
                   <label for="inputPassword">Password</label>
                   <input type="password" v-bind="password" id="inputPassword" class="form-control" >
                </div>

                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Remember me</label>
                </div>

                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
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
import axios from 'axios'

@Component({})
export default class LoginComponent extends Vue{
  private username: string;
  private password: string;
  private rememberMeChecked: boolean;

  private login() {
    var params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', 'user');
    params.append('password', 'admin');

    axios({
        method:'post',
        url:'generate-token/token',
        auth: {username: '', password: ''},
        headers: {"Content-type": "application/x-www-form-urlencoded; charset=utf-8"},
        data: params
    }).then( (response) => {
        this.set_cookie("access_token", response.data.access_token);
        document.location.replace("/");
    });

  }

  set_cookie(name:string, value:string) {
    document.cookie = name +'='+ value +'; Path=/;';
  }

}
</script>



<style lang="scss">
  
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

