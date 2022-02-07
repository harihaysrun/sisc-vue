<template>

    <div class="main-container">

      <div class="container">

        <button class="back-btn" v-if="tab === 'productInfo'" v-on:click="backToProducts">
          <svg viewBox="0 0 43.75 15.99">
            <g>
              <polyline class="st0" points="8.07,14.68 1.39,7.99 8.07,1.31 	"/>
              <line class="st0" x1="1.39" y1="7.99" x2="42.37" y2="7.99"/>
            </g>
          </svg>
          Back
        </button>
        <button class="back-btn" v-if="tab === 'editThisProduct'" v-on:click="backToProduct">
          <svg viewBox="0 0 43.75 15.99">
            <g>
              <polyline class="st0" points="8.07,14.68 1.39,7.99 8.07,1.31 	"/>
              <line class="st0" x1="1.39" y1="7.99" x2="42.37" y2="7.99"/>
            </g>
          </svg>
          Back
        </button>

      </div>
        
      <RequestsList page-title="Requests" v-if="tab === 'viewAllProducts'" v-on:view-product="viewProduct"/>      
      <RequestInfo v-if="tab === 'productInfo'" v-on:edit-product="editProduct" v-bind:productId="productViewing"/>
      <EditProduct v-if="tab === 'editThisProduct'" v-on:remove-product="removeProduct" v-bind:productId="productEditing" v-on:back-to="backToProducts"/>

    </div>
    
</template>

<script>

import RequestsList from '@/components/request-list';
import RequestInfo from '@/components/request-info';
import EditProduct from '@/components/request-edit';

export default {
  components: {
    RequestsList, RequestInfo, EditProduct
  },
  mounted: function(){
    document.title = "Requests"
  },
  data: function(){
    return{
      'tab': 'viewAllProducts'
    }
  },
  methods:{
    viewProduct:function(productId){
      this.tab = "productInfo";
      this.productViewing = productId;
      // console.log(this.productViewing)
    },
    editProduct: function(productId){
      this.tab = "editThisProduct";
      this.productEditing = productId;
      // console.log(this.productEditing)
    },
    removeProduct: function(productId){
      this.tab = "viewAllProducts";
      this.productToRemove = productId;
      // console.log(this.productToRemove)
    },
    backToProducts: function(){
      this.tab = "viewAllProducts"
      // console.log(this.tab)
      document.title = "Requests"
    },
    backToProduct: function(){
      this.tab = "productInfo"
    },
  }
}
</script>

<style scoped>

button{
  margin-top:35px;
  margin-bottom:35px;
}

</style>
