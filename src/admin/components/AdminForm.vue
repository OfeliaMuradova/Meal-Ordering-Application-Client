<template>
  <div id="companies" class="container">
     <div class="form-group" id="form">
        <h4>Current {{ componentName }}</h4>
        <table class="table table-striped">
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
            </tr>
          </tbody>
        </table>
    </div>
    
    <!-- <button type="button" class="btn btn-info float-right">Add</button> -->
    <div class="clearfix"></div>

    <form v-if="componentName=='companies'">
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
      </div>
    </form>
    


  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

@Component({})
export default class AdminForm extends Vue{
  @Prop() componentName: string; 
  private rows: any = [
    {
      title: "hello"
    }
  ];

  addRow(){
    debugger;
    var elem = document.createElement('tr');
    this.rows.push({
      title: "",
      
    });
  }

  //removeElement(index: any) {
  //    this.rows.splice(index, 1);
  //}

  //setFilename(event: any, row: any) {
  //  var file = event.target.files[0];
  //  row.file = file
  //}

}


</script>


<style scoped lang="scss">
h4{
  color: #606060;
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
</style>

