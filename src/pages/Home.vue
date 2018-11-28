<template>
<div id="home">
    <h1>Home page</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
			<span class="navbar-brand">
				<img src="@/assets/logo.png" width="150px" height="80px"/>
			</span>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">

					<li class="nav-item active">
						<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Menus</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Order</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#">Contact</a>
					</li>

				</ul>
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
</div>

</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component({})
export default class Home extends Vue{

}
</script>