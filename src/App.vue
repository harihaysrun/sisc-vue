<template>

  <div class="main-container">

    

      <nav>
        <div class="container">
          <a v-on:click="home">Home</a>
          <a v-on:click="skincareProducts">Skincare Products</a>
        </div>
      </nav>

      <section>
        <Home v-if="page === 'home'" />
        <SkincareProducts v-if="page === 'skincareProducts'" />
      </section>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home';
import SkincareProducts from '@/components/skincare-products'

export default {
  name: 'App',
  components: {
    Home, SkincareProducts
  },
  data: function(){
    return{
      'page': 'home'
    }
  },
  methods:{
    home: function(){
      this.page = "home"
    },
    skincareProducts: function(){
      this.page = "skincareProducts"
    }
  }
}
</script>

<style>

</style>
