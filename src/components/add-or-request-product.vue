<template>

    <div class="details-container">

      <div class="img-container">
        <img v-bind:src="formData.product_image">
      </div>

      <div class="text-container">
        
        <h1>Add or Request skincare product</h1>

        <div id="success-message">Successfully added product!</div>

        <div>
          <label class="details-tag">Name</label>
          <input type="text" v-model="formData.poster_name" />
        </div>

        <div>
          <label class="details-tag">I'm looking to...</label>
          <input type="radio" value="sellOrGive" v-model="formData.listing_type" /> Sell or Give this product away
          <input type="radio" value="request" v-model="formData.listing_type" /> Request a product
          <input type="radio" value="review" v-model="formData.listing_type" /> Add new product to review board
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <label class="details-tag">Product condition</label>
          <input type="radio" value="New" v-model="formData.product_condition" /> Brand New
          <input type="radio" value="Used" v-model="formData.product_condition" /> Used
          <div class="reminder-message" v-if="formData.product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
        </div>

        <div>
          <label class="details-tag">Brand</label>
          <input type="text" v-model="formData.product_brand" />
        </div>
        
        <div>
          <label class="details-tag">Product Name</label>
          <input type="text" v-model="formData.product_name"/>
          <button v-if="formData.listing_type === 'review'" v-on:click="crosscheckWithReviews">Check if product exists</button>
          <div class="reminder-message" v-if="inReviewBoard === false">
            This product doesn't exist in the reviews board
            <button v-on:click="hideMsg">OK</button>
          </div>
          <div class="reminder-message" v-if="inReviewBoard === true">
            <b>{{reviewProductName}}</b> exists in the reviews board. Head on to the reviews page to contribute your opinion!
            <button v-on:click="hideMsg">OK</button>
          </div>
          <div class="reminder-message" v-if="inReviewBoard === 'noInput'">
            Please add a product before checking
            <button v-on:click="hideMsg">OK</button>
          </div>
        </div>
        
        <div>
          <label class="details-tag">Product Image Link</label>
          <input type="text" v-model="formData.product_image" />
        </div>

        <div v-if="formData.listing_type != 'request'">
          <label class="details-tag">Product Category</label>
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
            <option value="Body Cream">Body Cream</option>
            <option value="Sunscreen">Sunscreen</option>
            <option value="Others">Others</option>
          </select>

          <input class="specify" type="text" v-model="formData.product_category_others"  placeholder="Please specify" v-if="formData.product_category === 'Others'"/>
        </div>

        <div v-if="formData.listing_type != 'review'">
          <label class="details-tag">Quantity</label>
          <select name="" id="" v-model="formData.product_quantity">
            <option value="" disabled>select one</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="Others">Others</option>
          </select>

          <input class="specify" type="text" v-model="formData.product_quantity_box"  placeholder="Put a value" v-if="formData.product_quantity === 'Others'" />
        </div>

        <div v-if="formData.listing_type != 'review'">
          <label class="details-tag">Product Size</label>
          <select name="" id="" v-model="formData.product_size">
            <option value="" disabled>select one</option>
            <option value="Sample">Sample</option>
            <option value="Mini">Mini</option>
            <option value="Full">Full</option>
          </select>

          <input class="specify" type="text" placeholder="Specify size in ml" v-model="formData.product_size_ml" />
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <label class="details-tag">Price</label>
          <select name="" id="" v-model="formData.product_price">
            <option value="" disabled>select one</option>
            <option value="Free">Free</option>
            <option value="Specify">Specify</option>
          </select>

          <input type="text" v-model="formData.product_price_box" placeholder="Put any value" v-if="formData.product_price === 'Specify'"/>
        </div>

        <div v-if="formData.listing_type != 'review'">
          <label class="details-tag">Product Description</label>
          <textarea name="" id="" cols="30" rows="10" v-model="formData.product_description"></textarea>
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <label class="details-tag">Suitable for skin type</label>
          <input type="checkbox" value="Dry" v-model="formData.skin_type" /> Dry
          <input type="checkbox" value="Normal" v-model="formData.skin_type" /> Normal
          <input type="checkbox" value="Combination" v-model="formData.skin_type" /> Combination
          <input type="checkbox" value="Oily" v-model="formData.skin_type" /> Oily
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <label class="details-tag">Skin concerns:</label>
          <input type="text" v-model="formData.skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
        </div>

        <div v-if="formData.listing_type != 'request'">
          <label class="details-tag">Is this product vegan?</label>
          <input type="radio" value="Yes" v-model="formData.product_vegan" /> Yes
          <input type="radio" value="No" v-model="formData.product_vegan" /> No
          <input type="radio" value="N/A" v-model="formData.product_vegan" /> N/A
        </div>

        <div v-if="formData.listing_type != 'request'">
          <label class="details-tag">Is this product/brand cruelty free?</label>
          <input type="radio" value="Yes" v-model="formData.product_cf" /> Yes
          <input type="radio" value="No" v-model="formData.product_cf" /> No
          <input type="radio" value="N/A" v-model="formData.product_cf" /> N/A
        </div>

        <button v-on:click="addListing" v-if="formData.listing_type === 'sellOrGive'">Add Product</button>
        <button v-on:click="addRequest" v-if="formData.listing_type === 'request'">Add Request</button>
        <button v-on:click="addProduct" v-if="formData.listing_type === 'review'">Add New Product</button>
        
        <!-- <div v-if="formData.listing_type === 'sellOrGive'">
          <ul>
            <li>Name: {{formData.poster_name}}</li>
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
            <li>Name: {{formData.poster_name}}</li>
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

        <div v-if="formData.listing_type === 'review'">
          <ul>
            <li>Name: {{formData.poster_name}}</li>
            <li>Listing type: {{formData.listing_type}}</li>
            <li>Brand: {{formData.product_brand}}</li>
            <li>Name of product: {{formData.product_name}}</li>
            <li>Product image link: {{formData.product_image}}</li>
            <li>Product category: {{formData.product_category}}</li>
            <li>Please specify category: {{formData.product_category_others}}</li>
            <li>Vegan?: {{formData.product_vegan}}</li>
            <li>Cruelty free?: {{formData.product_cf}}</li>
          </ul>
        </div> -->

      </div>

    </div>
    
</template>

<script>
import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

const original = {  'poster_name': '',
                    'listing_type': 'sellOrGive',
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
  created:  async function(){
    let response = await axios.get(BASE_API_URL + 'reviews');
    let reviewBoard = response.data;
    this.reviewProductName = reviewBoard.productName;
  },
  data: function(){
    return {
      'formData': JSON.parse(JSON.stringify(original)),
      'inReviewBoard': '',
      'reviewProductName': ''
    }
  },
  methods:{
    'addListing': async function(){

      const successMsg = document.getElementById("success-message");
      successMsg.style.display = "block";

      await axios.post(BASE_API_URL + 'skincare-products/add',{
        'posterName': this.formData.poster_name,
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
        'posterName': this.formData.poster_name,
        'productBrand': this.formData.product_brand,
        'productName': this.formData.product_name,
        'productImage': this.formData.product_image,
        'productQuantity': this.formData.product_quantity,
        'productQuantityBox': this.formData.product_quantity_box,
        'productType': this.formData.product_size,
        'productSize': this.formData.product_size_ml,
        'productDescription': this.formData.product_description
      });

      this.formData = JSON.parse(JSON.stringify(original));
    },
    addProduct: async function(){
      await axios.post(BASE_API_URL + 'reviews/add',{
        'productBrand': this.formData.product_brand,
        'productName': this.formData.product_name,
        'productImage': this.formData.product_image,
        'productCategory': this.formData.product_category,
        'productCategoryOthers': this.formData.product_category_others,
        'productVegan': this.formData.product_vegan,
        'productCrueltyFree': this.formData.product_cf
      });

      this.formData = JSON.parse(JSON.stringify(original));
    },
    crosscheckWithReviews: async function(){

      let response = await axios.get(BASE_API_URL + 'reviews');
      let reviewBoard = response.data;
      // console.log(reviewBoard.length)

      // console.log(this.formData.product_name.length)

      if (this.formData.product_name.length === 0){
        this.inReviewBoard = "noInput";
        return
      }

      for (let i=0; i<reviewBoard.length; i++){
        // console.log(reviewBoard[i].productName)
        if (reviewBoard[i].productName.toLowerCase().includes(this.formData.product_name.toLowerCase())){
          console.log(reviewBoard[i].productName + "exists in the reviews board")
          this.inReviewBoard = true
          this.reviewProductName = reviewBoard[i].productName;
          break
        } else {
          console.log("this product doesn't exist")
          this.inReviewBoard = false
        }
      }
    },
    hideMsg: function(){
      this.inReviewBoard = "";
    }
  }
}
</script>

<style scoped>

h1, h2, h3, h4{
  margin:0;
  padding:0;
}

.details-container{
  margin:50px 0;
  width: 80%;
  display:flex;
  flex-direction: column;
}

.text-container{
  margin-top:50px;
}

.text-container p{
  margin-bottom:25px;
}

.text-container div{
  margin-bottom:25px;
}

.img-container{
  width:80vw;
  height:80vw;
  border-radius:25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow:hidden;
}

.img-container img{
  width:100%;
}

.details-tag{
  text-transform: uppercase;
  display:block;
  font-size:12px;
  letter-spacing: 1px;
  color:mediumslateblue;
}


input[type="text"], textarea, select{
  -moz-appearance:none;
  -webkit-appearance:none;
  appearance:none;
  width:100% !important;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
  padding:15px 20px;
  border:0;
  background-color:rgb(240, 240, 240, 0.3);
  border-bottom:1px solid lightgray;
}

input[type="text"].specify{
  background-color:rgb(249, 248, 255);
}

select, input[type="text"].specify{
  width:22% !important;
  margin-right:15px;
}

@media screen  and (min-width:768px){

  .details-container{
    flex-direction: row;
  }

  .img-container{
    flex:1;
    height:25vw;
    /* background-color:pink; */
    position:sticky;
    top: 120px;
  }

  .text-container{
    /* background-color:palegoldenrod; */
    margin-left:50px;
    margin-top:0;
    flex:2;
  }

  .edit-btn{
    padding:15px 25px;
    margin-left:auto;
  }

  input[type="text"]{
    width:250px;
  }

}
</style>
