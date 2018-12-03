<template>
  <div class="order">
    

    <div class="container">
      <div class="row">
        <div class="heading">
          <h2>Place your order</h2>

          <div class="dropdown float-right">
            <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Select week
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button">Action</button>
              <button class="dropdown-item" type="button">Another action</button>
              <button class="dropdown-item" type="button">Something else here</button>
            </div>
          </div>
        </div>
            <table class="table table-striped table-hover">
              <caption>This caption explains how to input data 
                <button type="button" class="btn btn-info float-right" v-on:click="placeOrder()">Place order</button>  
              </caption>

              <thead>
                <tr>
                  <th scope="col"> </th>
                  <th scope="col">Order meals</th>
                  <th scope="col">Menu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Montag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>
                    <a href="" target="_blank"> Menu </a>  
                  </td>
                </tr>
                <tr>
                  <th scope="row">Dienstag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>Thornton</td>
                </tr>
                <tr>
                  <th scope="row">Mittwoch</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <th scope="row">Donnerstag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>the Bird</td>
                </tr>
                <tr>
                  <th scope="row">Freitag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>the Bird</td>
                </tr>
              </tbody>
            </table>

      </div>  
    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Order extends Vue{

  private placeOrder(){

  }

}
</script>

<style lang="scss" scoped>
h2{
  color: #114148;
  display: inline;
}

.heading{
  position: relative;
  display: inline-block;
  width: 100%;
  margin: 15px 0 5px 0;

  h2{
    float: left;
  }

  .dropdown{
    right: 0;
  }
}

</style>


