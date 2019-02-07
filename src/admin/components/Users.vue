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
              <img id="imgEdit" src="@/assets/edit1.png" v-if="user.userRole.name == 'USER'" data-toggle="modal" data-target="#addUserModal" @click="prepareEdit(user, user.id)">
              <img id="imgDelete" src="@/assets/delete.png" @click="deleteUser(user.id)">
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
                <label class="top">Name, Surname</label>
                <input type="text" class="form-control user-data" ref="inputName" placeholder="Enter name" v-model="addedOrUpdatedUser.name">
                <label class="error" ref="errorEmptyName">* This field is required</label>
                <label class="top">Username</label>
                <input type="text" class="form-control user-data" ref="inputUsername" placeholder="Enter username" v-model="addedOrUpdatedUser.username">
                <label class="error" ref="errorEmptyUsername">* This field is required</label>
                <label class="top">E-mail</label>
                <input type="email" class="form-control user-data" ref="inputEmail" placeholder="Enter email" v-model="addedOrUpdatedUser.email">
                <label class="error" ref="errorEmptyEmail">* This field is required</label>
                <label class="error" ref="errorWrongEmail">Please enter a valid email</label>
              </div>
              <div class="col">
                <label class="top">Phone number</label>
                <input type="tel" class="form-control user-data" placeholder="Enter phone" ref="inputPhone" v-model="addedOrUpdatedUser.phone_number">
                <label class="error" ref="errorEmptyPhone">* This field is required</label>
                <label class="top">Position</label>
                <input type="text" class="form-control user-data" placeholder="Enter position" ref="inputPosition" v-model="addedOrUpdatedUser.position">
                <label class="error" ref="errorEmptyPosition">* This field is required</label>
                <label class="top" v-if="action=='add'">Password</label>
                <input type="password" v-if="action=='add'" class="form-control user-data" placeholder="Enter password" ref="inputPassword" v-model="addedOrUpdatedUser.password">
                <label class="error" ref="errorEmptyPassword">* This field is required</label>
              </div>
            </div>
            <div class="checkboxes">
              <div class="form-check">
                <input class="form-check-input" checked type="radio" name="exampleRadios" id="checkUser" value="USER" v-model="addedOrUpdatedUser.userRole.name">
                <label class="form-check-label" for="exampleRadios1">
                  User
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="checkAdmin" value="ADMIN" v-model="addedOrUpdatedUser.userRole.name">
                <label class="form-check-label" for="exampleRadios2">
                  Admin
                </label>
              </div>
            </div>
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="constants.reload()">Cancel</button>
            <button v-if="action == 'add'" type="button" class="btn btn-info" @click="addOrUpdateUser">Add</button>
            <button v-else-if="action == 'edit'" type="button" class="btn btn-info" @click="addOrUpdateUser">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <modal-dialog v-if="showModal" :modalText=modalText></modal-dialog>
    
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator';
import * as constants from '@/constants.ts';
import axios from 'axios';
import { User } from '@/types';
import Modal from '@/Modal.vue';

@Component({
  components: {
    'modal-dialog': Modal
  }
})
export default class Users extends Vue{
  @Prop() list: any;

  private showModal: boolean = false;
  private modalText: string = '';
  private action: string = '';
  private addedOrUpdatedUserID: number = null;
  private addedOrUpdatedUser: User = {
    name: '',
    username: '',
    position: '',
    password: '',
    email: '',
    phone_number: '',
    userRole: {
      id: null,
      name: ''
    }
  };

  private addOrUpdateUser(){
    if(this.action == 'edit' || this.action == 'add'){
      if(constants.validatorEmpty(<Element>this.$refs.inputName, <Element>this.$refs.errorEmptyName)
        && constants.validatorEmpty(<Element>this.$refs.inputUsername, <Element>this.$refs.errorEmptyUsername)
        && constants.validatorEmpty(<Element>this.$refs.inputEmail, <Element>this.$refs.errorEmptyEmail)
        && constants.validatorEmpty(<Element>this.$refs.inputPhone, <Element>this.$refs.errorEmptyPhone)
        && constants.validatorEmpty(<Element>this.$refs.inputPosition, <Element>this.$refs.errorEmptyPosition)){
      
          if(this.action == 'add'){
            if(this.addedOrUpdatedUser.userRole.name == 'USER'){
              this.addedOrUpdatedUser.userRole.id = 2;
            }
            else if(this.addedOrUpdatedUser.userRole.name == 'ADMIN'){
              this.addedOrUpdatedUser.userRole.id = 1;
            }
            else { 
              alert('Wrong user role!');
            }

            axios.post(constants.SERVERURL + '/admin/users/', this.addedOrUpdatedUser, {
              headers: constants.DEFAULT_HEADERS
              }).then( (response: any) => {
                location.reload();
              })
              .catch((error: any) => {
                console.log(error.response)
            });           
        }
          else if(this.action == 'edit'){
            axios.put(constants.SERVERURL + '/admin/users/' + this.addedOrUpdatedUserID, this.addedOrUpdatedUser, {
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
    }
  }

  private deleteUser(id: number){
    axios.delete(constants.SERVERURL + '/admin/users/' + id, {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          location.reload();
        })
        .catch((error: any) => {
          console.log(error.response)
      });
  }

  private prepareAdd(){
    this.action = 'add';

    //empty the object to clear the fields in the modal
    this.addedOrUpdatedUser = {
      name: '',
      username: '',
      position: '',
      password: '',
      email: '',
      phone_number: '',
      userRole: {
        id: 2,
        name: 'USER'
      }
    };
  }

  private prepareEdit(user: User, id: number){

      // if(user.userRole.name == "ADMIN"){
      //   this.showModal = true;
      //   this.modalText = "You can't edit other administrator's data!";
      // }
      // else{
        this.action = 'edit';
        this.addedOrUpdatedUser = user;
        this.addedOrUpdatedUserID = id;
      // }
  }

}
</script>


<style scoped lang="scss">
.error{
  display: none;
  color: red;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 2px;
}

.top{
  margin-top: 10px;
  margin-bottom: 0;
}

.checkboxes{
  margin-top: 20px;
}

#imgDelete{
  cursor: pointer; 
  // width: 17px;
  // height: 17px;
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

