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

        <div>
          <label>Product Size</label>
          <select name="" id="" v-model="product_size">
            <option value="" disabled>select one</option>
            <option value="Sample">Sample</option>
            <option value="Mini">Mini</option>
            <option value="Full">Full</option>
          </select>
        </div>

        <div>
          <label>Price</label>
          <select name="" id="" v-model="product_price">
            <option value="" disabled>select one</option>
            <option value="Free">Free</option>
            <option value="Specify">Others</option>
          </select>
        </div>

        <div>
          <label>Skin type</label>
          <input type="radio" value="Dry" v-model="skin_type" /> Dry
          <input type="radio" value="Combination" v-model="skin_type" /> Combination
          <input type="radio" value="Oily" v-model="skin_type" /> Oily
        </div>

        <div>
          <!-- <label for="">Vegan?</label> -->
          <input type="checkbox" value="Yes" v-model="product_vegan" /> Vegan
        </div>

        <div>
          <input type="checkbox" value="Yes" v-model="product_cf" /> Cruelty free
        </div>
          

        <p>
          <!-- {{search}} -->
          {{product_condition}}
          {{product_category}}
          {{product_vegan}}
          {{product_cf}}
          <br>
        </p>

        <a v-on:click="searchFilter">Search</a>
        <br>

        <a v-on:click="clearSearch">Reset Search Filters</a>
      </div>

      <ol>
        <li v-for="p in products.slice(0,max)" v-bind:key="p._id">
          <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
            <img style="width:150px; display:block" v-bind:src="p.productImage" />
            {{p.productBrand}}
            <br>
            {{p.productName}}
            <br>
            {{p.productCondition}}
            <br>
            {{p.productCategory}} {{p.productCategoryOthers}}
            <br>
            {{p.productType}}
            <br>
            {{p.productPrice}}
            <br>
            {{p.skinType}}
            <br>
            vegan: {{p.productVegan}}
            <br>
            CF: {{p.productCrueltyFree}}
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
      'product_size': '',
      'product_price': '',
      'skin_type': [],
      'product_vegan': '',
      'product_cf': '',
    }
  },
  props: ['pageTitle', 'max', 'display'],
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    },
    // searchFilter: async function(){
      
    //   let response = await axios.get(BASE_API_URL + 'skincare-products/');
    //   let products = response.data;
    //   this.products = [];

    //   for(let i=0; i<products.length; i++){

    //     if (this.search && products[i].productBrand.toLowerCase().includes(this.search.toLowerCase())){
    //       // console.log (products[i])
    //       this.products.push(products[i]);
    //     }

    //     else if (this.product_condition && this.product_condition === products[i].productCondition){
    //       this.products.push(products[i]);
    //     }

    //     else if (this.product_category && this.product_category === products[i].productCategory){
    //       this.products.push(products[i]);
    //     }

    //     else if (this.product_size && this.product_size === products[i].productType){
    //       this.products.push(products[i]);
    //     }

    //     else if (this.product_price && this.product_price === products[i].productPrice){
    //       this.products.push(products[i]);
    //     }

    //     else if (this.skin_type && products[i].skinType.toString().includes(this.skin_type)){
    //       // console.log(products[i].skinType.toString())
    //       this.products.push(products[i])
    //     }

    //     // else if (this.product_vegan && this.product_vegan.toString() === products[i].productVegan){
    //     //   this.products.push(products[i])
    //     // }
    //       // console.log(this.product_vegan + products[i].productVegan)

    //     else if (this.product_vegan && products[i].productVegan === "Yes"){
    //       console.log("clicked on vegan");
    //       this.products.push(products[i])
    //     }

    //     else if (this.product_cf && products[i].productCrueltyFree === "Yes"){
    //       this.products.push(products[i])
    //     }


    //     // else if (this.skin_type){
    //     //   if (Array.isArray(products[i].skinType) && products[i].skinType.includes(this.skin_type)){
    //     //     this.products.push(products[i])
    //     //   }
    //     //   // if (!Array.isArray(products[i].skinType) && products[i].skinType.includes(this.skin_type)){
    //     //   //   this.products.push(products[i])
    //     //   // }
    //     // }

    //     // console.log(!Array.isArray(products[i].skinType))
    //     // console.log(Array.isArray(products[i].skinType))

    //     this.products.reverse()

    //   }

    // },
    searchFilter: async function(){
      
      let response = await axios.get(BASE_API_URL + 'search');
      let search = response.data;
      this.products = response.data.reverse();
      console.log(search);
    },
    clearSearch: async function(){
      let response = await axios.get(BASE_API_URL + 'skincare-products');
      this.search = "";
      this.product_condition = "";
      this.product_category = "";
      this.product_size = "";
      this.skin_type = [];
      this.product_vegan = [];
      this.product_cf = [];
      this.products = response.data.reverse();
    }
  },
  // computed:{
  //   filteredProducts: function(){
  //     let filtered = this.products.filter((p) =>
  //       p.productBrand.toLowerCase().includes(this.search.toLowerCase()) ||
  //       p.productName.toLowerCase().includes(this.search.toLowerCase()) ||
  //       p.productCondition === this.product_condition ||
  //       p.productCategory === this.product_category
  //     );
  //     return filtered;
  //   }
  // }
}
</script>

<style scoped>

</style>
