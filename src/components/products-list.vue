<template>

    <div>
        
      <h1>View All Skincare Products</h1>
      <!-- <button><a href="/skincare-products/add">Add new product</a></button> -->

      <ol>
        <li v-for="p in products" v-bind:key="p._id">
          <a v-on:click="viewThisProduct(p._id)">
            <b>{{p.productBrand}}</b> {{p.productName}}
            {{p._id}}
            <!-- <button v-on:click="edit(p._id)">Edit</button> -->
            <!-- <a v-on:click="edit(p._id)">Edit</a> -->
          </a>
        </li>
      </ol>

    </div>
    
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ltz4b52lr.ws-us27.gitpod.io/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products');
    this.products = response.data;
    console.log(this.products)
  },
  data: function(){
    return{
      'products': []
    }
  },
  // props: ['page'],
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    }
    // 'edit': function(productId){
    //   this.$emit('edit-product', productId)
    // }
  }
}
</script>

<style scoped>

</style>
