<template>

    <div>
        
      <h1>Add new skincare product</h1>
      
      <div>
        <label>Brand</label>
        <input type="text" v-model="product_brand" />
      </div>
      
      <div>
        <label>Product Name</label>
        <input type="text" v-model="product_name" />
      </div>
      
      <div>
        <label>Product Image</label>
        <input type="text" v-model="product_image" />
        <div id="previewPic">
          <img v-bind:src="product_image">
        </div>
      </div>

      <div>
        <label>Product Size</label>
        <select name="" id="" v-model="product_size">
          <option value="" disabled>select one</option>
          <option value="Sample">Sample</option>
          <option value="Mini">Mini</option>
          <option value="Full">Full</option>
        </select>

        <input type="text" v-model="product_size_ml" />
      </div>

      <div>
        <label>Product Description</label>
        <textarea name="" id="" cols="30" rows="10" v-model="product_description"></textarea>
      </div>

      <!-- <div>
        <label>Gender:</label>
        <input type="radio" value="male" v-model="gender" /> Male
        <input type="radio" value="female" v-model="gender" /> Female
      </div> -->

      <div>
        <label>Suitable for skin type</label>
        <input type="checkbox" value="Dry" v-model="skin_type" /> Dry
        <input type="checkbox" value="Combination" v-model="skin_type" /> Combination
        <input type="checkbox" value="Oily" v-model="skin_type" /> Oily
      </div>

      <button v-on:click="addProduct">Add</button>
      
      <div>
        <ul>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
          <li>Description: {{product_description}}</li>
          <li>Skin type: {{skin_type}}</li>
        </ul>
      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-fj1wbad540x.ws-us27.gitpod.io/";

export default {
  data: function(){
    return{
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_size': [],
      'product_size_ml': '',
      'product_description': '',
      'skin_type': []
    }
  },
  methods:{
    'addProduct': async function(){
      await axios.post(BASE_API_URL + 'skincare-products',{
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productType': this.product_size,
        'productSize': this.product_size_ml,
        'productDescription': this.product_description,
        'skinType': this.skin_type
      })
    }
  }
}
</script>

<style scoped>

</style>
