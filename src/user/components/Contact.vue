<template>
  <div class="container">
    <div class="text-center">
      <h2>Contact</h2>
    </div>
	  <div class="row">
      <div class="col col-md-5">
        <div class="content-item">
          <div class="img-box">
            <img alt="Nehmen Sie Kontakt zur community4you AG auf: Nutzen Sie unsere Online-Anfrage, kontaktieren Sie uns per Telefon, Skype oder E-Mail. Wir freuen uns auf Sie!" title="Nehmen Sie Kontakt zur community4you AG auf!" src="https://www.community4you.de/de/media/unternehmen/kontakt/image/image/0-kontakt.jpg" width="180">
          </div>
        </div>
      </div>
      <div class="content-item col col-md-7">
          <div class="rechts">
            <!-- <p>Nutzen Sie unsere <a title="Online-Anfrage" href="https://www.community4you.de/de/media/unternehmen/kontakt/image/image/0-kontakt.jpg">Online-Anfrage</a>&nbsp;oder kontaktieren Sie uns per <strong>Telefon&nbsp;</strong>oder&nbsp;<strong>E-Mail</strong>. Wir freuen uns auf Ihre Fragen!</p> -->
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
    </div>
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

.img-box{
  text-align: right;
  padding-right: 20px;
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


</style>

