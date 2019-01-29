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
            <th scope="col" class="col-1"></th>
            <th scope="col" class="col-3">Name</th>
            <th scope="col" class="col-8">Website</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="(company, index) in list" v-bind:key="index">
            <th scope="row" class="col-1">{{ index + 1 }} </th>
            <td class="col-3 scrollable">{{ company.name }}</td>
            <td class="col-7 scrollable"><a :href="company.webPageUrl" target="_blank">{{ company.webPageUrl }}</a></td>
            <td class="col-1" align="right">  
              <img id="imgEdit" src="@/assets/edit1.png" data-toggle="modal" data-target="#addCompaniesModal" @click="prepareEdit(company, company.id)">
              <img id="imgDelete" src="@/assets/delete1.png" @click="deleteCompany(company.id)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addCompaniesModal" @click="prepareAdd()">
      Add company
    </button>

    <!-- Company Add/Edit Modal -->
    <div class="modal fade" id="addCompaniesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="action == 'add'" class="modal-title" id="exampleModalLabel">New company: </h5>
            <h5 v-else-if="action == 'edit'" class="modal-title" id="exampleModalLabel">Edit company: </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label for="companyName">Company name</label>
                  <input type="text" class="form-control" ref="inputCompanyName" id="companyName" aria-describedby="help" placeholder="Enter name" v-model="addedOrUpdatedCompany.name">
                  <label class="error" ref="errorCompanyName">* This field is required</label>
                </div>
                <div class="form-group">
                  <label for="webUrl">Website URL</label>
                  <input type="text" class="form-control" id="webUrl" ref="inputWebsite" placeholder="Enter URL" v-model="addedOrUpdatedCompany.webPageUrl">
                  <label class="error" ref="errorEmptyWebsite">* This field is required</label>
                  <label class="error" ref="errorURL">Please, enter a valid URL</label>
                </div>  
              </div>

              <div class="col">
                <label for="companyName">Menus</label>

                
              </div> <!-- col -->
            </div> <!-- row -->
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="constants.reload()">Cancel</button>
            <button v-if="action == 'add'" type="button" class="btn btn-info" @click="addOrUpdateCompany">Add</button>
            <button v-else-if="action == 'edit'" type="button" class="btn btn-info" @click="addOrUpdateCompany">Submit</button>
          </div>
        </div>
      </div>
    </div>


  </form>

  <!-- users -->
    <form v-if="componentName=='users'">
      <users :list=list></users>
    </form>

  <!-- menus -->
    <form v-if="componentName=='menus'">
      <menus :list=list></menus>
    </form>
         
  <!-- orders -->
    <form v-if="componentName=='orders'">
      <orders :list=list></orders>
    </form>
         
 
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Prop, Component, Watch } from 'vue-property-decorator';
import * as constants from '@/constants.ts';
import axios from 'axios';
import { Company, Menu } from '@/types';
import Users from '@/admin/components/Users.vue';
import Menus from '@/admin/components/Menus.vue';
import Orders from '@/admin/components/Orders.vue';

@Component({
  components: {
    'users': Users,
    'menus': Menus,
    'orders': Orders
  },
})
export default class AdminForm extends Vue{
  @Prop() componentName: string; 
  @Prop() list: any;

  private action: string = '';
  private addedOrUpdatedCompanyID: number = -1;

  private menus: Array<Menu> = [
    { path: 'http://lkdlferferlfhliwehrfef',
      weekNum: 30,
      company: {
        name: 'Merkel Menu',
        webPageUrl: 'http://mrkel',
        menus: []
      } 
     }
  ];

  private addedOrUpdatedCompany: Company = {
    name: '',
    webPageUrl: '',
    menus: this.menus
  };

  private addOrUpdateCompany(){
    if(this.action == 'edit' || this.action == 'add'){
      if(constants.validatorEmpty(<Element>this.$refs.inputCompanyName, <Element>this.$refs.errorCompanyName)
        && constants.validatorEmpty(<Element>this.$refs.inputWebsite, <Element>this.$refs.errorEmptyWebsite)
        && constants.validatorURL(<Element>this.$refs.inputWebsite, <Element>this.$refs.errorURL)){

          if(this.action == 'add'){
              axios.post(constants.SERVERURL + '/admin/companies/', this.addedOrUpdatedCompany, {
                headers: constants.DEFAULT_HEADERS
                }).then( (response: any) => {
                  location.reload();
                })
                .catch((error: any) => {
                  console.log(error.response)
              });           
          }
          else if(this.action == 'edit'){
            axios.put(constants.SERVERURL + '/admin/companies/' + this.addedOrUpdatedCompanyID, this.addedOrUpdatedCompany, {
                headers: constants.DEFAULT_HEADERS
                }).then( (response: any) => {
                    console.log('edited');

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

  private deleteCompany(id: number){
    axios.delete(constants.SERVERURL + '/admin/companies/' + id, {
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
    this.addedOrUpdatedCompany = {
      name: '',
      webPageUrl: '',
      menus: this.menus
    };
  }

  private prepareEdit(company: Company, id: number){
    this.action = 'edit';
    this.addedOrUpdatedCompany = company;
    this.addedOrUpdatedCompanyID = id;
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

h4{
  color: #606060;
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
