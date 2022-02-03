<template>

    <div class="inner-container">
      
      <h1 class="title-from-home" v-if="pageTitle === 'Recent Requests'">{{pageTitle}}</h1>

      <div class="hero-banner" v-bind:style="{'display': display}" >
        <h1>{{pageTitle}}</h1>

        <div style="background-color:rgba(0,0,0,0.1); padding: 20px;">
          <input type="text" v-model="search" placeholder="Search by brand or product name">
        </div>
      </div>

      <div class="search-results" v-bind:style="{'width': width}">
        
          <div class="indiv-product" v-for="p in filteredRequests.slice(0,max)" v-bind:key="p._id">
            
            <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
              
              <div class="product-img">
                <img v-bind:src="p.productImage" />
              </div>

              <div class="product-info">
                <div class="looking-for">{{p.posterName}} is looking for...</div>
                <div class="brand-name">
                  <div>
                    <h3>{{p.productBrand}}</h3>
                    <h2>{{p.productName}}</h2>
                  </div>
                </div>
              </div>

              <!-- <div class="reply">Reply →</div> -->

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
    let response = await axios.get(BASE_API_URL + 'requested-products');
    this.products = response.data.reverse();
    console.log(this.products)
  },
  data: function(){
    return{
      'products': [],
      'search': ''
    }
  },
  props: ['pageTitle', 'max', 'display', 'width'],
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

.title-from-home{
  margin-right:auto;
}

.container{
  padding:35px 0;
  /* width:50%; */
}

.inner-container{
  width:100%;
  align-items: center;
}

.hero-banner h1{
  color:white;
}

h2, h3{
  font-weight:400;
}

h2{
  font-size:22px;
  color:black;
}

h3{
  color:lightgrey;
}

.hero-banner{
  background-image: url('https://images.pexels.com/photos/6724305/pexels-photo-6724305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
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
    align-items:flex-start !important;
}

.indiv-product a::before{
  width:80px;
  height:100%;
}

.product-img{
  background-color: palegoldenrod;
  height: 200px;
  border-right:1px solid black;
}

.product-info{
  width:100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  flex:6;
}

/* .reply{
  display:none;
} */

.looking-for{
  text-transform: uppercase;
  /* width:auto; */
  color:mediumslateblue;
  padding: 10px 15px;
  font-size:13px;
  background-color:lavender;
  /* border-left:1px solid black; */
  border-bottom:1px solid black;
  /* box-shadow: 3px 3px black; */
}

.brand-name{
  /* background-color: lightgray; */
  padding: 10px 15px;
}

@media screen  and (min-width:768px){

  input[type="text"]{
    width:50vw !important;
  }

  .search-results{
    width:60%;
    flex-flow: row wrap;
  }

  .indiv-product{
    padding:10px;
  }

  .brand-name{
    /* background-color: lightgray; */
    padding: 25px 15px;
  }

  /* .reply{
    display:block;
    opacity:0;
  } */

  /* .indiv-product a:hover .reply{
    opacity:0.5;
  } */

}

</style>
