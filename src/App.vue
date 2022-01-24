<template>

  <div class="main-container">
      <nav>
        <div class="container">
          <a v-on:click="home" v-if="page === 'home'" style="background-color:black" id="home">Home</a>
          <a v-on:click="home" v-else>Home</a>

          <a v-on:click="skincareProducts" v-if="page === 'skincareProducts'" style="background-color:black" >Skincare Products</a>
          <a v-on:click="skincareProducts" v-else>Skincare Products</a>

          <a v-on:click="addProduct" v-if="page === 'addProduct'" style="background-color:black" >Add New</a>
          <a v-on:click="addProduct" v-else>Add New</a>
        </div>
      </nav>

      <section>
        <Home v-if="page === 'home'" v-on:view-all="skincareProducts" v-on:view-requests="requestedProducts"/>
        <SkincareProducts v-if="page === 'skincareProducts'" request-tab="requests"/>
        <AddProduct v-if="page === 'addProduct'" v-on:product-added="refreshAddPage"/>
      </section>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
import Home from '@/components/home';
import SkincareProducts from '@/components/skincare-products'
import AddProduct from '@/components/add-or-request-product'

export default {
  name: 'App',
  components: {
    Home, SkincareProducts, AddProduct
  },
  data: function(){
    return{
      'page': 'home',
      // 'pageType': ''
    }
  },
  methods:{
    home: function(){
      this.page = "home"
      // location.hash = ""
    },
    skincareProducts: function(){
      console.log("viewing all skincare products now")
      this.page = "skincareProducts";
      // location.hash = "skincare-products"
    },
    addProduct: function(){
      this.page = "addProduct"
    },
    refreshAddPage: function(){
      this.page = "home"
    },
    requestedProducts: function(){
      console.log("viewing all requested products")
      this.page = "skincareProducts";
      // this.pageType = "requests"
      // location.hash = "skincare-products"
    },
    requests: function(){
      return "requests"
    }
  }
}
</script>

<style>

</style>
