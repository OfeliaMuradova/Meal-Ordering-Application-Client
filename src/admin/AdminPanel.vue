<template>
  <div id="adminPanel">
    <nav id="nav-b-override" class="navbar navbar-expand-lg navbar-light bg-light">
      <span class="navbar-brand">
        <img src="@/assets/logo.png" id="logo" width="150px" height="80px"/>
      </span>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" id="bootstrap-overrides-right">
            <router-link :to="{ name: 'adminOrder'}" tag="li" active-class="nav-item">
              <a class="nav-link" href="#">Order
              <img class="icon" src="@/assets/order.png">
              </a>
            </router-link>
            <router-link :to="{ name: 'adminProfile', params: { page: 'profile' }}" tag="li" active-class="nav-item">
              <a class="nav-link" href="#">Profile
              <img class="icon" src="@/assets/avatar.png">
              </a>
            </router-link>
            <router-link :to="{ path: '/login'}" tag="li" v-on:click.native="logout()" active-class="nav-item">
              <a class="nav-link" href="#">Logout
                <img class="icon" src="@/assets/logout.png">
              </a>
            </router-link>
        </ul>
      </div>
		</nav>

    <div class="container-fluid">
      <div class="row">
        <div id="left-nav" class="col-sm-3 col-md-3 col-lg-2 col-xl-2 bg-light">
            <nav class="navbar navbar-light navbar-expand-sm px-0 flex-row flex-nowrap">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarWEX" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse" >
                    <div class="nav flex-sm-column flex-row" id="navbarWEX">
                        <router-link :to="{ name: 'companies'}" tag="li" active-class="nav-item ">
                          <a class="nav-link" href="#">Companies</a>
                        </router-link>              
                        <router-link :to="{ name: 'adminMenus'}" tag="li" active-class="nav-item ">
                          <a class="nav-link" href="#">Menus</a>
                        </router-link>              
                        <router-link :to="{ name: 'orders'}" tag="li" active-class="nav-item ">
                          <a class="nav-link" href="#">Orders</a>
                        </router-link>              
                        <router-link :to="{ name: 'users'}" tag="li" active-class="nav-item">
                          <a class="nav-link" href="#">Users</a>
                        </router-link>              
                        <router-link :to="{ name: 'companies'}" tag="li" active-class="nav-item ">
                          <a class="nav-link" href="#">Contents</a>
                        </router-link>              
                    </div>
                </div>
            </nav>
        </div>
        <div class="col py-2" id="content">
          <router-view :componentName=componentName :list=list></router-view>
        </div>
      </div>
    </div>  

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import { userList } from '@/types';
import axios from 'axios';
import * as constants from '@/constants.ts';

@Component({})
export default class AdminPanel extends Vue{
  private list: any = [];

  get componentName() {
    if (this.$route.name === 'adminMenus') { return 'menus' }
    if (this.$route.name === 'companies') { return 'companies'}
    if (this.$route.name === 'users') { return 'users'}
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(route: any) {
      if (route.name === 'adminMenus') { 
      axios.get(constants.SERVERURL + '/admin/menus/list', {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          this.list = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
    }

    if (route.name === 'companies') { 
      axios.get(constants.SERVERURL + '/admin/companies/list', {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          this.list = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
    }

    if (route.name === 'users') { 
      axios.get(constants.SERVERURL + '/admin/users/list', {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          this.list = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
     }
  }

	private logout() {
		try{
			constants.delete_cookie('access_token');
			this.$router.replace({ path: "/login" });
		}
		catch(error) {
			console.log(error.response)
		};
	}

}
</script>


<style scoped lang="scss">
#left-nav a{
  color: rgba(0, 0, 0, 0.5);
}

#bootstrap-overrides-right .nav-link {
	margin: 0 5px;
}

.icon{
  width: 23px;
  height: 23px;
}

.nav-link{
  font-size: 18px;
  padding: 15px 40px; 
}

#navbarWEX:first-child{
  padding-top: 20px;  
}

#content{
  padding-top: 36px!important;
}

</style>

