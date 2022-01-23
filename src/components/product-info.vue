<template>

    <div>

      <!-- <button v-on:click="backToProducts">Back</button> -->
        
      <h1>{{product_brand}} {{product_name}}</h1>
      <small>{{productId}}</small>
      
      <div>
        <ul>
          <li>Listing type: {{listing_type}}</li>
          <li>Product condition: {{product_condition}}</li>
          <li>Brand: {{product_brand}}</li>
          <li>Name of product: {{product_name}}</li>
          <li>Product image link: {{product_image}}</li>
          <li>Product quantity: {{product_quantity}}</li>
          <li>Product quantity (others): {{product_quantity_box}}</li>
          <li>Size: {{product_size}}</li>
          <li>Size in ml: {{product_size_ml}}</li>
          <li>Product price: {{product_price}}</li>
          <li>Product price in dollars: {{product_price_box}}</li>
          <li>Description: {{product_description}}</li>
          <li>Skin type: {{skin_type}}</li>
          <li>Skin concerns: {{skin_concerns}}</li>
          <li>Vegan?: {{product_vegan}}</li>
          <li>Cruelty free?: {{product_cf}}</li>
        </ul>
      </div>

      <button v-on:click="edit(productId)">Edit Product</button>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ht1jrsabq.ws-us27.gitpod.io/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'skincare-products/' + this.productId);
    this.listing_type = response.data.listingType;
    this.product_condition = response.data.productCondition;
    this.product_brand = response.data.productBrand;
    this.product_name = response.data.productName;
    this.product_image = response.data.productImage;
    this.product_quantity = response.data.productQuantity;
    this.product_quantity_box = response.data.productQuantityBox;
    this.product_size = response.data.productType;
    this.product_size_ml = response.data.productSize;
    this.product_price = response.data.productPrice;
    this.product_price_box = response.data.productPriceDollars;
    this.product_description = response.data.productDescription;
    this.skin_type = response.data.skinType;
    this.skin_concerns = response.data.skinConcerns;
    this.product_vegan = response.data.productVegan;
    this.product_cf = response.data.productCrueltyFree;
    // this.id = response.data_id;
    // console.log(this.productId)

    console.log(response.data)

  },
  props: ['productId'],
  data: function(){
    return{
      'listing_type': '',
      'product_condition': '',
      'product_brand': '',
      'product_name': '',
      'product_image': '',
      'product_quantity': '',
      'product_quantity_box': '',
      'product_size': '',
      'product_size_ml': '',
      'product_price': '',
      'product_price_box': '',
      'product_description': '',
      'skin_type': [],
      'skin_concerns': [],
      'product_vegan': '',
      'product_cf': '',
      'id': ''
    }
  },
  methods:{
    'edit': function(productId){
      this.$emit('edit-product', productId)
      console.log(productId)
    }
  }
}
</script>

<style scoped>

</style>
