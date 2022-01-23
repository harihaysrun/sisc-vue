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


// import axios from 'axios';
// const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ht1jrsabq.ws-us27.gitpod.io/";

export default {
  components: {
    ProductsList, ProductInfo, EditProduct
  },
  // created: async function(){
  //   let response = await axios.get(BASE_API_URL + 'skincare-products');
  //   this.products = response.data;
  //   console.log(this.products)
  // },
  data: function(){
    return{
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
    }
  }
}
</script>

<style scoped>

</style>
