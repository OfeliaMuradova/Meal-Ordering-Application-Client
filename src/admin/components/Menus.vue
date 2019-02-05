<template>
  <div id="users" class="container-fluid">

    <div class="scroll">
      <table id="userTable" class="table table-hover table-striped">
        <thead>
          <tr class="d-flex">
            <th scope="col" class="col-1"></th>
            <th scope="col" class="col-4">Image</th>
            <th scope="col" class="col-3">Week number</th>
            <th scope="col" class="col-4">Owner company</th>
          </tr>
        </thead>
        <tbody>
          <tr class="d-flex" v-for="(menu, index) in list" v-bind:key="index">
            <th scope="row" class="col-1">{{ index + 1 }} </th>
            <td class="col-4 scrollable"><a :href="menu.path" target="_blank">{{ menu.path }}</a></td>
            <td class="col-3 scrollable"> {{ getWeekNumber(menu.validFrom) }} </td>
            <td v-if="menu.company" class="col-3 scrollable">{{ menu.company.name }}</td>
            <td class="col-1" align="right">  
              <img id="imgEdit" src="@/assets/edit1.png" data-toggle="modal" data-target="#addMenusModal" @click="prepareEdit(menu, menu.id)">
              <img id="imgDelete" src="@/assets/delete.png" @click="deleteMenu(menu.id)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info float-right" data-toggle="modal" data-target="#addMenusModal" @click="prepareAdd()">
      Add menu
    </button>

    <!-- Modal -->
    <div class="modal fade" id="addMenusModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="action == 'add'" class="modal-title" id="exampleModalLabel">New menu: </h5>
            <h5 v-else-if="action == 'edit'" class="modal-title" id="exampleModalLabel">Edit menu: </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
            <div class="row">
              <div class="col">
                <label for="inputMenuImagePath">Image Path</label>
                <input id="inputMenuImagePath" ref="inputMenuImagePath" type="text" class="form-control user-data" v-model="addedOrUpdatedMenu.path" autofocus>
                <label class="error" ref="errorEmptyPath">* This field is required</label>
                <label class="error" ref="errorWrongURL">Please enter a valid url</label>
                <label for="inputMenuWeekNumber">Week number:</label>
                <input id="inputMenuWeekNumber" ref="inputMenuWeekNumber" type="text" class="form-control user-data" v-model="addedOrUpdatedMenu.weekNum">
                <label class="error" ref="errorEmptyWeekNumber">* This field is required</label>
                <label class="error" ref="errorWeekNumber">Please enter a valid number</label>

                <label for="companySelect">Company:</label>
                <select id="companySelect" required class="mb-3" v-model="companyId">
                  <option v-for="(company, index) in companiesList" :key="index" :value="company.id">{{ company.name }}</option>
                </select>
                <label class="error" ref="errorEmptyCompany">Please choose a company</label>

              </div>
            </div><!-- row -->
          </div> <!-- modal-body -->

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="constants.reload()">Cancel</button>
            <button v-if="action == 'add'" type="button" class="btn btn-info" @click="addOrUpdateMenu">Add</button>
            <button v-else-if="action == 'edit'" type="button" class="btn btn-info" @click="addOrUpdateMenu">Submit</button>
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
import { Menu, Company } from '@/types';

@Component({})
export default class Menus extends Vue{
  @Prop() list: any;

  private action: string = '';
  private addedOrUpdatedMenuID: number = -1;
  private companyId: number = null;
  private companiesList: Array<Company> = [];
  private currentCompanies: any[] = [ ]
  private addedOrUpdatedMenu: Menu = {
    path: '',
    weekNum: null,
    company: {
      name: '',
      webPageUrl: '',
      menus: []
    }
  };

  private getWeekNumber(from: any){
    return constants.getWeekNumber(from);
  }

  private addOrUpdateMenu(){
    if(constants.validatorEmpty(<Element>this.$refs.inputMenuImagePath, <Element>this.$refs.errorEmptyPath)
        && constants.validatorURL(<Element>this.$refs.inputMenuImagePath, <Element>this.$refs.errorWrongURL)
        && constants.validatorEmpty(<Element>this.$refs.inputMenuWeekNumber, <Element>this.$refs.errorEmptyWeekNumber)
        && constants.validatorNumber(<Element>this.$refs.inputMenuWeekNumber, <Element>this.$refs.errorWeekNumber)){
          debugger;
        if(!this.companyId){
          (<any>this.$refs.errorEmptyCompany).style.display = 'block';
        }
        else if(this.action == 'add'){
          
          //get selected company object by id
          axios.get(constants.SERVERURL + '/admin/companies/' + this.companyId + '/edit', {
              headers: constants.DEFAULT_HEADERS
              }).then( (response: any) => {
                //set the company to the menu object
                this.addedOrUpdatedMenu.company = response.data;
                
                //add the menu
                axios.post(constants.SERVERURL + '/admin/menus/', this.addedOrUpdatedMenu, {
                  headers: constants.DEFAULT_HEADERS
                  }).then( (response: any) => {
                    location.reload();
                  })
                  .catch((error: any) => {
                    console.log(error.response)
                }); 

              })
              .catch((error: any) => {
                console.log(error.response)
            });  
          
          }
          else if(this.action == 'edit'){
            axios.put(constants.SERVERURL + '/admin/menus/' + this.addedOrUpdatedMenuID, this.addedOrUpdatedMenu, {
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

  private deleteMenu(id: number){
    debugger;
    axios.delete(constants.SERVERURL + '/admin/menus/' + id, {
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
    this.action = 'add';

    //empty the object to clear the fields in the modal
    this.addedOrUpdatedMenu = {
      path: '',
      weekNum: null,
      company: {
        name: '',
        webPageUrl: '',
        menus: []
      }
    };
    // list the companies
    axios.get(constants.SERVERURL + '/admin/companies/list', {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          this.companiesList = response.data;
          
          this.companiesList.forEach((c, i) => {
            this.currentCompanies.values;
          });

        })
        .catch((error: any) => {
          console.log(error.response)
    });
      
  }

  private prepareEdit(menu: Menu, id: number){
    debugger;
    this.action = 'edit';
    this.addedOrUpdatedMenu = menu;
    this.addedOrUpdatedMenuID = id;

    axios.get(constants.SERVERURL + '/admin/companies/list', {
        headers: constants.DEFAULT_HEADERS
        }).then( (response: any) => {
          this.companiesList = response.data;

          this.companiesList.forEach((c, i) => {
            this.currentCompanies.values
          });

        })
        .catch((error: any) => {
          console.log(error.response)
    });
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

label{
  margin-top: 15px;
  margin-bottom: 3px;
  color: #46484a;
}

//table
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

#dropdownMenuButton{
  display: block;
  width: 100%;
  // color: #6c7985;
  // background-color: rgb(190, 190, 190);
  background-clip: padding-box;
  // border: 1px solid #ced4da;
  // border-radius: 0.25rem;
  text-align: left;
}

.dropdown-toggle::after {
  float: right;
  margin-top: 0.5em;
}

select{
  background-color: #fff;
  border-radius: 0.255em;
  border-color: #d2d2d2;
  height: 38px;
  width: 100%;
  padding: 7px;
  margin-bottom: 0!important;
  appearance: none;
  -webkit-appearance: none; 
  -moz-appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px,1px 1.5em;
  background-repeat: no-repeat;
}

.form-control{
  color: black;
}

</style>

