<template>

  <div class="main-container">
      <nav>
        <div class="container">
          <a v-on:click="home" v-if="page === 'home'" style="background-color:black" id="home">Home</a>
          <a v-on:click="home" v-else>Home</a>

          <a v-on:click="skincareProducts" v-if="page === 'skincareProducts'" style="background-color:black">Skincare Products</a>
          <a v-on:click="skincareProducts" v-else>Skincare Products</a>

          <a v-on:click="reviewProducts" v-if="page === 'reviewProducts'" style="background-color:black">Review Board</a>
          <a v-on:click="reviewProducts" v-else>Review Board</a>

          <a v-on:click="requestProducts" v-if="page === 'requestProducts'" style="background-color:black">Requests</a>
          <a v-on:click="requestProducts" v-else>Requests</a>

          <a v-on:click="addProduct" v-if="page === 'addProduct'" style="background-color:black" >Add New</a>
          <a v-on:click="addProduct" v-else>Add New</a>
        </div>
      </nav>

      <section>
        <Home v-if="page === 'home'" v-on:view-all="skincareProducts" v-on:view-requests="requestedProducts"/>
        <!-- <SkincareProducts v-if="page === 'skincareProducts'" products-tab="sellGive" request-tab="requests" v-bind:typeOfPage="pageViewing"/> -->
        <SkincareProducts v-if="page === 'skincareProducts'"/>
        <ReviewBoard v-if="page === 'reviewProducts'"/>
        <RequestProducts v-if="page === 'requestProducts'" />
        <AddProduct v-if="page === 'addProduct'" v-on:product-added="refreshAddPage"/>
      </section>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
import Home from '@/components/home';
// import SkincareProducts from '@/components/skincare-products'
import SkincareProducts from '@/components/products-tab'
import ReviewBoard from '@/components/review-tab'
import RequestProducts from '@/components/request-tab'
import AddProduct from '@/components/add-or-request-product'

export default {
  name: 'App',
  components: {
    Home,
    SkincareProducts,
    ReviewBoard,
    RequestProducts,
    AddProduct
  },
  data: function(){
    return{
      'page': 'home',
      'pageType': ''
    }
  },
  methods:{
    home: function(){
      this.page = "home"
      // location.hash = ""
    },
    skincareProducts: function(typeOfPage){
      // console.log("viewing all skincare products now")
      this.page = "skincareProducts";
      this.pageViewing = typeOfPage
      // console.log(this.page, this.pageType)
      console.log('pageViewing: ' + this.pageViewing)
      // location.hash = "skincare-products"
    },
    reviewProducts: function(){
      this.page = "reviewProducts"
    },
    requestProducts: function(){
      this.page = "requestProducts"
    },
    addProduct: function(){
      this.page = "addProduct"
    },
    refreshAddPage: function(){
      this.page = "home"
    },
    requestedProducts: function(typeOfPage){
      // console.log("viewing all requested products")
      this.page = "requestProducts";
      // this.pageType = typeOfPage;
      this.pageViewing = typeOfPage
      // console.log(this.page, this.pageType)
      console.log('pageViewing: ' + this.pageViewing)
      // location.hash = "skincare-products"
    },
    // requests: function(){
    //   return "requests"
    // }
  }
}
</script>

<style>

</style>
