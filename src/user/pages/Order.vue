<template>
  <div class="order">
    <div class="container" style="margin-top: 50px;">
      <div class="row">
        <div class="heading">
          <h2>Place your order</h2>

          <div class="dropdown float-right" >
            <select v-model="chosenWeek" ref="weekSelect" class="form-control">
              <option selected >Current week</option>
              <option>Next week</option>
            </select>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <caption>Enter the numbers (e.g. E1, E3 etc.) into the input fields 
            <button :disabled="!currentMenu" type="button" class="btn btn-info float-right" v-on:click="placeOrder()">Place order</button>  
          </caption>

          <thead>
            <tr class="d-flex">
              <th scope="col" class="col-2"> </th>
              <th scope="col" class="col-6">Order meals</th>
              <th scope="col" class="col-2">Menu</th>
              <th scope="col" class="col-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row" class="d-flex" v-for="(orderDetail, index) in weeklyOrder.orderDetails" v-bind:key="index">
              <th scope="col" class="col-2">{{ orderDetail.weekDay.day }}</th>
              <td scope="col" v-if="orderDetail.orderStatus" class="col-6">
                <input :disabled="!currentMenu || orderDetail.orderStatus.name == 'Confirmed'" ref="monday" type="text" class="form-control" aria-describedby="meals" placeholder="Enter meal numbers" v-model="orderDetail.orderText">
              </td>
              <td scope="col" v-else class="col-6"><input :disabled="!currentMenu" ref="monday" type="text" class="form-control" aria-describedby="meals" placeholder="Enter meal numbers" v-model="orderDetail.orderText"></td>
              <td scope="col" class="col-2">
                <a v-if="currentMenu" :href="currentMenu.path" target="_blank"> Menu </a>
                <a v-else target="_blank"> No menu provided </a>  
              </td>
              <td v-if="orderDetail.orderStatus && orderDetail.orderText" scope="col" class="col-1">{{ orderDetail.orderStatus.name }}</td>
              <td v-else scope="col" class="col-2"></td>
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
    if(this.chosenWeek === "Next week"){
      return 'next';
    }
    else return 'current';
  }

  @Watch('week')
  onChildChanged(val: string, oldVal: string) {
    constants.set_cookie("chosenWeek", this.chosenWeek);

    axios.get(constants.SERVERURL + '/orders/orderMenus', {
      headers: constants.DEFAULT_HEADERS,
      params: { week: val }
      }).then( (response: any) => {
        if(response.data)
          this.currentMenu = response.data[0];
      })
      .catch((error: any) => {
        console.log(error.response)
    });

    //get an order for chosen week
    axios.get(constants.SERVERURL + '/orders/edit', {
      headers: constants.DEFAULT_HEADERS,
      params: { week: val }
    }).then( (response: any) => {
      if(response.data){
        this.action = 'edit';
        debugger;

        this.weeklyOrder.orderDetails.forEach((orderDetail, index, ordersArray) => {
            response.data.orderDetails.forEach((o: any) => {
              if(orderDetail.weekDay.day === o.weekDay.day){
                ordersArray[index] = o;
              }
            });
          });

        this.sortByWeekDay(this.weeklyOrder.orderDetails);
      }else{
          this.action = 'add';
          this.weeklyOrder = {
            orderDetails: [
              { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Monday', englishName: 'Monday' } },
              { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Tuesday', englishName: 'Tuesday' } },
              { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Wednesday', englishName: 'Wednesday' } },
              { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Thursday', englishName: 'Thursday' } },
              { menu: this.currentMenu, orderText: '', weekDay: { id: null, day: 'Friday', englishName: 'Friday' } }
            ]
          };
      }
    })
    .catch((error: any) => {
      console.log(error.response)
    });
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(route: any) {
		if (route.name === 'order' || route.name === "adminOrder") { 
      this.chosenWeek = constants.getCookie("chosenWeek");

      //get an order for current week
      axios.get(constants.SERVERURL + '/orders/edit', {
        headers: constants.DEFAULT_HEADERS,
        params: { week: this.week }
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
          //so that the view is 'refreshed'            
          this.simulateInput((<any>this.$refs.monday)[0]);
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
					week: this.week
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
    let orderDetails: Array<OrderDetails> = [];
        
    this.weeklyOrder.orderDetails.forEach((orderDetail, index, arr)=>{
      if(orderDetail.orderStatus != null && orderDetail.orderStatus.name !== "Confirmed")  // || !orderDetail.orderText
        orderDetails.push(orderDetail);
    });

    this.weeklyOrder.orderDetails = orderDetails;
    this.weeklyOrder.validFrom = this.currentMenu.validFrom;
    this.weeklyOrder.validTo = this.currentMenu.validTo;
    this.weeklyOrder.user = constants.getObjectCookie("user");

    if(this.action == 'add'){
      axios.get(constants.SERVERURL + '/orders/weekDays', {
        headers: constants.DEFAULT_HEADERS,
        }).then( (response: any) => {
          var weekDays: Array<WeekDay> = response.data;

          this.weeklyOrder.orderDetails.forEach((order, index)=>{
            this.weeklyOrder.orderDetails[index].menu = this.currentMenu;
            weekDays.forEach((weekDay, index)=>{
              if(order.weekDay.day === weekDay.day)
                this.weeklyOrder.orderDetails[index].weekDay.id = weekDay.id;
            });
          });

          axios.post(constants.SERVERURL + '/orders/', this.weeklyOrder, {
            headers: constants.DEFAULT_HEADERS,
            }).then( (response: any) => {
              window.location.reload();
            })
            .catch((error: any) => {
              if (error.response.status == 500){
                alert(error.response.data.message);
              }
              console.log(error.response)
          });

        })
        .catch((error: any) => {
          console.log(error.response)
      });

    }
    else if(this.action == 'edit'){
      //get the id of current order
      axios.get(constants.SERVERURL + '/orders/edit', {
        headers: constants.DEFAULT_HEADERS,
        params: { week: this.week }
      }).then( (response: any) => {
          this.weeklyOrder.id = response.data.id;

          //update order
          axios.put(constants.SERVERURL + '/orders/' + this.weeklyOrder.id, this.weeklyOrder, {
            headers: constants.DEFAULT_HEADERS,
            params: { week: this.week }
          }).then( (response: any) => {
            window.location.reload();
          })
          .catch((error: any) => {
            if (error.response.status == 500){
              alert(error.response.data.message);
            }
            console.log(error.response)
          });

      })
      .catch((error: any) => {
        console.log(error.response)
      });

    }

  }

  private simulateInput(inp: any) {
    var ev = new Event('input');
    
    inp.value = inp.value + ' ';
    inp.dispatchEvent(ev);
  }

  private sortByWeekDay(arr: Array<any>){
    var order = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5 };
    arr.sort((a: any, b: any) => {
      return (<any>order)[a.weekDay.day] - (<any>order)[b.weekDay.day];
    });
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
  margin: 0 0 5px 0;

  h2{
    float: left;
    font: normal normal normal 30px Raleway, sans-serif;
    letter-spacing: 1px;
    font-weight: 555;
  }

  .dropdown{
    right: 0;
  }
}

.table{
  margin-top: 10px;
  font: normal normal 16px tahoma, sans-serif;
  letter-spacing: 0.3px;
}

</style>
