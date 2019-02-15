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
                  <!-- <th scope="col">Menu</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(orderDetail, index) in weeklyOrder.orderDetails" v-bind:key="index">
                  <th scope="row">{{ orderDetail.weekDay.day }}</th>
                  <td><input type="text" class="form-control" aria-describedby="meals" placeholder="Enter meals" v-model="orderDetail.orderText"></td>
                  <!-- <td>
                    <a :href="currentMenu" target="_blank"> Menu </a>  
                  </td> -->
                </tr>

              </tbody>
            </table>

      </div>  

      <div id="menuImageContainer" class="container-fluid">


      </div>

    </div>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Menu, Order, OrderDetails, WeekDay } from '@/types.ts'
import axios from 'axios'
import * as constants from '@/constants.ts'

@Component({})
export default class UserOrder extends Vue{
  private menusList: Array<Menu> = [];
  private chosenWeek: string = "Current week";
  private currentMenu: Menu = {};
  private orders: any = null;
  private currentOrders = {
    Monday: '',
    Tuesday: '',
    Wednesday: '',
    Thursday: '',
    Friday: '',
  };
  private action: string = '';
  private weeklyOrder: Order = {
    orderDetails: [
      { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Monday', englishName: 'Monday' } },
      { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Tuesday', englishName: 'Tuesday' } },
      { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Wednesday', englishName: 'Wednesday' } },
      { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Thursday', englishName: 'Thursday' } },
      { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Friday', englishName: 'Friday' } }
    ]
  };

  get week(){
    if(this.chosenWeek === "Current week")
      return 'current';
    if(this.chosenWeek === "Next week")
      return 'next';
  }

  @Watch('week')
  onChildChanged(val: string, oldVal: string) {
    axios.get(constants.SERVERURL + '/orders/orderMenus', {
      headers: constants.DEFAULT_HEADERS,
      params: {
        week: val
      }
      }).then( (response: any) => {
        this.currentMenu = response.data[0];
      })
      .catch((error: any) => {
        console.log(error.response)
    });

    // axios.get(constants.SERVERURL + '/orders/edit', {
    //   headers: constants.DEFAULT_HEADERS,
    //   params: {
    //     week: val
    //   }
    //   }).then( (response: any) => {
    //     if(response.data){
    //       var ordersList = response.data.orderDetails.map((orderDetail: OrderDetails) => ( {weekDay: orderDetail.weekDay.day, orderText: orderDetail.orderText}) );

    //       ordersList.forEach((order: any)=>{
    //         (<any>this.currentOrders)[order.weekDay] = order.orderText;
    //       });
    //     }else{
    //       ordersList = [];
    //       this.currentOrders = {
    //         Monday: '',
    //         Tuesday: '',
    //         Wednesday: '',
    //         Thursday: '',
    //         Friday: '',
    //       }
    //     }

    //   })
    //   .catch((error: any) => {
    //     console.log(error.response)
    // });

  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(route: any) {
		if (route.name === 'order') { 
      //get an order for current week
      axios.get(constants.SERVERURL + '/orders/edit', {
        headers: constants.DEFAULT_HEADERS,
        params: { week: "current" }
      }).then( (response: any) => {
        if(response.data){
          this.action = 'edit';

          this.weeklyOrder.orderDetails.forEach((orderDetail, index, ordersArray) => {
            response.data.orderDetails.forEach((o: any) => {
              if(orderDetail.weekDay.day === o.weekDay.day){
                ordersArray[index] = o;
              }
            });
          });

          console.log(this.weeklyOrder.orderDetails)

        }else{
          this.action = 'add';
        }
      })
      .catch((error: any) => {
        console.log(error.response)
    });

			axios.get(constants.SERVERURL + '/orders/orderMenus', {
				headers: constants.DEFAULT_HEADERS,
				params: {
					week: "current"
				}
        }).then( (response: any) => {
          this.currentMenu = response.data[0];
        })
        .catch((error: any) => {
          console.log(error.response)
			});
			
    }
  }

  private placeOrder(){
    debugger;
    if(this.action == 'add'){
      this.weeklyOrder = {
        validFrom: this.currentMenu.validFrom,
        validTo: this.currentMenu.validTo,
        user: constants.getObjectCookie("user")
      }
      
      axios.get(constants.SERVERURL + '/orders/weekDays', {
        headers: constants.DEFAULT_HEADERS,
        }).then( (response: any) => {
          var weekDays: Array<WeekDay> = response.data;

          this.weeklyOrder.orderDetails.forEach((order, index)=>{
            weekDays.forEach((weekDay, index)=>{
              if(order.weekDay.day === weekDay.day)
                order.weekDay.id = weekDay.id;
            });
          });

        })
        .catch((error: any) => {
          console.log(error.response)
      });

      console.log(this.weeklyOrder);
    
    }
    else if(this.action == 'edit'){
      debugger;

    }


  }

  // private getOrderByWeekday(day: string){
  //   let found = this.ordersList.find((element: any) => {
  //     return element.weekDay == day;
  //   });
  //   return (<any>found).orderText;
  // }

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
