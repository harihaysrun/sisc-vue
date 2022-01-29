<template>

    <div>
        
      <h1>Add or Request skincare product</h1>

      <div id="success-message">Successfully added product!</div>

      <div>
        <label>I'm looking to...</label>
        <input type="radio" value="sellOrGive" v-model="formData.listing_type" /> Sell or Give this product away
        <input type="radio" value="request" v-model="formData.listing_type" /> Request a product
      </div>

      <div>
        <label>Product condition</label>
        <input type="radio" value="New" v-model="formData.product_condition" /> Brand New
        <input type="radio" value="Used" v-model="formData.product_condition" /> Used
        <div class="reminder-message" v-if="formData.product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
      </div>

      <div>
        <label>Brand</label>
        <input type="text" v-model="formData.product_brand" />
      </div>
      
      <div>
        <label>Product Name</label>
        <input type="text" v-model="formData.product_name" />
      </div>
      
      <div>
        <label>Product Image</label>
        <input type="text" v-model="formData.product_image" />
        <div id="previewPic">
          <img v-bind:src="formData.product_image">
        </div>
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Product Category</label>
        <select name="" id="" v-model="formData.product_category">
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

        <input type="text" v-model="formData.product_category_others"  placeholder="Please specify product category" v-if="formData.product_category === 'Others'"/>
      </div>

      <div>
        <label>Quantity</label>
        <select name="" id="" v-model="formData.product_quantity">
          <option value="" disabled>select one</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="Others">Others</option>
        </select>

        <input type="text" v-model="formData.product_quantity_box"  placeholder="Put a value" v-if="formData.product_quantity === 'Others'" />
      </div>

      <div>
        <label>Product Size</label>
        <select name="" id="" v-model="formData.product_size">
          <option value="" disabled>select one</option>
          <option value="Sample">Sample</option>
          <option value="Mini">Mini</option>
          <option value="Full">Full</option>
        </select>

        <input type="text" placeholder="Specify size of product in ml" v-model="formData.product_size_ml" />
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Price</label>
        <select name="" id="" v-model="formData.product_price">
          <option value="" disabled>select one</option>
          <option value="0">Free</option>
          <option value="Specify">Specify</option>
        </select>

        <input type="text" v-model="formData.product_price_box" placeholder="Put any value" v-if="formData.product_price === 'Specify'"/>
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Product Description</label>
        <textarea name="" id="" cols="30" rows="10" v-model="formData.product_description"></textarea>
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Suitable for skin type</label>
        <input type="checkbox" value="Dry" v-model="formData.skin_type" /> Dry
        <input type="checkbox" value="Combination" v-model="formData.skin_type" /> Combination
        <input type="checkbox" value="Oily" v-model="formData.skin_type" /> Oily
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Skin concerns:</label>
        <input type="text" v-model="formData.skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Is this product vegan?</label>
        <input type="radio" value="Yes" v-model="formData.product_vegan" /> Yes
        <input type="radio" value="No" v-model="formData.product_vegan" /> No
        <input type="radio" value="N/A" v-model="formData.product_vegan" /> N/A
      </div>

      <div v-if="formData.listing_type === 'sellOrGive'">
        <label>Is this product/brand cruelty free?</label>
        <input type="radio" value="Yes" v-model="formData.product_cf" /> Yes
        <input type="radio" value="No" v-model="formData.product_cf" /> No
        <input type="radio" value="N/A" v-model="formData.product_cf" /> N/A
      </div>

      <button v-on:click="addProduct" v-if="formData.listing_type === 'sellOrGive'">Add Product</button>
      <button v-on:click="addRequest" v-if="formData.listing_type === 'request'">Add Request</button>
      
      <div v-else>
        <ul>
          <li>Listing type: {{formData.listing_type}}</li>
          <li>Product condition: {{formData.product_condition}}</li>
          <li>Brand: {{formData.product_brand}}</li>
          <li>Name of product: {{formData.product_name}}</li>
          <li>Product image link: {{formData.product_image}}</li>
          <li>Product category: {{formData.product_category}}</li>
          <li>Please specify category: {{formData.product_category_others}}</li>
          <li>Product quantity: {{formData.product_quantity}}</li>
          <li>Product quantity (others): {{formData.product_quantity_box}}</li>
          <li>Size: {{formData.product_size}}</li>
          <li>Size in ml: {{formData.product_size_ml}}</li>
          <li>Product price: {{formData.product_price}}</li>
          <li>Product price in dollars: {{formData.product_price_box}}</li>
          <li>Description: {{formData.product_description}}</li>
          <li>Skin type: {{formData.skin_type}}</li>
          <li>Skin concerns: {{formData.skin_concerns}}</li>
          <li>Vegan?: {{formData.product_vegan}}</li>
          <li>Cruelty free?: {{formData.product_cf}}</li>
        </ul>
      </div>

      <div v-if="formData.listing_type === 'request'">
        <ul>
          <li>Listing type: {{formData.listing_type}}</li>
          <li>Product condition: {{formData.product_condition}}</li>
          <li>Brand: {{formData.product_brand}}</li>
          <li>Name of product: {{formData.product_name}}</li>
          <li>Product image link: {{formData.product_image}}</li>
          <li>Product quantity: {{formData.product_quantity}}</li>
          <li>Product quantity (others): {{formData.product_quantity_box}}</li>
          <li>Size: {{formData.product_size}}</li>
          <li>Size in ml: {{formData.product_size_ml}}</li>
        </ul>
      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

const original = {  'listing_type': 'sellOrGive',
                    'product_condition': '',
                    'product_brand': '',
                    'product_name': '',
                    'product_image': '',
                    'product_category': '',
                    'product_category_others': '',
                    'product_quantity': '',
                    'product_quantity_box': '',
                    'product_size': '',
                    'product_size_ml': '',
                    'product_price': '',
                    'product_price_box': '0',
                    'product_description': '',
                    'skin_type': [],
                    'skin_concerns': [],
                    'product_vegan': '',
                    'product_cf': ''
      }


export default {
  data: function(){
    return {
      'formData': JSON.parse(JSON.stringify(original))
    }
    
  },
  methods:{
    'addProduct': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.post(BASE_API_URL + 'skincare-products/add',{
        'listingType': this.formData.listing_type,
        'productCondition': this.formData.product_condition,
        'productBrand': this.formData.product_brand,
        'productName': this.formData.product_name,
        'productImage': this.formData.product_image,
        'productCategory': this.formData.product_category,
        'productCategoryOthers': this.formData.product_category_others,
        'productQuantity': this.formData.product_quantity,
        'productQuantityBox': this.formData.product_quantity_box,
        'productType': this.formData.product_size,
        'productSize': this.formData.product_size_ml,
        'productPrice': this.formData.product_price,
        'productPriceDollars': parseInt(this.formData.product_price_box),
        'productDescription': this.formData.product_description,
        'skinType': this.formData.skin_type,
        'skinConcerns': this.formData.skin_concerns.split(','),
        'productVegan': this.formData.product_vegan,
        'productCrueltyFree': this.formData.product_cf
      });

      // this.$emit("product-added");
      this.formData = JSON.parse(JSON.stringify(original));
      // this.formData = original;

    },
    addRequest: async function(){
      await axios.post(BASE_API_URL + 'requested-products/add',{
        'listingType': this.listing_type,
        'productCondition': this.product_condition,
        'productBrand': this.product_brand,
        'productName': this.product_name,
        'productImage': this.product_image,
        'productQuantity': this.product_quantity,
        'productQuantityBox': this.product_quantity_box,
        'productType': this.product_size,
        'productSize': this.product_size_ml
      });
    }
  }
}
</script>

<style scoped>

</style>
