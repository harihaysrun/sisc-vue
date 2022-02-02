<template>

    <div class="inner-container">
        
      <div class="hero-banner">
        <h1>Reviews</h1>

        <div style="background-color:rgba(0,0,0,0.1); padding: 20px;">
          <input type="text" v-model="search" placeholder="Search by brand or product name">
        </div>
      </div>

      <div class="search-results">

        <div class="indiv-product" v-for="p in filteredRequests" v-bind:key="p._id">

          <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
            <img style="width:150px" v-bind:src="p.productImage" />

            <div class="text-container">

              <div class="product-info">
                <h4>{{p.productBrand}}</h4>
                <h2>{{p.productName}}</h2>
              </div>

              <div class="review-count">
                <h2 v-if="p.noOfReviews">{{p.noOfReviews}}</h2>
                <h2 v-else>0</h2>
                Reviews
              </div>
            
            </div>

          </a>

        </div>

      </div>

    </div>
    
</template>

<script>

import axios from 'axios';
const BASE_API_URL = "https://nsy-skincare-api.herokuapp.com/";

export default {
  created: async function(){
    let response = await axios.get(BASE_API_URL + 'reviews');
    this.products = response.data.reverse();
    console.log(this.products.length)
  },
  data: function(){
    return{
      'products': [],
      'search': '',
    }
  },
  methods:{
    viewThisProduct: function(productId){
      this.tab = "productInfo";
      console.log(productId)
      this.$emit('view-product', productId);
    }
  },
  computed:{
    filteredRequests: function(){
      console.log('filteredproducts')
      let filtered = this.products.filter((p) =>
        p.productBrand.toLowerCase().includes(this.search.toLowerCase())||
        p.productName.toLowerCase().includes(this.search.toLowerCase())
      );
      return filtered;
    }
  }
}
</script>

<style scoped>

.container{
  padding:35px 0;
  /* width:50%; */
}

.inner-container{
  width:100%;
  display:flex;
  flex-direction: column;
  align-items: center;
}

/* .hero-banner h1{
  color:white;
} */

h2, h3, h4{
  margin:0;
  padding:0;
  font-weight:400;
}

h2{
  font-size:22px;
  color:gray;
}

h3, h4{
  color:mediumslateblue;
}

.hero-banner{
  background-color:black;
  width:100%;
  padding:100px 0;
  background-image: url('https://images.pexels.com/photos/6811708/pexels-photo-6811708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  background-size: cover;
  background-position:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items: center;
}

input[type="text"]{
  -moz-appearance:none;
  -webkit-appearance:none;
  appearance:none;
  width:70vw;
  font-family: 'Manrope', sans-serif;
  box-sizing: border-box;
  padding:15px 20px;
  border:0;
  background-color:white;
  border-bottom:1px solid lightgray;
}

.search-results{
  width:90%;
  margin:35px 0;
  display:flex;
  flex-direction: column;
  /* background-color:mediumslateblue; */
}

.indiv-product{
  box-sizing: border-box;
  padding:0 0 20px 0;
  width:100%;
}

.indiv-product a{
  display:flex;
  flex-direction:row;
  align-items:center;
  position:relative;
  background-color: rgb(240, 240, 240, 0.5);
  border-radius:15px;
  overflow:hidden;
  padding:20px 35px 20px 20px;
  z-index:0;
}

.indiv-product a::before{
  content: '';
  position:absolute;
  top:0;
  left:0;
  width:80px;
  height:100%;
  background-color: mediumslateblue;
  z-index:-1;
}

.indiv-product a:hover{
  background-color: rgb(240, 240, 240, 0.8);
}

.indiv-product a img{
  width:120px !important;
  height:120px !important;
  border-radius:10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  /* flex:1; */
}

.text-container{
  display:flex;
  flex-direction: column;
  margin-left:15px;
}

.product-info{
  /* background-color:pink; */
  width:100%;
  color:#acacac;
}

.review-count{
  /* background-color:pink; */
  text-align:left;
  display:flex;
  flex-direction: row;
}

.review-count h2{
  font-size:16px;
  margin-right:5px;
}

@media screen  and (min-width:768px){

  input[type="text"]{
    width:50vw;
  }

  .text-container{
    width:100%;
    flex-direction: row;
    margin-left:0;
  }

  .product-info{
    margin-left:25px;
  }

  .search-results{
    width:60%;
    flex-flow: row wrap;
  }

  .indiv-product{
    /* width:50%; */
    box-sizing: border-box;
    padding:10px;
  }

  .review-count{
    /* background-color:pink; */
    margin-left:auto;
    flex-direction: column;
    text-align:center;
  }

  .review-count h2{
    font-size:22px;
    margin-right:0;
  }

}

</style>
