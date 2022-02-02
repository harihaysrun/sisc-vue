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

input[type="text"]{
  width:70vw !important;
  background-color:white;
  border-bottom:1px solid lightgray;
}

.search-results{
  width:90%;
  margin:35px 0;
}

.indiv-product a{
  padding:20px 35px 20px 20px;
}

.indiv-product a::before{
  width:80px;
  height:100%;
}

.indiv-product a img{
  width:120px !important;
  height:120px !important;
}

.text-container{
  display:flex;
  flex-direction: column;
  margin-left:15px;
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
    width:50vw !important;
  }

  .text-container{
    width:100%;
    flex-direction: row;
    margin-left:0;
  }

  .search-results{
    width:60%;
    flex-flow: row wrap;
  }

  .indiv-product{
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
