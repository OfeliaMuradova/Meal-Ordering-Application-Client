<template>
  <div class="order">
    <div class="container" style="margin-top: 50px;">
      <div class="row">
        <div class="heading">
          <h2>Place your order</h2>

          <div class="dropdown float-right">
            <select v-model="chosenWeek" class="form-control">
              <option selected >Current week</option>
              <option>Next week</option>
            </select>
          </div>
        </div>
            <table class="table table-striped table-hover">
              <caption>Enter the numbers (e.g. E1, E3 etc.) into the input fields 
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
                  <td>
                    <a href="" target="_blank"> Menu </a>  
                  </td>
                </tr>
                <tr>
                  <th scope="row">Mittwoch</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>
                    <a href="" target="_blank"> Menu </a>  
                  </td>
                </tr>
                <tr>
                  <th scope="row">Donnerstag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>
                    <a href="" target="_blank"> Menu </a>  
                  </td>
                </tr>
                <tr>
                  <th scope="row">Freitag</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals"></td>
                  <td>
                    <a href="" target="_blank"> Menu </a>  
                  </td>
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
import { Prop, Watch } from 'vue-property-decorator'
import { Menu, Order } from '@/types.ts'

@Component({})
export default class UserOrder extends Vue{
  @Prop() menusList: Array<Menu>;
  @Prop() ordersList: Array<Menu>;
  private chosenWeek: string = "Current week";
  private order: Order = {} as Order;

  get week(){
    if(this.chosenWeek === "Current week")
      return 'current';
    if(this.chosenWeek === "Next week")
      return 'next';
  }

  @Watch('week')
  onChildChanged(val: string, oldVal: string) {
    
  }

  private placeOrder(){

  }

}
</script>

<style lang="scss" scoped>
h2{
  // color: #114148;
  color: #666666;
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
