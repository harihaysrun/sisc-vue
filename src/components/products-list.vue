<template>

    <div>

      <!-- <h1>View All Skincare Products</h1> -->
      <h1>{{pageTitle}}</h1>

      <div v-bind:style="{'display': display}" style="background-color:rgba(0,0,0,0.1); padding: 20px;">
        <h2 style="margin:0;">Search:</h2>
        <input type="text" v-model="search" placeholder="Search by brand or product name">
        <p>{{search}}</p>
      </div>

      <ol>
        <li v-for="p in filteredProducts.slice(0,max)" v-bind:key="p._id">
          <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
            <img style="width:150px; display:block" v-bind:src="p.productImage" />
            <b>{{p.productBrand}}</b> {{p.productName}}
            {{p._id}}
          </a>
        </li>
      </ol>

    </div>
    
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products');
    this.products = response.data.reverse();
    console.log(this.products)
  },
  data: function(){
    return{
      'products': [],
      'search': ''
    }
  },
  props: ['pageTitle', 'max', 'display'],
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    }
  },
  computed:{
    filteredProducts: function(){
      let filtered = this.products.filter((p) =>
        p.productBrand.toLowerCase().includes(this.search.toLowerCase()) ||
        p.productName.toLowerCase().includes(this.search.toLowerCase())
        );
        return filtered;
    }
  }
}
</script>

<style scoped>

</style>
