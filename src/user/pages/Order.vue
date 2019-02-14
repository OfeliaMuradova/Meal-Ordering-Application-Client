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
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals" v-model="f"></td>
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
import { Menu, Order, OrderDetails } from '@/types.ts'
import axios from 'axios'
import * as constants from '@/constants.ts'

@Component({})
export default class UserOrder extends Vue{
  private menusList: Array<Menu> = [];
  private ordersList: Array<object> = [];
  private chosenWeek: string = "Current week";
  private orders: any = null;

  get week(){
    if(this.chosenWeek === "Current week")
      return 'current';
    if(this.chosenWeek === "Next week")
      return 'next';
  }

  @Watch('week')
  onChildChanged(val: string, oldVal: string) {
    //send request to get orders for changed week
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(route: any) {
		if (route.name === 'order') { 
			axios.get(constants.SERVERURL + '/orders/orderMenus', {
				headers: constants.DEFAULT_HEADERS,
				params: {
					week: "current"
				}
        }).then( (response: any) => {
					this.menusList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
			});
			
			axios.get(constants.SERVERURL + '/orders/edit', {
				headers: constants.DEFAULT_HEADERS,
				params: {
					week: "current"
				}
        }).then( (response: any) => {
          this.ordersList = response.data.orderDetails.map((orderDetail: OrderDetails) => ( {weekDay: orderDetail.weekDay.day, orderText: orderDetail.orderText}) );

          // var order = { Monday: 2, Tuesday: 3, Wednesday: 4, Thursday: 5, Friday: 6, Saturday: 7, Sunday: 8 };

          // this.ordersList.sort(function (a: any, b: any) {
          //     return (<any>order)[a.weekDay] - (<any>order)[b.weekDay];
          // });

          // // console.log(this.ordersList)
          // console.log(this.ordersList)

          this.getOrderByWeekday("Monday");

        })
        .catch((error: any) => {
          console.log(error.response)
			});

    }
  }

  private placeOrder(){

  }

  private getOrderByWeekday(day: string){
    debugger;
    let found = this.ordersList.find((element: any) => {
      return element.weekDay == day;
    });
    return (<any>found).orderText;
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
