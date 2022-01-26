<template>

    <div>

      <!-- <h1>View All Skincare Products</h1> -->
      <h1>{{pageTitle}}</h1>

      <div v-bind:style="{'display': display}" style="background-color:rgba(0,0,0,0.1); padding: 20px;">
        <h2 style="margin:0;">Search:</h2>

        <input type="text" v-model="search" placeholder="Search by brand or product name">

        <div>
          <label>Product condition</label>
          <input type="radio" value="New" v-model="product_condition" /> Brand New
          <input type="radio" value="Used" v-model="product_condition" /> Used
        </div>

        <div>
          <label>Product Category</label>
          <select name="" id="" v-model="product_category">
            <option value="" disabled>select one</option>
            <option value="First Cleanser">First Cleanser</option>
            <option value="Second Cleanser">Second Cleanser</option>
            <option value="Toner">Toner</option>
            <option value="Serum">Serum</option>
            <option value="Essence">Essence</option>
            <option value="Ampoule">Ampoule</option>
            <option value="Treatment">Treatment</option>
            <option value="Moisturiser">Moisturiser</option>
            <option value="Treatment">Treatment</option>
            <option value="Sheet Mask">Sheet Mask</option>
            <option value="Clay Mask">Clay Mask</option>
            <option value="Chemical Exfoliant">Chemical Exfoliant</option>
            <option value="Physical Exfoliant">Physical Exfoliant</option>
            <option value="Eye Cream">Eye Cream</option>
            <option value="Body">Body</option>
            <option value="Others">Others</option>
          </select>

        </div>

        <p>
          {{search}}
          {{product_condition}}
          {{product_category}}
          <br>
        </p>
      </div>

      <ol>
        <li v-for="p in filteredProducts.slice(0,max)" v-bind:key="p._id">
          <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
            <img style="width:150px; display:block" v-bind:src="p.productImage" />
            {{p.productBrand}}
            <br>
            {{p.productName}}
            <br>
            {{p.productCondition}}
            <br>
            {{p.productCategory}} {{p.productCategoryOthers}}
            <!-- <br>
            {{p._id}} -->
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
      'search': '',
      'product_condition': '',
      'product_category': '',
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
        // p.productBrand.toLowerCase().includes(this.search.toLowerCase()) ||
        // p.productName.toLowerCase().includes(this.search.toLowerCase()) ||
        p.productCondition === this.product_condition ||
        p.productCategory === this.product_category
      );
      return filtered;
    }
  }
}
</script>

<style scoped>

</style>
