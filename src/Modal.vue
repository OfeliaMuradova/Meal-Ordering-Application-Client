<template>
  <div class="container">
    <!-- <div v-if="showModal"> -->
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">

          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">{{ modalTitle }}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="modal-body">
                      <p>{{ modalText }}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="reload()">Close</button>
                  </div>
              </div>
          </div>

          </div>
        </div>
      </transition>
    <!-- </div> -->

    <!-- <button @click="showModal = true">Click</button> -->
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { User } from '@/types.ts';
import * as constants from "@/constants.ts";
import axios from 'axios';

@Component({})
export default class Modal extends Vue{
  @Prop() modalText: string;
  @Prop() modalTitle: string;

  private reload(){
    constants.reload();
  }
}
</script>


<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>

