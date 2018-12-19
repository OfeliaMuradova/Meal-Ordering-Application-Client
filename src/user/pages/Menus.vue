<template>
  <div class="menus">
    <div class="container">

      <div class="accordion md-accordion" id="accordionEx1" role="tablist" aria-multiselectable="true">
        <div class="card">
          <div class="card-header" role="tab" id="headingTwo1">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo1"
              aria-expanded="false" aria-controls="collapseTwo1">
              <h5 class="mb-0">
                Quartal 1 <i class="fa fa-angle-down rotate-icon"></i>
              </h5>
            </a>
          </div>
          <div id="collapseTwo1" class="collapse" role="tabpanel" aria-labelledby="headingTwo1" data-parent="#accordionEx1">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" role="tab" id="headingTwo2">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo21"
              aria-expanded="false" aria-controls="collapseTwo21">
              <h5 class="mb-0">
                Quartal 2 <i class="fa fa-angle-down rotate-icon"></i>
              </h5>
            </a>
          </div>
          <div id="collapseTwo21" class="collapse" role="tabpanel" aria-labelledby="headingTwo21" data-parent="#accordionEx1">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" role="tab" id="headingThree31">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseThree31"
              aria-expanded="false" aria-controls="collapseThree31">
              <h5 class="mb-0">
                Quartal 3 <i class="fa fa-angle-down rotate-icon"></i>
              </h5>
            </a>
          </div>
          <div id="collapseThree31" class="collapse" role="tabpanel" aria-labelledby="headingThree31" data-parent="#accordionEx1">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header" role="tab" id="headingFour41">
            <a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseFour41"
              aria-expanded="false" aria-controls="collapseFour41">
              <h5 class="mb-0">
                Quartal 4 
                <i class="fa fa-angle-down fa-rotate-90"></i>
              </h5>
            </a>
          </div>
          <div id="collapseFour41" class="collapse" role="tabpanel" aria-labelledby="headingFour41" data-parent="#accordionEx1">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Menus extends Vue{


}
</script>


<style lang="scss" scoped>
#accordionEx1{
  margin-top: 20px;
}

.card a:hover{
  text-decoration: none;
}
</style>


