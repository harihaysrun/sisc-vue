<template>

  <div class="main-container">
      <nav>
        <div class="container">
          <a v-on:click="home">Home</a>
          <a v-on:click="skincareProducts">Skincare Products</a>
          <a v-on:click="requestProduct">Request</a>
        </div>
      </nav>

      <section>
        <Home v-if="page === 'home'" />
        <SkincareProducts v-if="page === 'skincareProducts'"/>
        <requestProduct v-if="page === 'requestProduct'" />
      </section>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home';
import SkincareProducts from '@/components/skincare-products'
import requestProduct from '@/components/request-skincare-product'

export default {
  name: 'App',
  components: {
    Home, SkincareProducts, requestProduct
  },
  data: function(){
    return{
      'page': 'home'
    }
  },
  methods:{
    home: function(){
      this.page = "home"
      location.hash = ""
    },
    skincareProducts: function(){
      this.page = "skincareProducts";
      location.hash = "skincare-products"
    },
    requestProduct: function(){
      this.page = "requestProduct";
      location.hash = "request-product"
    }
  }
}
</script>

<style>

</style>
