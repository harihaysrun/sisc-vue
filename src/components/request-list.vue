<template>

    <div class="main-container">

      <div class="hero-banner">
        <h1>{{pageTitle}}</h1>

        <div v-bind:style="{'display': display}" style="background-color:rgba(0,0,0,0.1); padding: 20px;">
          <input type="text" v-model="search" placeholder="Search by brand or product name">
        </div>
      </div>

      <div class="container">
        
          <div class="indiv-product" v-for="p in filteredRequests.slice(0,max)" v-bind:key="p._id">
            
            <a v-on:click="viewThisProduct(p._id)" style="display:flex; flex-direction:row; align-items:center">
              
              <img style="width:150px" v-bind:src="p.productImage" />

              <div class="product-info">
                {{p.posterName}} is looking for...
                <h3>{{p.productBrand}}</h3>
                <h2>{{p.productName}}</h2>
              </div>

              <div class="reply">Reply →</div>

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
      'search': '',
    }
  },
  props: ['pageTitle', 'max', 'display'],
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

a:hover, li:hover{
    background-color:rgb(247, 247, 247);
    cursor:pointer;
}

li{
    margin:10px 0 10px 0;
}

.container{
  padding:35px 0;
  /* width:50%; */
}

.inner-container{
  width:100%;
}

h1{
  /* margin-bottom:0; */
  color:white;
}

h2, h3{
  margin:0;
  padding:0;
  font-weight:400;
}

h2{
  font-size:22px;
  color:gray;
}

h3{
  color:mediumslateblue;
}

.hero-banner{
  background-color:black;
  width:100%;
  padding:100px 0;
  background-image: url('https://images.pexels.com/photos/6724305/pexels-photo-6724305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
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
  padding:20px;
  z-index:0;
}

.indiv-product a::before{
  content: '';
  position:absolute;
  top:0;
  left:0;
  width:80px;
  height:100%;
  background-color: lavender;
  z-index:-1;
}

.indiv-product a img{
  width:120px !important;
  height:120px;
  border-radius:10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  flex:1;
}

.product-info{
  /* background-color:pink; */
  margin-left:15px;
  width:100%;
  flex:6;
  color:#acacac;
}

.reply{
  display:none;
}

@media screen  and (min-width:768px){
  input[type="text"]{
    width:50vw;
  }

  .product-info{
    margin-left:25px;
    /* width:80%; */
  }

  .reply{
    display:block;
    opacity:0;
  }

  .indiv-product a:hover .reply{
    opacity:0.5;
  }

}

@media screen  and (min-width:1024px){

  .container{
    width:50%;
  }
  
}

</style>
