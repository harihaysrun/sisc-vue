<template>

    <div class="inner-container">
        
      <div class="hero-banner">
        <h1>Reviews</h1>
      </div>

      <div class="search-box" style="background-color:rgba(0,0,0,0.1); padding: 20px;">
        <input type="text" v-model="search" placeholder="Search by brand or product name">
      </div>

      <div class="search-results container">

        <div class="no-of-products">
          <h2>{{filteredRequests.length}} Products</h2>
        </div>

        <div class="indiv-product" v-for="p in filteredRequests" v-bind:key="p._id">

          <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
            
            <div class="product-img">
              <img v-bind:src="p.productImage" />
            </div>      

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
    // console.log(this.products.length)
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
      this.$emit('view-product', productId);
    }
  },
  computed:{
    filteredRequests: function(){
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
  /* padding:35px 0; */
  /* width:50%; */
}

.inner-container{
  width:100%;
  align-items: center;
}

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
  background-image: url('https://images.pexels.com/photos/6811708/pexels-photo-6811708.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
}

.search-results{
  margin:35px 0;
  /* margin:0 20px; */
  /* margin: 35px 20px; */
}

.indiv-product a{
    align-items: stretch !important;
}

.product-img{
  background-color: palegoldenrod;
  width:100px;
  border:1px solid black;
  margin: -1px;
  z-index:5;
}

.product-img img{
  width:100%;
  height:100%;
}

.text-container{
  width:100%;
  margin-top:0;
  display:flex;
  flex-direction: column;
  /* margin-left:15px; */
  padding: 15px;
  justify-content: center;
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

@media screen and (min-width:768px){

  .text-container{
    width:100%;
    flex-direction: row;
    margin-left:0;
    align-items: center;
    padding:0;
  }

  .search-results{
    width:80%;
    flex-flow: row wrap;
  }

  .indiv-product{
    padding:10px;
  }

  .product-info{
    padding:15px 25px;
  }

  .review-count{
    height:100%;
    background-color:white;
    margin-left:auto;
    flex-direction: column;
    text-align:center;
    justify-content: center;
    border-left:1px solid black;
    padding:15px 25px;
  }

  .review-count h2{
    font-size:22px;
    margin-right:0;
  }

  .product-img{
    width:150px;
  }

}

@media screen and (min-width:1024px){

  .search-results{
    width:60%;
  }

}

</style>
