<template>
  <div >
    <div>
      <img alt="Nehmen Sie Kontakt zur community4you AG auf: Nutzen Sie unsere Online-Anfrage, kontaktieren Sie uns per Telefon, Skype oder E-Mail. Wir freuen uns auf Sie!" 
          title="Nehmen Sie Kontakt zur community4you AG auf!" 
          src="@/assets/contact.png" width="100%">
    </div>
	  <div >
      <div class="content-item">
            <table border="0">
              <tbody>
                <tr>
                  <td><strong>Telefon:</strong></td>
                  <td>+49 371 909411-0</td>
                </tr>
                <tr>
                  <td><strong>Fax:</strong></td>
                  <td>+49 371 909 411-111</td>
                </tr>
                <tr>
                  <td><strong>E-Mail:</strong></td>
                  <td>
                    <a href="mailto:info@community4you.de" target="_blank" rel="noopener">info@community4you.de</a></td>
                </tr>
                <tr>
                  <td><strong>Postanschrift:</strong></td>
                  <td>Hauptsitz: Händelstr. 9 09120 Chemnitz&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>Niederlassung: Katharinenstraße 1-3 04109 Leipzig</td>
                </tr>
              </tbody>
            </table>
      </div>
    </div>


    <footer class="bg-light" id="page-footer">
      Copyright 2019 &copy; All rights reserved
    </footer>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { User } from '@/types.ts';
import * as constants from "@/constants.ts";
import axios from 'axios';

@Component({})
export default class Contact extends Vue{
  
}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 50px;
}

.text-center{
  margin-bottom: 30px;
}

h2{
  color: #666666;
}

td {
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  color: #666666;
  padding: 10px;
}

  #page-footer{
    color: rgba(0, 0, 0, 0.5);
    height: 100px;
    line-height: 100px;
    vertical-align: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    align-items: center;
  }

  .content-item{
    margin: 40px;

    table{
      margin: 0 auto;
    }
  }


</style>

