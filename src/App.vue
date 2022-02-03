<template>

  <div class="main-container">
    
      <nav>
        <a id="hamburger-menu" v-on:click="openMenu" v-if="openHM === false">☰</a>
        <a id="hamburger-menu" v-on:click="closeMenu" v-if="openHM === true">×</a>

        <div class="container" v-if="openHM === true">
          <a v-on:click="home" v-if="page === 'home'" class="active" id="home">Home</a>
          <a v-on:click="home" v-else>Home</a>

          <a v-on:click="skincareProducts" v-if="page === 'skincareProducts'" class="active">Skincare Products</a>
          <a v-on:click="skincareProducts" v-else>Skincare Products</a>

          <a v-on:click="requestProducts" v-if="page === 'requestProducts'" class="active">Requests</a>
          <a v-on:click="requestProducts" v-else>Requests</a>

          <a v-on:click="reviewProducts" v-if="page === 'reviewProducts'" class="active">Review Board</a>
          <a v-on:click="reviewProducts" v-else>Review Board</a>

          <a v-on:click="addProduct" v-if="page === 'addProduct'" class="add-new-btn add-new-active">Add New</a>
          <a v-on:click="addProduct" v-else class="add-new-btn">Add New</a>
        </div>

      </nav>

      <Home v-if="page === 'home'" v-on:view-all="skincareProducts" v-on:view-requests="requestedProducts"/>
      <!-- <SkincareProducts v-if="page === 'skincareProducts'" products-tab="sellGive" request-tab="requests" v-bind:typeOfPage="pageViewing"/> -->
      <SkincareProducts v-if="page === 'skincareProducts'"/>
      <RequestProducts v-if="page === 'requestProducts'" />
      <ReviewBoard v-if="page === 'reviewProducts'"/>
      <AddProduct v-if="page === 'addProduct'" v-on:product-added="refreshAddPage"/>

      <footer>
        © Syahirah 2022
      </footer>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
import "@/assets/css/list.css";
import "@/assets/css/info-page.css";
import "@/assets/css/form.css";

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
      document.getElementsByTagName("nav").style = "height: 100vh"
    },
    closeMenu:function(){
      this.openHM = false;
    }
  }
}
</script>


<style>

/* .container{
  width:90%;
} */

nav .container{
  width:100%;
  height:calc(100vh - 75px) !important;
  /* background-color: lightcoral; */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
}

#hamburger-menu{
  color:black;
  background-color: transparent !important;
  padding:0 !important;
  font-size:35px;
  text-align:center;
  display:block;
  margin-left:auto;
}

nav{
  flex-direction: column;
  z-index:100;
}

nav a{
  font-size: 20px;
  color:black;
  text-decoration:none;
}

nav .container a{
  margin: 15px 0;
}

.active {
  color:mediumslateblue !important;
  font-weight:700;
}

.add-new-active{
  font-weight:700;
  background-color: mediumslateblue !important;
  color:white !important;
}

.add-new-btn{
  padding:10px 30px;
  background-color:white;
  color:black;
  border: 1px solid black;
}


footer{
  width:100%;
  background-color: black;
  color:white;
  box-sizing: border-box;
  padding: 50px 10% 50px 10%;
  text-align:center;
}

@media screen  and (min-width:768px){

  .container{
    width:80%;
  }

  nav .container{
    height:auto !important;
    width:80%;
    display:flex;
    align-items:center;
    flex-direction:row;
    justify-content: flex-start;
  }

  nav a{
    font-size: 16px;
    margin-right:20px;
    cursor:pointer;
  }

  nav .container a{
    margin:0;
    margin-right:20px;
  }

  nav a:hover{
    /* max-width:500px; */
    background-color:white;
    color: mediumslateblue;
    cursor:pointer;
    border-bottom:1px solid mediumslateblue;
  }


  .add-new-btn:hover{
    border:1px solid mediumslateblue;
  }

  .add-new-btn{
    margin-right:0 !important;
    margin-left:auto !important;
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
