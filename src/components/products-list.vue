<template>

    <div>

      <h1>{{pageTitle}}</h1>

      <div class="inner-container">

        <div class="search-bar" v-bind:style="{'display': display}">
          <h2 style="margin:0;">Search</h2>

          <div>
            <label class="details-tag">Product brand/name</label>
            <input type="text" v-model="search" placeholder="Search by brand or product name">
          </div>

          <div>
            <label class="details-tag">Product condition</label>
            <input type="radio" value="New" v-model="product_condition" id="condition-new"/><label for="condition-new">Brand New</label> 
            <input type="radio" value="Used" v-model="product_condition" id="condition-used"/><label for="condition-used">Used</label>
          </div>

          <div>
            <label class="details-tag">Product Category</label>
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
              <option value="Body Cream">Body Cream</option>
              <option value="Sunscreen">Sunscreen</option>
              <option value="Others">Others</option>
            </select>

          </div>

          <div>
            <label class="details-tag">Product Size</label>
            <select name="" id="" v-model="product_size">
              <option value="" disabled>select one</option>
              <option value="Sample">Sample</option>
              <option value="Mini">Mini</option>
              <option value="Full">Full</option>
            </select>
          </div>

          <div>
            <label class="details-tag">Price</label>
            <select name="" id="" v-model="product_price">
              <option value="" disabled>select one</option>
              <option value="0">Free</option>
              <option value="5">$5 or lesser</option>
              <option value="10">$10 or lesser</option>
              <option value="15">$15 or lesser</option>
              <option value="20">$20 or lesser</option>
            </select>
          </div>

          <div>
            <label class="details-tag">Skin type</label>
            <input type="radio" value="Dry" v-model="skin_type" id="skin-dry"/> <label for="skin-dry">Dry</label>
            &nbsp;&nbsp;
            <input type="radio" value="Combination" v-model="skin_type" id="skin-combo"/><label for="skin-combo">Combination</label>
            &nbsp;&nbsp;
            <input type="radio" value="Oily" v-model="skin_type" id="skin-oily"/> <label for="skin-oily">Oily</label>
          </div>

          <div>
            <!-- <label for="">Vegan?</label> -->
            <input type="checkbox" value="Yes" v-model="product_vegan" id="vegan" /> <label for="vegan">Vegan</label>
            <br>
            <input type="checkbox" value="Yes" v-model="product_cf" id="cf" /> <label for="cf">Cruelty free</label>
          </div>


          <button v-on:click="searchFilter">Search</button>
          <button class="reset" v-on:click="clearSearch">Reset Search Filters</button>
        </div>

        <div class="search-results" v-bind:style="{'marginLeft': marginLeft}">

          <div class="indiv-product" v-for="p in products.slice(0,max)" v-bind:key="p._id">

            <a v-on:click="viewThisProduct(p._id)">
              <img v-bind:src="p.productImage" />
              <div class="product-info">
                {{p.productBrand}}
                <h2>{{p.productName}}</h2>
                <span class="condition" v-if="p.productCondition === 'New'">{{p.productCondition}}</span>
                <span class="condition used" v-if="p.productCondition === 'Used'">{{p.productCondition}}</span>

                Category:
                <span v-if="p.productCategory === 'Others'">{{p.productCategoryOthers}}</span>
                <span v-else>{{p.productCategory}}</span>
                
                <br>
                Suitable for: 
                <span class="skin-type">{{p.skinType.join(',   ')}} SKIN</span>

                <span class="vegan" v-if="p.productVegan === 'Yes'"></span>
                <span class="cf" v-if="p.productCrueltyFree === 'Yes'"></span>

                <div>
                  
                  {{p.productType}} size
                  <h3>
                    <span v-if="p.productPrice === 'Specify'">${{p.productPriceDollars}}</span>
                    <span v-else>{{p.productPrice}}</span>
                  </h3>

                </div>

              </div>
            </a>
          </div>
        </div>
      
      </div>

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
      'search': 'Search by brand or name',
      'product_condition': '',
      'product_category': '',
      'product_size': '',
      'product_price': '',
      'skin_type': '',
      'product_vegan': [],
      'product_cf': [],
    }
  },
  props: ['pageTitle', 'max', 'display', 'marginLeft'],
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    },
    searchFilter: async function(){

        console.log(this.product_vegan.toString())
        console.log(this.product_cf.toString())
      
        let response = await axios.post(BASE_API_URL + 'search', {
          'search': this.search,
          'productCondition': this.product_condition,
          'productCategory': this.product_category,
          'productType': this.product_size,
          'productPriceDollars': parseInt(this.product_price),
          'skinType': this.skin_type,
          'productVegan': this.product_vegan.toString(),
          'productCrueltyFree': this.product_cf.toString()
        });
        let search = response.data;
        this.products = response.data.reverse();
        console.log(search);

    },
    clearSearch: async function(){
      let response = await axios.get(BASE_API_URL + 'skincare-products');
      this.search = "Search by brand or name";
      this.product_condition = "";
      this.product_category = "";
      this.product_size = "";
      this.product_price = "";
      this.skin_type = "";
      this.product_vegan = [];
      this.product_cf = [];
      this.products = response.data.reverse();
    }
  }
}
</script>

<style scoped>

.inner-container{
    padding:35px 0;
}

input[type="text"], select{
  width:100% !important;
  background-color:white;
}

.search-bar{
  background-color:rgba(216, 216, 216, 0.3);
  padding: 20px 25px;
}

.search-bar div{
  margin-bottom:25px;
}

.indiv-product a::before{
    content: '';
    position:absolute;
    top:0;
    left:0;
    width:20%;
    height:100%;
    background-color: mediumslateblue;
    z-index:-1;
}

h2{
  font-size:22px;
}

.condition, .vegan, .cf{
  position:absolute;
  top:10px;
  left:10px;
  background-color:honeydew;
  padding:10px 25px;
  border-radius:25px;
  font-size:12px;
  text-transform: uppercase;
  color:green;
  font-weight:700;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  /* z-index:5; */
}

.used{
  background-color:mistyrose;
  color:red;
}

.vegan{
  background-color:white;
  top:55px;
  width:35px;
  height:35px;
  padding:0;
  background-image:url('https://www.pngitem.com/pimgs/m/160-1609305_vegan-logo-png-vegan-or-vegetarian-symbol-transparent.png');
  background-size:35px;
  background-position:center;
  background-repeat:no-repeat;
}

.cf{
  top:100px;
  width:35px;
  height:35px;
  padding:0;
  background-image:url('https://www.kindpng.com/picc/m/424-4243754_cruelty-free-logo-png-animal-cruelty-free-transparent.png');
  background-size:20px;
  background-position:center;
  background-repeat:no-repeat;
}

.skin-type{
  list-style-type: none;
  color:mediumslateblue;
  /* background-color:lightgray; */
  /* padding:10px 25px; */
  /* border-radius:25px; */
  font-size:13px;
  font-weight:700;
  text-transform: uppercase;
  /* letter-spacing:-1px; */

}

.product-info{
  /* background-color:pink; */
  margin-left:15px;
  width:100%;
}

button{
  width:100%;
  margin-bottom:15px;
}

.reset{
  background-color:white;
  border:1px solid black;
  color:black;
}

@media screen  and (min-width:768px){

  .inner-container{
    flex-direction: row;
  }

  .search-bar{
    width:300px;
  }

  .search-results{
    width:100%;
    margin-left: 35px;
    flex-flow: row wrap;
  }

  .indiv-product{
    width:50%;
    padding:10px;
  }

  .indiv-product a{
    height:470px;
    /* padding:0 20px 20px 20px; */
    flex-direction: column;
    align-items: center;
    padding:0;
    padding-top:10%;
    z-index:2;
  }
  
  .indiv-product a::before{
    width:100%;
    height:8vw !important;
  }

  .indiv-product a img{
    width:80%;
    height:auto;
  }

  .product-info{
    margin-left:0;
    margin-top:15px;
    width:80%;
  }

}

@media screen  and (min-width:1024px){

  .indiv-product{
    width:25%;
  }
  

}


</style>
