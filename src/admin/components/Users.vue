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
            <td class="col-2">{{ user.name }}</td>
            <td class="col-2">{{ user.username }}</td>
            <td class="col-2">{{ user.position }}</td>
            <td class="col-2">{{ user.email }}</td>
            <td class="col-2">{{ user.phone }}</td>
            <td class="col-1" align="right">  
                <img id="imgEdit" src="@/assets/edit1.png" @click="editUser(user.id)" >
                <img id="imgDelete" src="@/assets/delete1.png" @click="deleteUser(user.id)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addUserModal">
      Add user
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New user: </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col">
                <input type="text" class="form-control user-data" id="" placeholder="Name, Surname" v-model="newUser.name">
                <input type="text" class="form-control user-data" id="" placeholder="Username" v-model="newUser.username">
                <input type="text" class="form-control user-data" id="" placeholder="Password" v-model="newUser.password">
              </div>
              <div class="col">
                <input type="text" class="form-control user-data" id="" placeholder="Position" v-model="newUser.position">
                <input type="text" class="form-control user-data" id="" placeholder="E-mail" v-model="newUser.email">
                <input type="text" class="form-control user-data" id="" placeholder="Phone number" v-model="newUser.phone">
              </div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="checkUser" value="USER" checked v-model="newUser.role">
              <label class="form-check-label" for="exampleRadios1">
                User
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="exampleRadios" id="checkAdmin" value="ADMIN" v-model="newUser.role">
              <label class="form-check-label" for="exampleRadios2">
                Admin
              </label>
            </div><!-- row -->
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-info" @click="addUser">Add</button>
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
import { User } from '@/types';

@Component({})
export default class Users extends Vue{
  @Prop() list: any;

  private newUser: User = {
    name: '',
    username: '',
    position: '',
    password: '',
    email: '',
    phone: '',
    role: '',
  };

  private addUser(){
    console.log(this.newUser);

    // axios.post(constants.SERVERURL + '/admin/companies/', this.newUser, {
    //     headers: constants.DEFAULT_HEADERS
    //     }).then( (response: any) => {
    //       location.reload();
    //     })
    //     .catch((error: any) => {
    //       console.log(error.response)
    //   });
  }

  private editUser(id: number){
    axios.patch(constants.SERVERURL + '/admin/companies/' + id, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
            console.log('edited');
            console.log('/admin/companies/' + id);
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private deleteUser(id: number){
    axios.delete(constants.SERVERURL + '/admin/companies/' + id, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
            console.log('deleted');
            console.log(id);
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }
}
</script>


<style scoped lang="scss">

#imgDelete{
  cursor: pointer; 
  width: 20px;
  height: 20px;
}

#imgEdit{
  margin-right: 15px;
  cursor: pointer; 
  width: 20px;
  height: 20px;
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

.user-data{
  margin: 15px 0;
}

.scroll{
  height : 400px;
  overflow-y : scroll;
  margin-bottom: 30px;
}

</style>

