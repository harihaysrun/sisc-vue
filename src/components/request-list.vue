<template>

    <div>
        
      <h1>Requests</h1>

      <ol>
        <li v-for="p in products" v-bind:key="p._id">
          <a v-on:click="viewThisProduct(p._id)">
            <b>{{p.productBrand}}</b> {{p.productName}}
            {{p._id}}
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
    let response = await axios.get(BASE_API_URL + 'requested-products');
    this.products = response.data;
    console.log(this.products)
  },
  data: function(){
    return{
      'products': [],
    }
  },
  // props: ['page'],
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    }
  }
}
</script>

<style scoped>

</style>
