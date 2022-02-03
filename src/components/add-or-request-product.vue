<template>

    <div class="details-container">

      <div class="img-container">
        <img v-bind:src="formData.product_image">
      </div>

      <div class="text-container">
        
        <div>
          <h1>Add or Request skincare product</h1>
        </div>

        <div id="success-message" v-if="editSuccess === 'Yes'">Successfully added product!</div>

        <div>
          <span class="details-tag">I'm looking to...</span>
          <input type="radio" value="sellOrGive" v-model="formData.listing_type" id="post-sell"/><label for="post-sell"> Sell or Give this product away</label>
          <br>
          <input type="radio" value="request" v-model="formData.listing_type" id="post-request"/><label for="post-request"> Request a product</label>
          <br>
          <input type="radio" value="review" v-model="formData.listing_type" id="post-review"/><label for="post-review"> Add new product to review board</label>
        </div>

        <div v-if="formData.listing_type != 'review'">
          <span class="details-tag">Name</span>
          <input type="text" v-model="formData.poster_name" />
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <span class="details-tag">Product condition</span>
          <input type="radio" value="New" v-model="formData.product_condition" id="condition-new"/><label for="condition-new">Brand New</label>
          &nbsp;&nbsp;
          <input type="radio" value="Used" v-model="formData.product_condition" id="condition-used"/><label for="condition-used"> Used</label>
          <div class="reminder-message" v-if="formData.product_condition === 'Used'">Please remember to sanitize any used products before handing them off to someone else!</div>
        </div>

        <div>
          <span class="details-tag">Brand</span>
          <input type="text" v-model="formData.product_brand" />
        </div>
        
        <div>
          <span class="details-tag">Product Name</span>
          <div class="review-name">
            <input type="text" v-model="formData.product_name"/>
            <button v-if="formData.listing_type === 'review'" v-on:click="crosscheckWithReviews">Check if product exists</button>
          </div>
          <div class="reminder-message" v-if="inReviewBoard === false">
            This product doesn't exist in the reviews board
            <button class="message-btn" v-on:click="hideMsg">OK</button>
          </div>
          <div class="reminder-message" v-if="inReviewBoard === true">
            <b>{{reviewProductName}}</b> exists in the reviews board. Head on to the reviews page to contribute your opinion!
            <button class="message-btn" v-on:click="hideMsg">OK</button>
          </div>
          <div class="reminder-message" v-if="inReviewBoard === 'noInput'">
            Please add a product before checking
            <button class="message-btn" v-on:click="hideMsg">OK</button>
          </div>
        </div>
        
        <div>
          <span class="details-tag">Product Image Link</span>
          <input type="text" v-model="formData.product_image" />
        </div>

        <div v-if="formData.listing_type != 'request'">
          <span class="details-tag">Product Category</span>
          <select name="" id="" v-model="formData.product_category">
            <option value="" disabled>Select One</option>
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
          <span class="details-tag">Quantity</span>
          <select name="" id="" v-model="formData.product_quantity">
            <option value="" disabled>Select One</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="Others">Others</option>
          </select>

          <input class="specify" type="text" v-model="formData.product_quantity_box"  placeholder="Put a value" v-if="formData.product_quantity === 'Others'" />
        </div>

        <div v-if="formData.listing_type != 'review'">
          <span class="details-tag">Product Size</span>
          <select name="" id="" v-model="formData.product_size">
            <option value="" disabled>Select One</option>
            <option value="Sample">Sample</option>
            <option value="Mini">Mini</option>
            <option value="Full">Full</option>
          </select>

          <input class="specify" type="text" placeholder="Specify size in ml" v-model="formData.product_size_ml" />
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <span class="details-tag">Price</span>
          <select name="" id="" v-model="formData.product_price">
            <option value="" disabled>Select One</option>
            <option value="Free">Free</option>
            <option value="Specify">Specify</option>
          </select>

          <input class="specify" type="text" v-model="formData.product_price_box" placeholder="Put any value" v-if="formData.product_price === 'Specify'"/>
        </div>

        <div v-if="formData.listing_type != 'review'">
          <span class="details-tag">Product Description</span>
          <textarea name="" id="" v-model="formData.product_description"></textarea>
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <span class="details-tag">Suitable for skin type</span>
          <input type="checkbox" value="Dry" v-model="formData.skin_type" id="skin-dry"/> <label for="skin-dry">Dry</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Normal" v-model="formData.skin_type" id="skin-normal"/> <label for="skin-normal">Normal</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Combination" v-model="formData.skin_type" id="skin-combo"/> <label for="skin-combo">Combination</label>
          &nbsp;&nbsp;
          <input type="checkbox" value="Oily" v-model="formData.skin_type" id="skin-oily"/> <label for="skin-oily">Oily</label>
        </div>

        <div v-if="formData.listing_type === 'sellOrGive'">
          <span class="details-tag">Skin concerns:</span>
          <input type="text" v-model="formData.skin_concerns" placeholder="Separate words with commas. E.g redness, irritation, sensitive" />
        </div>

        <div v-if="formData.listing_type != 'request'">
          <span class="details-tag">Is this product vegan?</span>
          <input type="radio" value="Yes" v-model="formData.product_vegan" id="vegan-yes" /> <label for="vegan-yes">Yes</label>
          &nbsp;&nbsp;
          <input type="radio" value="No" v-model="formData.product_vegan" id="vegan-no" /> <label for="vegan-no">No</label>
          &nbsp;&nbsp;
          <input type="radio" value="N/A" v-model="formData.product_vegan" id="vegan-na" /> <label for="vegan-na">N/A</label>
        </div>

        <div v-if="formData.listing_type != 'request'">
          <span class="details-tag">Is this product/brand cruelty free?</span>
          <input type="radio" value="Yes" v-model="formData.product_cf" id="cf-yes"/> <label for="cf-yes">Yes</label>
          &nbsp;&nbsp;
          <input type="radio" value="No" v-model="formData.product_cf" id="cf-no"/> <label for="cf-no">No</label>
          &nbsp;&nbsp;
          <input type="radio" value="N/A" v-model="formData.product_cf" id="cf-na"/> <label for="cf-na">N/A</label> 
        </div>

        <button v-on:click="addListing" v-if="formData.listing_type === 'sellOrGive'">Add Product</button>
        <button v-on:click="addRequest" v-if="formData.listing_type === 'request'">Add Request</button>
        <button v-on:click="addProduct" v-if="formData.listing_type === 'review'">Add New Product</button>
        

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

const checkFills = "Please make sure to fill in all boxes";

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
      'reviewProductName': '',
      'editSuccess': ''
    }
  },
  methods:{
    'addListing': async function(){

      // if (!this.formData.posterName ||
      //     !this.formData.listing_type ||
      //     !this.formData.product_condition ||
      //     !this.formData.product_brand ||
      //     !this.formData.product_name ||
      //     !this.formData.product_image ||
      //     !this.formData.product_category ||
      //     !this.formData.product_quantity ||
      //     !this.formData.product_size ||
      //     !this.formData.product_price ||
      //     !this.formData.product_description ||
      //     !this.formData.skin_type ||
      //     !this.formData.skin_concerns ||
      //     !this.formData.product_vegan ||
      //     !this.formData.product_cf) {
      //       alert(checkFills)
      //       return
      //     }

      // const successMsg = document.getElementById("success-message");
      // successMsg.style.display = "block";

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

      this.formData = JSON.parse(JSON.stringify(original));

      this.editSuccess = "Yes";
      window.scrollTo(0, 0);

    },
    addRequest: async function(){

      if (!this.formData.posterName ||
          !this.formData.product_brand ||
          !this.formData.product_name ||
          !this.formData.product_image ||
          !this.formData.product_quantity ||
          !this.formData.product_size ||
          !this.formData.product_description) {
            alert(checkFills)
            return
          }

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

      if (!this.formData.product_brand ||
          !this.formData.product_name ||
          !this.formData.product_image ||
          !this.formData.product_category ||
          !this.formData.product_vegan ||
          !this.formData.product_cf) {
            alert(checkFills)
            return
          }
          
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

}
</style>
