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
        <Home v-if="page === 'home'" />
        <SkincareProducts v-if="page === 'skincareProducts'"/>
        <AddProduct v-if="page === 'addProduct'" v-on:product-added="refreshAddPage"/>
      </section>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
import Home from '@/components/home';
import SkincareProducts from '@/components/skincare-products'
import AddProduct from '@/components/add-skincare-product'

export default {
  name: 'App',
  components: {
    Home, SkincareProducts, AddProduct
  },
  data: function(){
    return{
      'page': 'home'
    }
  },
  methods:{
    home: function(){
      this.page = "home"
      // location.hash = ""
    },
    skincareProducts: function(){
      this.page = "skincareProducts";
      // location.hash = "skincare-products"
    },
    addProduct: function(){
      this.page = "addProduct"
    },
    refreshAddPage: function(){
      this.page = "home"
    }
  }
}
</script>

<style>

</style>
