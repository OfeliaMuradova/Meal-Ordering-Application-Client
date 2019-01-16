<template>
  <div class="container">
     <div class="form-group" id="form">
        <h4>Current {{ componentName }}</h4>
     </div>

    <div class="clearfix"></div>

  <!-- Companies -->
  <form v-if="componentName=='companies'">

    <div class="scroll">
      <table id="userTable" class="table table-hover table-striped">
        <thead>
          <tr class="d-flex">
            <th scope="col"></th>
            <th scope="col" class="col-3">Name</th>
            <th scope="col" class="col-2">Website</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="(company, index) in list" v-bind:key="index">
            <th scope="row">{{ index + 1 }} </th>
            <td class="col-3">{{ company.name }}</td>
            <td class="col-2">{{ company.webPageUrl }}</td>
            <td class="col-6" align="right">  
                <img id="imgEdit" src="@/assets/edit1.png" @click="editCompany(company.id)" >
                <img id="imgDelete" src="@/assets/delete1.png" @click="deleteCompany(company.id)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addComaniesModal">
      Add company
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addComaniesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New company: </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="companyName">Company name</label>
                  <input type="text" class="form-control" id="companyName" aria-describedby="help" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label for="webUrl">Website URL</label>
                  <input type="text" class="form-control" id="webUrl" placeholder="Enter URL">
                </div>  
              </div>


              <div class="col">
                <label for="companyName">Add menus</label>

                <table class="table">
                  <tbody>
                    <tr v-for="(row, index) in rows" v-bind:key="index">
                      <td><input type="text" class="form-control" v-model="row.title"></td>
                      <td>
                        <label class="fileContainer">
                          <input type="file" v-bind:id="index">
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                    <button class="btn btn-info" v-on:click="addRow()">Add image</button>
                </div>
              </div> 
            </div> <!-- row -->
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-info">Add</button>
          </div>
        </div>
      </div>
    </div>


  </form>

  <!-- users -->
    <form v-if="componentName=='users'">

        <div class="scroll">
          <table id="userTable" class="table table-hover table-striped">
            <thead>
              <tr class="d-flex">
                <th scope="col"></th>
                <th scope="col" class="col-3">Name</th>
                <th scope="col" class="col-2">Username</th>
                <th scope="col" class="col-2">Position</th>
                <th scope="col" class="col-2">Email</th>
                <th scope="col" class="col-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr class="d-flex" v-for="(user, index) in list" v-bind:key="index">
                <th scope="row">{{ index + 1 }} </th>
                <td class="col-3">{{ user.name }}</td>
                <td class="col-2">{{ user.username }}</td>
                <td class="col-2">{{ user.position }}</td>
                <td class="col-2">{{ user.email }}</td>
                <td class="col-2">{{ user.phone }}</td>
              </tr>
            </tbody>
          </table>
        </div>


      <b-btn class="btn btn-info float-right" v-b-modal.addUserModal>Add user</b-btn>

      <b-modal id="addUserModal" v-show="showUserModal" centered hide-footer title="Add new user:">
        <div class="row">
          <div class="col">
            <input type="text" class="form-control user-data" id="" placeholder="Name, Surname">
            <input type="text" class="form-control user-data" id="" placeholder="Username">
            <input type="text" class="form-control user-data" id="" placeholder="Password">
          </div>
          <div class="col">
            <input type="text" class="form-control user-data" id="" placeholder="Position">
            <input type="text" class="form-control user-data" id="" placeholder="E-mail">
            <input type="text" class="form-control user-data" id="" placeholder="Phone number">
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
          <label class="form-check-label" for="exampleRadios1">
           User
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
          <label class="form-check-label" for="exampleRadios2">
            Admin
          </label>
        </div>
      </b-modal>

    </form>

    
  <!-- menus -->
    <form v-if="componentName=='menus'">

        <div class="scroll">
          <table id="menuTable" class="table table-hover table-striped">
            <thead>
              <tr class="d-flex">
                <th scope="col"></th>
                <th scope="col" class="col-3">Image</th>
              </tr>
            </thead>
            <tbody>
              <tr class="d-flex" v-for="(company, index) in list" v-bind:key="index">
                <th scope="row">{{ index + 1 }} </th>
                <td class="col-3">{{ company.url }}</td>
              </tr>
            </tbody>
          </table>
        </div>


      <b-btn class="btn btn-info float-right" v-b-modal.addMenuModal>Add menu</b-btn>

      <b-modal id="addMenuModal" 
             title="Add new menu:"
             centered 
             @ok="addMenu" >
        <div class="row">
          <div class="col">
            <input type="text" class="form-control user-data" id="" placeholder="Name, Surname">
            <input type="text" class="form-control user-data" id="" placeholder="Username">
            <input type="text" class="form-control user-data" id="" placeholder="Password">
          </div>
          <div class="col">
            <input type="text" class="form-control user-data" id="" placeholder="Position">
            <input type="text" class="form-control user-data" id="" placeholder="E-mail">
            <input type="text" class="form-control user-data" id="" placeholder="Phone number">
          </div>
        </div>

      </b-modal>

    </form>
         
 
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';
import * as constants from '@/constants.ts';
import axios from 'axios';

@Component({})
export default class AdminForm extends Vue{
  @Prop() componentName: string; 
  @Prop() list: any;
  private showUserModal: boolean = false;


  private editCompany(id: number){

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


  private rows: any = [
    {
      title: "hello"
    }
  ];

  private addMenu(){
    alert('added menu');
  };

  addRow(){
    debugger;
    var elem = document.createElement('tr');
    this.rows.push({
      title: "",
      
    });
  }

}

</script>


<style scoped lang="scss">
h4{
  color: #606060;
}

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
