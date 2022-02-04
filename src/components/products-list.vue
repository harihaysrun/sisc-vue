<template>

      <div class="inner-container">
      
      <h1 class="title-from-home" v-if="pageTitle === 'Recently Added'">{{pageTitle}}</h1>
        
        <div class="hero-banner" v-bind:style="{'display': display}">
          <h1>{{pageTitle}}</h1>
        </div>

        <div class="search container" v-bind:style="{'width': width}">

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

            </div>

            <div>
              <label class="details-tag">Product Size</label>
              <select name="" id="" v-model="product_size">
                <option value="" disabled>Select One</option>
                <option value="Sample">Sample</option>
                <option value="Mini">Mini</option>
                <option value="Full">Full</option>
              </select>
            </div>

            <div>
              <label class="details-tag">Price</label>
              <select name="" id="" v-model="product_price">
                <option value="" disabled>Select One</option>
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
              <input type="radio" value="Normal" v-model="skin_type" id="skin-normal"/> <label for="skin-normal">Normal</label>
              <br>
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

                <div class="product-img">
                  <img v-bind:src="p.productImage" />
                </div>

                <div class="product-info">

                  <div class="brand-name">
                    <small>{{p.productBrand}}</small>
                    <h2>{{p.productName}}</h2>
                  </div>

                  <!-- Category:
                  <span v-if="p.productCategory === 'Others'">{{p.productCategoryOthers}}</span>
                  <span v-else>{{p.productCategory}}</span>
                  
                  <br>
                  Suitable for: 
                  <span class="skin-type">{{p.skinType.join(',   ')}} SKIN</span> -->


                  <div class="size-price">
                    
                    {{p.productType}} size
                    <h3>
                      <span v-if="p.productPrice === 'Specify'">${{p.productPriceDollars}}</span>
                      <span v-else>{{p.productPrice}}</span>
                    </h3>

                  </div>

                </div>

                <span class="condition" v-if="p.productCondition === 'New'">Brand New</span>
                <span class="condition used" v-if="p.productCondition === 'Used'">{{p.productCondition}}</span>

                <span class="vegan" v-if="p.productVegan === 'Yes'"></span>
                <span class="cf" v-if="p.productCrueltyFree === 'Yes'"></span>

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
  props: ['pageTitle', 'max', 'display', 'marginLeft', 'width'],
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

.title-from-home{
  margin-right:auto;
}

.hero-banner{
  background-image: url('https://images.unsplash.com/photo-1608068811588-3a67006b7489?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80');
}

.inner-container{
  width:100%;
  align-items: center;
}

input[type="text"], select{
  width:100% !important;
  background-color:white;
}

.search{
  /* width:80%; */
  display:flex;
  flex-direction: column;
  /* margin:35px 0; */
  margin-top:35px;
  margin-bottom:35px;
}

.search-bar{
  background-color:rgba(216, 216, 216, 0.2);
  padding: 20px;
  /* padding-right:45px; */
  /* border-right:1px solid rgba(216, 216, 216, 0.7); */
}

.search-bar div{
  margin-bottom:25px;
}

.search-results{
  margin-top:35px;
}

/* .indiv-product a::before{
    content: '';
    position:absolute;
    top:0;
    left:0;
    width:20%;
    height:100%;
    background-color: mediumslateblue;
    z-index:-1;
} */


.indiv-product a{
    align-items: stretch !important;
}

.product-img{
  background-color: palegoldenrod;
  width:219px;
  border:1px solid black;
  margin: -1px;
}

.product-img img{
  width:100%;
  height:100%;
}

h2{
  font-size:22px;
}

.condition, .vegan, .cf{
  position:absolute;
  top:-1px;
  left:-1px;
  background-color:honeydew;
  padding:10px 25px;
  /* border-radius:25px; */
  font-size:12px;
  text-transform: uppercase;
  color:green;
  font-weight:700;
  /* box-shadow: 0 5px 15px rgba(0,0,0,0.1); */
  border:1px solid black;
  /* z-index:5; */
}

.used{
  background-color:mistyrose;
  color:red;
}

.vegan{
  left:5px;
  background-color:white;
  top:80px;
  width:25px;
  height:25px;
  padding:0;
  background-image:url('https://www.pngitem.com/pimgs/m/160-1609305_vegan-logo-png-vegan-or-vegetarian-symbol-transparent.png');
  background-size:35px;
  background-position:center;
  background-repeat:no-repeat;
  border-radius:25px;
}

.cf{
  left:5px;
  top:45px;
  width:25px;
  height:25px;
  padding:0;
  background-image:url('https://www.kindpng.com/picc/m/424-4243754_cruelty-free-logo-png-animal-cruelty-free-transparent.png');
  background-size:20px;
  background-position:center;
  background-repeat:no-repeat;
  border-radius:25px;
}

.skin-type{
  list-style-type: none;
  color:mediumslateblue;
  font-size:13px;
  font-weight:700;
  text-transform: uppercase;

}

.product-info{
  /* background-color:pink; */
  width:100%;
  padding: 10px 15px;
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

.size-price{
  color:mediumslateblue;
}

@media screen  and (min-width:768px){

  .search-results{
    width:100%;
    flex-flow: row wrap;
    justify-content: space-between;
    /* background-color:pink; */
    height:50%;
  }

  .indiv-product{
    width:48%;
  }

  .indiv-product a{
    height:100%;
  }

  .product-img{
    width:100%;
  }

}

@media screen  and (min-width:1024px){
/* 
  .inner-container{
    flex-direction: row;
  } */

  .search{
    flex-direction: row;
  }

  .search-bar{
    width:300px;
    padding: 25px;
  }

  .search-results{
    margin-top:0;
    width:100%;
    margin-left: 35px;
    flex-flow: row wrap;
    justify-content: flex-start;
  }

  .indiv-product{
    width:50%;
  }

  .indiv-product a{
    margin:10px;
    /* height:100%; */
    flex-direction: column;
    align-items: center;
    padding:0;
    z-index:2;
    /* height:500px; */
    /* align-items: stretch !important; */
  }

  /* .indiv-product a img{
    width:100%;
    height:auto;
    border-bottom:1px solid black;
  } */

  .product-info{
    margin:0;
    margin-right:auto;
    width:auto;
    padding: 20px 25px;
  }

  .size-price {
    margin-top:35px;
  }

  .vegan{
    top:90px;
    width:35px;
    height:35px;
  }

  .cf{
    top:45px;
    width:35px;
    height:35px;
  }

}

@media screen  and (min-width:1300px){

  .indiv-product{
    width:25%;
  }
  

}


</style>
