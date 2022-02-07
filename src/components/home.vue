<template>

    <div class="main-container">

      <div class="hero-banner">
        <div class="hero-text" id="test">
          Looking to...
          <h1 v-if="heroText === '1'">give away unwanted samples?</h1>
          <h1 v-if="heroText === '2'">sell off products you no longer use?</h1>
          <h1 v-if="heroText === '3'">request for samples of products you're interested in?</h1>
          <h1 v-if="heroText === '4'">contribute product reviews?</h1>
        </div>
      </div>

      <div class="container">

        <div class="second-container">
          <ProductsList page-title="Recently Added" max="4" display="none" margin-left="0" margin-top="0" margin-bottom="20px" width="100%" v-on:view-product="skincareProductsPage"/>
          <button class="view-all-btn" v-on:click="changetoSkincareProductsPage('sellGive')">View all</button>

        </div>

        <div class="second-container">
          <RequestsList page-title="Recent Requests" max="4" display="none" margin-bottom="20px" width="100%" v-on:view-product="requestsPage"/>
          <button class="view-all-btn" v-on:click="changetoRequestsPage('requests')">View all</button>
        </div>

      </div>

    </div>
    
</template>

<script>

import ProductsList from '@/components/products-list';
import RequestsList from '@/components/request-list';

export default {
  name: 'HelloWorld',
  components: {
    ProductsList, RequestsList
  },
  mounted: function(){
    document.title = "Sharing is (Skin)Caring"
  },
  data: function(){
    return{
      'heroText': '',
      'sizeIs': '',
    }
  },
  created: function(){

    setInterval(() => {
      this.heroText = "1"
    }, 2000)

    setInterval(() => {
      this.heroText = "2"
    }, 4000)

    setInterval(() => {
      this.heroText = "3"
    }, 6000)

    setInterval(() => {
      this.heroText = "4"
    }, 8000)

    if (window.innerWidth > 768){
      this.sizeIs = "tab"
    }
    
  },
  methods:{
    skincareProductsPage:function(productId){
      // console.log("productId: " + productId)
      console.log(productId)
      this.$emit("change-to", productId)
    },
    requestsPage:function(productId){
      // console.log("productId: " + productId)
      console.log(productId)
      this.$emit("change-to-request")
    },
    changetoSkincareProductsPage: function(typeOfPage){
      // this.pageType = "sellGive"
      console.log("click to view all")
      // productsTab = "sellGive"
      console.log('typeOfPage: ' + typeOfPage)
      this.$emit("view-all", typeOfPage);
    },
    changetoRequestsPage: function(typeOfPage){
      // let pageType = "requests";
      console.log("click to view requests")
      console.log('typeOfPage: ' + typeOfPage)
      this.$emit("view-requests", typeOfPage);
      // console.log("click to view requests " + pageType)
    },
    // viewProduct:function(productId){
    //   this.tab = "productInfo";
    //   // console.log(this.tab)
    //   this.productViewing = productId;
    //   console.log(this.productViewing)
    // }
  }
}
</script>

<style scoped>

.hero-banner{
  padding:0;
  height:calc(100vh - 62px) !important;
  /* background-color:pink; */
  background-image: url('https://images.pexels.com/photos/4202328/pexels-photo-4202328.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
  background-size: cover;
  background-position:bottom;
  display:flex;
  align-items: center;
  /* justify-content: center; */
  justify-content: flex-start;
}

.hero-text{
  padding:30vw 10% 0 10%;
  /* padding-top:10vw; */
  /* background-color:pink; */
  text-align:center;
  box-sizing:border-box;
  /* margin: 250px 5% 0 5%; */
}

.container{
  padding:25px 0 50px 0;
  /* padding-bottom:25px; */
  /* display:flex;
  flex-direction:column; */
  /* align-items:center; */
  /* background-color:pink; */
}

.second-container{
  padding:25px 0;
  display:flex;
  flex-direction: column;
 
}

.view-all-btn{
  width:100%;
  margin:auto;
}



@media screen  and (min-width:768px){
  
  .hero-banner{
    background-image: url('../assets/images/desktop.jpg');
    background-position:bottom !important;
  }

  .hero-text{
    max-width:550px;
    padding:0;
    padding-top:20vh;
  }

  .view-all-btn{
    width:150px;
    margin:auto;
  }

}

@media screen  and (min-width:1200px){

  .hero-banner{
    background-size: cover;
    background-position: 0 -70vw;
  }
}

</style>
