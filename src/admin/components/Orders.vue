<template>
  <div id="orders" class="container-fluid">
    <div class="form-group" id="pageTitle">
      <h4>Current orders</h4>
    </div>
    <nav>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-pending-tab" data-toggle="tab" href="#nav-pending" role="tab" aria-controls="nav-pending" aria-selected="true" @click="getPendingOrders()" >Pending</a>
        <a class="nav-item nav-link" id="nav-confirmed-tab" data-toggle="tab" href="#nav-confirmed" role="tab" aria-controls="nav-confirmed" aria-selected="false" @click="getConfirmedOrders()">Confirmed</a>
        <a class="nav-item nav-link" id="nav-cancelled-tab" data-toggle="tab" href="#nav-cancelled" role="tab" aria-controls="nav-cancelled" aria-selected="false" @click="getCancelledOrders()">Cancelled</a>
      </div>
      <div id="dropdownChooseWeek">
        <select v-model="chosenWeek" class="form-control">
          <option selected >Current week</option>
          <option>Next week</option>
        </select>
      </div>
    </nav>
    <!-- Pending -->
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
        <div class="scroll">
          <table id="orderTable" class="table table-hover table-striped">
            <thead class="thead-light">
              <tr class="d-flex">
                <th scope="col" class="col-1"></th>
                <th scope="col" class="col-2">Customer</th>
                <th scope="col" class="col-3">Order text</th>
                <th scope="col" class="col-3">Menu</th>
                <th scope="col" class="col-2">Week day</th>
                <th scope="col" class="col-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr class="d-flex" v-for="(order, index) in updatedList" :key="order.id">
                <th scope="row" class="col-1">{{ index + 1 }} </th>
                <td class="col-2 scrollable">{{ order.order.user.name }}</td>
                <td class="col-3 scrollable">{{ order.orderText }}</td>
                <td class="col-3 scrollable"><a :href="order.menu.path" target="_blank">{{ order.menu.path }}</a></td>
                <td class="col-2 scrollable">{{ order.weekDay.day }}</td>
                <td class="col-1" align="right">  
                  <img class="imgConfirm" src="@/assets/unchecked.png" v-b-tooltip.hover title="Confirm order" @click="confirmOrder(order, order.id)">
                  <img class="imgDelete" src="@/assets/delete.png" v-b-tooltip.hover title="Cancel order" @click="cancelOrder(order, order.id)">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Confirmed -->
      <div class="tab-pane fade" id="nav-confirmed" role="tabpanel" aria-labelledby="nav-confirmed-tab">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
            <div class="scroll">
              <table id="orderTable" class="table table-hover table-striped">
                <thead class="thead-light">
                  <tr class="d-flex">
                    <th scope="col" class="col-1"></th>
                    <th scope="col" class="col-2">Customer</th>
                    <th scope="col" class="col-3">Order text</th>
                    <th scope="col" class="col-3">Menu</th>
                    <th scope="col" class="col-2">Week day</th>
                    <th scope="col" class="col-1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="d-flex" v-for="(order, index) in updatedList" :key="order.id">
                    <th scope="row" class="col-1">{{ index + 1 }} </th>
                    <td class="col-2 scrollable">{{ order.order.user.name }}</td>
                    <td class="col-3 scrollable">{{ order.orderText }}</td>
                    <td class="col-3 scrollable"><a :href="order.menu.path" target="_blank">{{ order.menu.path }}</a></td>
                    <td class="col-2 scrollable">{{ order.weekDay.day }}</td>
                    <td class="col-1" align="right">  
                      <img class="imgConfirm" src="@/assets/checked.png" style="cursor: default;" >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Order Summary -->
            <h4>Order Summary</h4>
            <div id="orderSummary" class="container-fluid">
              <div class="scroll">
                <table class="table">
                  <thead class="thead-light">
                    <tr class="d-flex">
                      <th scope="col" class="col-1"></th>
                      <th scope="col" class="col-5">Meal type</th>
                      <th scope="col" class="col-6">Ordered quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr class="d-flex" v-for="(qty, name, index) in orderSummaryList" :key="index">
                    <th scope="row" class="col-1">{{ index + 1 }} </th>
                    <td class="col-5">{{ name }}</td>
                    <td class="col-6">{{ qty }}</td>
                  </tr>
                </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- Cancelled -->
      <div class="tab-pane fade" id="nav-cancelled" role="tabpanel" aria-labelledby="nav-cancelled-tab">
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-pending" role="tabpanel" aria-labelledby="nav-pending-tab">
            <div class="scroll">
              <table id="orderTable" class="table table-hover table-striped">
                <thead class="thead-light">
                  <tr class="d-flex">
                    <th scope="col" class="col-1"></th>
                    <th scope="col" class="col-2">Customer</th>
                    <th scope="col" class="col-3">Order text</th>
                    <th scope="col" class="col-3">Menu</th>
                    <th scope="col" class="col-2">Week day</th>
                    <th scope="col" class="col-1"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="d-flex" v-for="(order, index) in updatedList" :key="order.id">
                    <th scope="row" class="col-1">{{ index + 1 }} </th>
                    <td class="col-2 scrollable">{{ order.order.user.name }}</td>
                    <td class="col-3 scrollable">{{ order.orderText }}</td>
                    <td class="col-3 scrollable"><a :href="order.menu.path" target="_blank">{{ order.menu.path }}</a></td>
                    <td class="col-2 scrollable">{{ order.weekDay.day }}</td>
                    <td class="col-1" align="right">  
                      <img class="imgConfirm" src="@/assets/delete.png" style="cursor: default;">
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal -->
      <!-- <b-modal id="modalConfirm" centered hide-header hide-footer ok-variant="info">
        <p class="my-4 modalContent">Confirm this order?</p>
        <div class="modal-footer">
          <button type="button" class="btn btn-info" @click="confirmOrder()">Confirm</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="reload()">Cancel</button>
        </div>
      </b-modal> -->
    

  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator';
import * as constants from '@/constants.ts';
import axios from 'axios';
import { Order } from '@/types';

@Component({})
export default class Orders extends Vue{
  private chosenWeek: string = 'Current week';
  private updatedList: Array<Order> = [];
  private orderStatusImage: string = '';
  private currentOrderID: number = null;
  private currentOrder = {} as Order;
  private currentTab: string = 'Pending';
  private orderSummaryList: { name: string, qty: number }[] = [];

  get week(){
    if(this.chosenWeek === "Current week")
      return 'current';
    if(this.chosenWeek === "Next week")
      return 'next';
  }

  @Watch('week')
  onChildChanged(val: string, oldVal: string) {
    axios.get(constants.SERVERURL + '/admin/orders/list', {
        headers: constants.DEFAULT_HEADERS,
        params: {
            name: this.currentTab,
            week: this.week
          }
        }).then( (response: any) => {
          this.updatedList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
   }

  private cancelOrder(order: Order){   
     axios.post(constants.SERVERURL + '/admin/orders/set_status/' + order.id, null, {
      headers: constants.DEFAULT_HEADERS,
        params: {
          name: "Cancelled"
        }
      }).then( (response: any) => {
        window.location.reload();
      })
      .catch((error: any) => {
        console.log(error.response)
    });

  }

  private confirmOrder(order: Order){
    axios.post(constants.SERVERURL + '/admin/orders/set_status/' + order.id, null, {
      headers: constants.DEFAULT_HEADERS,
        params: {
          name: "Confirmed"
        }
      }).then( (response: any) => {
        window.location.reload();
      })
      .catch((error: any) => {
        console.log(error.response)
    });

  }

  mounted(){
    this.currentTab = "Pending";

    axios.get(constants.SERVERURL + '/admin/orders/list', {
        headers: constants.DEFAULT_HEADERS,
        params: {
            name: 'Pending',
            week: this.week
          }
        }).then( (response: any) => {
          this.updatedList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private getPendingOrders(){
    this.currentTab = "Pending";

    axios.get(constants.SERVERURL + '/admin/orders/list', {
        headers: constants.DEFAULT_HEADERS,
        params: {
            name: 'Pending',
            week: this.week
          }
        }).then( (response: any) => {
          this.updatedList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private getCancelledOrders(){
    this.currentTab = "Cancelled";    

    axios.get(constants.SERVERURL + '/admin/orders/list', {
        headers: constants.DEFAULT_HEADERS,
        params: {
            name: 'Cancelled',
            week: this.week
          }
        }).then( (response: any) => {
          this.updatedList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private getConfirmedOrders(){
    this.currentTab = "Confirmed";    

    axios.get(constants.SERVERURL + '/admin/orders/list', {
        headers: constants.DEFAULT_HEADERS,
        params: {
            name: 'Confirmed',
            week: this.week
          }
        }).then( (response: any) => {
          this.updatedList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });

      this.getOrderSummary();
  }

  private getOrderSummary(){
    axios.get(constants.SERVERURL + '/admin/orders/getOrdersSum', {
        headers: constants.DEFAULT_HEADERS,
        params: { week: this.week },
        }).then( (response: any) => {
          this.orderSummaryList = response.data;
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

}
</script>


<style scoped lang="scss">
h4{
  color: #606060;
}

.error{
  display: none;
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.imgDelete{
  cursor: pointer; 
}

.imgConfirm{
  margin-right: 10px;
  cursor: pointer; 
}

#form{
  width: 100%;
  tbody{
    max-height: 400px;
    overflow-y: auto;
    }
  tbody, tr{
    display: block;
  }
  th, td{
    border: none;
  }
}

table{
  margin-top: 15px;
}

th, td{
  border: none!important;
}

tr:after {
  content: ' ';
  display: block;
  visibility: hidden;
  clear: both;
}

.modalContent{
  font-size: 18px;
  text-align: center;
}

.modal-footer{
  text-align: center;
  justify-content: center;
  align-items: center;
}

.scroll{
  height : 400px;
  overflow-y : scroll;
  margin-bottom: 30px;
}

//cell
.scrollable{
  width: 100%;
  height: 100%;
  overflow: auto;
}

#dropdownChooseWeek{
  position: absolute;
    top: 35px;
    right: 30px
}

#orderSummary{
  padding: 0;

  .scroll{
    height : 300px;
    overflow-y : scroll;
    margin-bottom: 30px;
  }
}


#pageTitle{
  font: normal normal normal 28px Raleway, sans-serif;  
}
</style>

