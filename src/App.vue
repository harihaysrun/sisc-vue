<template>

  <div class="main-container">
    
      <nav>

        <div class="logo-hm">
          <a class="logo-img" v-on:click="home">
            <img src="@/assets/images/logo2.png" alt="">
          </a>

          <a id="hamburger-menu" v-on:click="openMenu" v-if="openHM === false">
            <img src="@/assets/images/menu.png" alt="">
          </a>
          <a id="hamburger-menu" v-on:click="closeMenu" v-if="openHM === true">
            <img src="@/assets/images/close.png" alt="">
          </a>
        </div>
        
        <div class="container" v-if="openHM === true">
          <a class="logo-img" v-on:click="home" id="home">
            <img src="@/assets/images/logo2.png" alt="">
          </a>

          <a v-on:click="skincareProducts" v-if="page === 'skincareProducts'" class="active">Skincare Products</a>
          <a v-on:click="skincareProducts" v-else>Skincare Products</a>

          <a v-on:click="requestProducts" v-if="page === 'requestProducts'" class="active">Requests</a>
          <a v-on:click="requestProducts" v-else>Requests</a>

          <a v-on:click="reviewProducts" v-if="page === 'reviewProducts'" class="active">Reviews</a>
          <a v-on:click="reviewProducts" v-else>Reviews</a>

          <a v-on:click="addProduct" v-if="page === 'addProduct'" class="add-new-btn add-new-active">Add New</a>
          <a v-on:click="addProduct" v-else class="add-new-btn">Add New</a>
        </div>

      </nav>

      <Home v-if="page === 'home'" v-on:change-to="skincareProducts" v-on:change-to-request="requestProducts"/>
      <SkincareProducts v-if="page === 'skincareProducts'"/>
      <RequestProducts v-if="page === 'requestProducts'" />
      <ReviewBoard v-if="page === 'reviewProducts'"/>
      <AddProduct v-if="page === 'addProduct'"/>

      <footer>
        <div class="footer-logo">
          <img src="@/assets/images/logo2-white.png" alt="">
          Sharing is (Skin)caring
        </div>
        <div class="footer-icons">
          © Syahirah 2022
        </div>
      </footer>
    
  </div>
</template>

<script>

import "@/assets/css/style.css";
import "@/assets/css/list.css";
import "@/assets/css/info-page.css";
import "@/assets/css/form.css";
import "@/assets/css/request-review.css";

import Home from '@/components/home';
import SkincareProducts from '@/components/products-tab'
import RequestProducts from '@/components/request-tab'
import ReviewBoard from '@/components/review-tab'
import AddProduct from '@/components/add-or-request-product'

export default {
  name: 'App',
  components: {
    Home,
    SkincareProducts,
    RequestProducts,
    ReviewBoard,
    AddProduct
  },
  mounted: function(){
    document.title = "Sharing is (Skin)Caring"
  },
  data: function(){
    return{
      'page': 'home',
      'openHM': false
    }
  },
  created: function(){

    if (window.innerWidth >= 768){
      this.openHM = true;
    } else{
      this.openHM = false;
    }
    
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768){
        this.openHM = true
        this.mobileView = "";
      } else{
      this.openHM = false;
        this.mobileView = "Yes";
    }
    })
  },
  methods:{
    home: function(){
      this.page = "home"
    },
    skincareProducts: function(typeOfPage){
      this.page = "skincareProducts";
      this.pageViewing = typeOfPage
      window.scrollTo(0, 0);
    },
    requestProducts: function(){
      this.page = "requestProducts"
      window.scrollTo(0, 0);
    },
    reviewProducts: function(){
      this.page = "reviewProducts"
    },
    addProduct: function(){
      this.page = "addProduct"
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

nav .container{
  width:100%;
  height:calc(100vh - 61px) !important;
  /* background-color: lightcoral; */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
}

.logo-hm .logo-img{
  display:flex;
}

.container .logo-img{
  display:none;
}

#hamburger-menu{
  width:25px;
  height:25px;
  color:black;
  background-color: white !important;
  padding:0 !important;
  font-size:30px;
  line-height:25px;
  text-align:center;
  display:block;
  margin-left:auto;
}

#hamburger-menu img{
  width:80%;
  /* transform: scaleX(-1); */
}

#hamburger-menu:hover{
  opacity:0.3;
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

nav img{
  width:70px;
}

.logo-hm{
  width:100%;
  display:flex;
  align-items: center;
}

.logo-img:hover{
  border:0;
  opacity:0.3;
}

nav .container a{
  margin: 15px 0;
}

.active {
  color:mediumslateblue !important;
  font-weight:700;
  border-bottom:1px solid mediumslateblue;
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
  padding: 50px 20px 50px 20px;
  display:flex;
  flex-direction:column;
  font-size:13px;
  text-transform: uppercase;
  letter-spacing:1px;
}

.footer-logo, .footer-icons{
  text-align:center;
}

.footer-logo{
  margin-bottom:25px;
  display:flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo img{
  width:100px;
  margin-bottom:15px;
}

@media screen  and (min-width:768px){

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
    background-color:white;
    color: mediumslateblue;
    cursor:pointer;
    border-bottom:1px solid mediumslateblue;
  }

  .logo-hm .logo-img{
    display:none;
  }

  .container .logo-img{
    display:block;
  }

  .logo-img img{
    margin-right: 15px;
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

  footer{
    flex-direction:row;
    padding-left: 10%;
    padding-right: 10%;
  }

  .footer-logo, .footer-icons{
    display:flex;
    align-items: center;
    text-align:left;
  }

  .footer-logo{
    flex:1;
    margin-bottom:0;
    align-items: flex-start;
  }

  .footer-icons{
    flex:1;
    justify-content: flex-end;
  }


}

@media screen  and (min-width:1024px){

  nav .container{
    width:75%;
  }

  footer{
    flex-direction:row;
    padding-left: 15%;
    padding-right: 15%;
  }

}

</style>
