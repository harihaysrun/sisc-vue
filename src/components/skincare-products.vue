<template>

    <div>
      
      <ProductsList v-if="tab === 'viewAllProducts'" v-on:edit-product="editProduct"/>
      <EditProduct v-if="tab === 'editThisProduct'" v-bind:productId="productEditing"/>

    </div>
    
</template>

<script>

import ProductsList from '@/components/products-list';
import EditProduct from '@/components/edit-skincare-product';


import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ht1jrsabq.ws-us27.gitpod.io/";

export default {
  components: {
    ProductsList, EditProduct
  },
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products');
    this.products = response.data;
    console.log(this.products)
  },
  data: function(){
    return{
      'products': [],
      'tab': 'viewAllProducts',
      // 'productEditing': productEditing
    }
  },
  methods:{
    viewAllProducts: function(){
      this.tab = "viewAllProducts"
    },
    editThisProduct:function(){
      this.tab = "editThisProduct"
    },
    editProduct: function(productId){
      this.tab = "editThisProduct";
      this.productEditing = productId;
      console.log(this.productEditing)
    }
  }
}
</script>

<style scoped>

</style>
