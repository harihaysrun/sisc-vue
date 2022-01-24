<template>

    <div>

      <button v-if="tab === 'productInfo'" v-on:click="backToProducts">Back</button>
      <button v-if="tab === 'editThisProduct'" v-on:click="backToProduct">Back</button>
      
      <RequestsList page-title="Requests" v-if="tab === 'viewAllProducts'" v-on:view-product="viewProduct"/>
      <RequestInfo v-if="tab === 'productInfo'" v-on:edit-product="editProduct" v-bind:productId="productViewing"/>
      <EditProduct v-if="tab === 'editThisProduct'" v-on:remove-product="removeProduct" v-bind:productId="productEditing"/>

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
  data: function(){
    return{
      'pageType': 'sellGive',
      'products': [],
      'tab': 'viewAllProducts',
      // 'productEditing': productEditing
    }
  },
  methods:{
    backToProducts: function(){
      console.log("viewing all products now")
      this.tab = "viewAllProducts"
      console.log(this.tab)
    },
    backToProduct: function(){
      this.tab = "productInfo"
    },
    // productInfo:function(){
    //   this.tab = "productInfo"
    // },
    // editThisProduct:function(){
    //   this.tab = "editThisProduct"
    // },
    viewProduct:function(productId){
      this.tab = "productInfo";
      // console.log(this.tab)
      this.productViewing = productId;
      console.log(this.productViewing)
    },
    editProduct: function(productId){
      this.tab = "editThisProduct";
      // console.log(this.tab)
      this.productEditing = productId;
      console.log(this.productEditing)
      // console.log("EditThisProduct")
    },
    removeProduct: function(productId){
      this.tab = "viewAllProducts";
      // console.log(this.tab)
      this.productToRemove = productId;
      console.log(this.productToRemove)
    },
    viewProducts: function(){
      this.pageType = "sellGive"
    },
    viewRequests: function(){
      this.pageType = "requests"
    }
  }
}
</script>

<style scoped>

</style>
