<template>

  <div class="main-container">
    
      <nav>
        <button id="hamburger-menu" v-on:click="openMenu" v-if="openHM === false">🍔</button>
        <button id="hamburger-menu" v-on:click="closeMenu" v-if="openHM === true">🍔</button>

        <div class="container" v-if="openHM === true">
          <a v-on:click="home" v-if="page === 'home'" style="background-color:black" id="home">Home</a>
          <a v-on:click="home" v-else>Home</a>

          <a v-on:click="skincareProducts" v-if="page === 'skincareProducts'" style="background-color:black">Skincare Products</a>
          <a v-on:click="skincareProducts" v-else>Skincare Products</a>

          <a v-on:click="reviewProducts" v-if="page === 'reviewProducts'" style="background-color:black">Review Board</a>
          <a v-on:click="reviewProducts" v-else>Review Board</a>

          <a v-on:click="requestProducts" v-if="page === 'requestProducts'" style="background-color:black">Requests</a>
          <a v-on:click="requestProducts" v-else>Requests</a>

          <a v-on:click="addProduct" v-if="page === 'addProduct'" style="background-color:black" class="add-new-btn">Add New</a>
          <a v-on:click="addProduct" v-else class="add-new-btn">Add New</a>
        </div>

      </nav>

      <!-- <section> -->
        <Home v-if="page === 'home'" v-on:view-all="skincareProducts" v-on:view-requests="requestedProducts"/>
        <!-- <SkincareProducts v-if="page === 'skincareProducts'" products-tab="sellGive" request-tab="requests" v-bind:typeOfPage="pageViewing"/> -->
        <SkincareProducts v-if="page === 'skincareProducts'"/>
        <ReviewBoard v-if="page === 'reviewProducts'"/>
        <RequestProducts v-if="page === 'requestProducts'" />
        <AddProduct v-if="page === 'addProduct'" v-on:product-added="refreshAddPage"/>
      <!-- </section> -->

      <footer>
        Hi
        <br>
        ok
        <br>
        ok
        <br>
        ok
        <br>
        ok
        <br>
        ok
        <br>
        ok
        <br>
        ok
      </footer>
    
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
      'pageType': '',
      'openHM': false
    }
  },
  created: function(){

    if (window.innerWidth > 768){
      this.openHM = true;
    } else{
      this.openHM = false;
    }
    
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768){
        this.openHM = true
      } else{
      this.openHM = false;
    }
    })
  },
  methods:{
    home: function(){
      this.page = "home"
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
    openMenu: function(){
      this.openHM = true;
    },
    closeMenu:function(){
      this.openHM = false;
    }
  }
}
</script>

<style>

a{
  color:black;
}

a:hover, li:hover{
  background-color:transparent;
  color:black;
  cursor:default;
}

nav .container{
  width:100%;
  height:100vh !important;
  /* background-color: lightcoral; */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
}

#hamburger-menu{
  display:block;
}

nav{
  flex-direction: column;
}

nav a{
    color:thistle;
    text-decoration:none;
}

nav a:hover{
    /* max-width:500px; */
    color:white;
    background-color: mistyrose;
    cursor:pointer;
}

.add-new-btn{
  /* margin:0 0 0 auto; */
  /* margin-left:auto; */
  background-color: rgb(0, 0, 175);
  padding:10px 20px;
  border-radius:10px;
}

footer{
  width:100%;
  background-color: black;
  color:white;
  box-sizing: border-box;
  padding: 50px 10% 50px 10%;
}

@media screen  and (min-width:768px){

  nav .container{
    height:auto !important;
    width:80%;
    display:flex;
    align-items:center;
    flex-direction:row;
  }

  .add-new-btn{
    margin:0 0 0 auto;
  }

  #hamburger-menu{
    display:none;
  }

  .hero-banner{
    background-size: cover;
    background-position: 0 -70vw;
  }

  .hero-text{
    max-width:550px;
    padding: 10vw 0 0 0;
  }
}

</style>
