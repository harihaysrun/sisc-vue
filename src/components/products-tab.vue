<template>

    <div>

      <button v-if="tab === 'productInfo'" v-on:click="backToProducts">Back</button>
      <button v-if="tab === 'editThisProduct'" v-on:click="backToProduct">Back</button>
      
      <ProductsList v-if="tab === 'viewAllProducts'" v-on:view-product="viewProduct"/>
      <ProductInfo v-if="tab === 'productInfo'" v-on:edit-product="editProduct" v-bind:productId="productViewing"/>
      <EditProduct v-if="tab === 'editThisProduct'" v-on:remove-product="removeProduct" v-bind:productId="productEditing"/>

    </div>
    
</template>

<script>

import ProductsList from '@/components/products-list';
import ProductInfo from '@/components/product-info';
import EditProduct from '@/components/edit-skincare-product';

export default {
  components: {
    ProductsList, ProductInfo, EditProduct
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
      this.productEditing = productId;
      console.log(this.productEditing)
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
