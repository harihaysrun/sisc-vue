<template>

    <div>
        
      <h1>View All Skincare Products</h1>
      <button><a href="/skincare-products/add">Add new product</a></button>

      <ol>
        <li v-for="p in products" v-bind:key="p._id">
          <b>{{p.productBrand}}</b> {{p.productName}}
        </li>
      </ol>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-fj1wbad540x.ws-us27.gitpod.io/";

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
  }
}
</script>

<style scoped>

</style>
