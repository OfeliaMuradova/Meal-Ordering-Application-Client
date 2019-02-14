<template>
	<div id="home">
			<nav id="nav-b-override" class="navbar navbar-expand-lg navbar-light bg-light">
				<span class="navbar-brand">
					<img src="@/assets/logo.png" id="logo" width="150px" height="80px"/>
				</span>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>

				<div class="collapse navbar-collapse" id="navbarSupportedContent">

					<ul class="navbar-nav mr-auto" id="bootstrap-overrides-left">
						<router-link :to="{ name: 'slider'}" tag="li" active-class="nav-item active">
							<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
						</router-link>
						<router-link :to="{ name: 'order'}" tag="li" active-class="nav-item" :menusList = menusList :ordersList = ordersList>
							<a class="nav-link" href="#">Order</a>
						</router-link>
						<router-link :to="{ name: 'contact', params: { page: 'contact' }}" tag="li" active-class="nav-item">
							<a class="nav-link" href="#">Contact</a>
						</router-link>
					</ul>

					<ul class="navbar-nav ml-auto" id="bootstrap-overrides-right">
							<router-link v-if="isAdmin" :to="{ name: 'order'}" tag="li" active-class="nav-item">
								<a class="nav-link" href="#">Order
								<img class="icon" src="@/assets/order.png">
								</a>
							</router-link>
							<router-link :to="{ name: 'profile'}" tag="li" active-class="nav-item">
								<a class="nav-link" href="#">Profile
								<img class="icon" src="@/assets/avatar.png">
								</a>
							</router-link>
							<router-link :to="{ path: '/login'}" tag="li" v-on:click.native="logout()" active-class="nav-item">
								<a class="nav-link" href="#">Logout
									<img id="cart" src="@/assets/logout.png">
								</a>
							</router-link>
					</ul>
				
				</div>
			</nav>

			<router-view></router-view>

	</div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import { Prop, Watch } from 'vue-property-decorator';
import * as constants from '@/constants.ts'
import { Menu, Order, OrderDetails, OrderStatus } from '@/types.ts'

@Component({})
export default class Home extends Vue{
	private isAdmin: boolean = false;
	private ordersList: Array<Order> = [];
	private week: string = '';
	private menusList: Array<Menu> = [];

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(route: any) {
		if(route.name === 'slider'){
			let currentUser = constants.getObjectCookie("user");
			if(currentUser.userRole.name == "USER")
				this.isAdmin = false;
			else if(currentUser.userRole.name == "ADMIN")
				this.isAdmin = true;
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


<style lang="scss" scoped>
#bootstrap-overrides-left .nav-link {
	margin: 0 20px;
}

#bootstrap-overrides-right .nav-link {
	margin: 0 5px;

	#cart{
		width: 23px;
		height: 23px;
	}
}

.nav-link{
	font-size: 18px;
}

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

@media only screen and (max-width: 959px) {}

@media only screen and (min-width: 768px) and (max-width: 959px) {}

@media only screen and (max-width: 767px) {}

@media only screen and (min-width: 480px) and (max-width: 767px) {}

@media only screen and (max-width: 479px) {}


</style>
