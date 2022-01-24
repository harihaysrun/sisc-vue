<template>

    <div>
        
      <h1>Add or Request skincare product</h1>

      <div id="success-message">Successfully added product!</div>

      <div>
        <label>I'm looking to...</label>
        <input type="radio" value="sell" v-model="listing_type" /> Sell this product
        <input type="radio" value="request" v-model="listing_type" /> Request a product
      </div>

      <div>
        <label>Product condition</label>
        <input type="radio" value="New" v-model="product_condition" /> Brand New
        <input type="radio" value="Used" v-model="product_condition" /> Used
        <div class="reminder-message" v-if="product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
      </div>

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
        <label>Quantity</label>
        <select name="" id="" v-model="product_quantity">
          <option value="" disabled>select one</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="Others">Others</option>
        </select>

        <input type="text" v-model="product_quantity_box" v-if="product_quantity === 'Others'" />
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
        <label>Price</label>
        <select name="" id="" v-model="product_price">
          <option value="" disabled>select one</option>
          <option value="Free">Free</option>
          <option value="Specify">Specify</option>
        </select>

        <input type="text" v-model="product_price_box" placeholder="Put any value" v-if="product_price === 'Specify'"/>
      </div>

      <div>
        <label>Product Description</label>
        <textarea name="" id="" cols="30" rows="10" v-model="product_description"></textarea>
      </div>

      <div>
        <label>Suitable for skin type</label>
        <input type="checkbox" value="Dry" v-model="skin_type" /> Dry
        <input type="checkbox" value="Combination" v-model="skin_type" /> Combination
        <input type="checkbox" value="Oily" v-model="skin_type" /> Oily
      </div>

      <div>
        <label>Skin concerns:</label>
        <input type="text" v-model="skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
      </div>

      <div>
        <label>Is this product vegan?</label>
        <input type="radio" value="Yes" v-model="product_vegan" /> Yes
        <input type="radio" value="No" v-model="product_vegan" /> No
        <input type="radio" value="N/A" v-model="product_vegan" /> N/A
      </div>

      <div>
        <label>Is this product/brand cruelty free?</label>
        <input type="radio" value="Yes" v-model="product_cf" /> Yes
        <input type="radio" value="No" v-model="product_cf" /> No
        <input type="radio" value="N/A" v-model="product_cf" /> N/A
      </div>

      <button v-on:click="addProduct">Add</button>
      
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

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://3000-harihaysrun-skincareapi-99ltz4b52lr.ws-us27.gitpod.io/";

export default {
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
      'product_cf': ''
    }
  },
  methods:{
    'addProduct': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.post(BASE_API_URL + 'skincare-products',{
        'listingType': this.listing_type,
        'productCondition': this.product_condition,
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productQuantity': this.product_quantity,
        'productQuantityBox': this.product_quantity_box,
        'productType': this.product_size,
        'productSize': this.product_size_ml,
        'productPrice': this.product_price,
        'productPriceDollars': this.product_price_box,
        'productDescription': this.product_description,
        'skinType': this.skin_type.split(','),
        'skinConcerns': this.skin_concerns,
        'productVegan': this.product_vegan,
        'productCrueltyFree': this.product_cf
      });

      // this.listing_type = "",
      // this.product_condition = "",
      // this.product_brand = "",
      // this.product_name = "",
      // this.product_image = "",
      // this.product_size = [],
      // this.product_size_ml = "",
      // this.product_price = "",
      // this.product_price_box = "",
      // this.product_description = "",
      // this.skin_type = [],
      // this.skin_concerns = [],
      // this.product_vegan = "",
      // this.product_cf = ""

      this.$emit("product-added");

    }
  }
}
</script>

<style scoped>

</style>
