<template>
  <div id="users" class="container-fluid">

    <div class="scroll">
      <table id="userTable" class="table table-hover table-striped">
        <thead>
          <tr class="d-flex">
            <th scope="col" class="col-1"></th>
            <th scope="col" class="col-2">Name</th>
            <th scope="col" class="col-2">Username</th>
            <th scope="col" class="col-2">Position</th>
            <th scope="col" class="col-2">Email</th>
            <th scope="col" class="col-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="(user, index) in list" v-bind:key="index">
            <th scope="row" class="col-1">{{ index + 1 }} </th>
            <td class="col-2 scrollable">{{ user.name }}</td>
            <td class="col-2 scrollable">{{ user.username }}</td>
            <td class="col-2 scrollable">{{ user.position }}</td>
            <td class="col-2 scrollable">{{ user.email }}</td>
            <td class="col-2 scrollable">{{ user.phone_number }}</td>
            <td class="col-1" align="right">  
              <img id="imgEdit" src="@/assets/edit1.png" data-toggle="modal" data-target="#addUserModal" @click="prepareEdit(user, user.id)">
              <img id="imgDelete" src="@/assets/delete1.png" @click="deleteUser(user.id)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addUserModal" @click="prepareAdd()">
      Add user
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="action == 'add'" class="modal-title" id="exampleModalLabel">New user: </h5>
            <h5 v-else-if="action == 'edit'" class="modal-title" id="exampleModalLabel">Edit user: </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col">
                <input type="text" class="form-control user-data" id="" placeholder="Name, Surname" v-model="addedOrUpdatedUser.name">
                <input type="text" class="form-control user-data" id="" placeholder="Username" v-model="addedOrUpdatedUser.username">
              </div>
              <div class="col">
                <input type="text" class="form-control user-data" id="" placeholder="Position" v-model="addedOrUpdatedUser.position">
                <input type="text" class="form-control user-data" id="" placeholder="E-mail" v-model="addedOrUpdatedUser.email">
                <input type="text" class="form-control user-data" id="" placeholder="Phone number" v-model="addedOrUpdatedUser.phone_number">
              </div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="checkUser" value="USER" checked v-model="addedOrUpdatedUser.userRole.name">
              <label class="form-check-label" for="exampleRadios1">
                User
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="checkAdmin" value="ADMIN" v-model="addedOrUpdatedUser.userRole.name">
              <label class="form-check-label" for="exampleRadios2">
                Admin
              </label>
            </div><!-- row -->
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="constants.reload()">Cancel</button>
            <button v-if="action == 'add'" type="button" class="btn btn-info" @click="addOrUpdateUser">Add</button>
            <button v-else-if="action == 'edit'" type="button" class="btn btn-info" @click="addOrUpdateUser">Submit</button>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator';
import * as constants from '@/constants.ts';
import axios from 'axios';
import { Order } from '@/types';

@Component({})
export default class Orders extends Vue{
  @Prop() list: any;

  private action: string = '';
  private addedOrUpdatedOrderID: number = null;
  //private addedOrUpdatedOrder = {} as Order;
  private addedOrUpdatedOrder: Order = {
    order_text: '',
    confirmer: {
      name: '',
      username: '',
      position: '',
      password: '',
      email: '',
      phone_number: '',
      userRole: {
        id: -1,
        name: ''
      }
    },
    menu: {
      path: '',
      weekNum: null,
      company: {
        name: '',
        webPageUrl: '',
        menus: []
      }
    }
  };

  private addOrUpdateUser(){
    if(this.action == 'add'){
      
      axios.post(constants.SERVERURL + '/admin/orders/', this.addedOrUpdatedOrder, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          location.reload();
        })
        .catch((error: any) => {
          console.log(error.response)
      });           
    }
    else if(this.action == 'edit'){
      axios.put(constants.SERVERURL + '/admin/orders/' + this.addedOrUpdatedOrderID, this.addedOrUpdatedOrder, {
          headers: constants.DEFAULT_HEADERS
          }).then( (response: any) => {
              location.reload();
          })
          .catch((error: any) => {
            console.log(error.response)
        });
    }
    else 
      alert('Something went wrong!');
  }

  private deleteOrder(id: number){
    debugger;
    axios.delete(constants.SERVERURL + '/admin/orders/' + id, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          debugger;
          console.log(response);
          location.reload();
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private prepareAdd(){
    debugger;
    this.action = 'add';

    //empty the object to clear the fields in the modal
    //this.addedOrUpdatedOrder = { } as Order;
    this.addedOrUpdatedOrder = {
    order_text: '',
    confirmer: {
      name: '',
      username: '',
      position: '',
      password: '',
      email: '',
      phone_number: '',
      userRole: {
        id: -1,
        name: ''
      }
    },
    menu: {
      path: '',
      weekNum: null,
      company: {
        name: '',
        webPageUrl: '',
        menus: []
      }
    }
  };
  }

  private prepareEdit(user: Order, id: number){
    debugger;
    this.action = 'edit';
    this.addedOrUpdatedOrder = user;
    this.addedOrUpdatedOrderID = id;
  }

}
</script>


<style scoped lang="scss">
.error{
  display: none;
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

#imgDelete{
  cursor: pointer; 
  width: 17px;
  height: 17px;
}

#imgEdit{
  margin-right: 10px;
  cursor: pointer; 
  width: 17px;
  height: 17px;
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

th, td{
  border: none!important;
}

tr:after {
  content: ' ';
  display: block;
  visibility: hidden;
  clear: both;
}

.user-data{
  margin: 15px 0;
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

</style>

