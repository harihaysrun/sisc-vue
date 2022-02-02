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
          <ProductsList page-title="Recently Added" max="4" display="none" margin-left="0"/>
          <a class="view-all-btn" v-on:click="changetoSkincareProductsPage('sellGive')">View all</a>
        </div>

        <div class="second-container">
          <RequestsList page-title="Recent Requests" max="4" display="none" width="100%"/>
          <a class="view-all-btn" v-on:click="changetoRequestsPage('requests')">View all</a>
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
  data: function(){
    return{
      'heroText': '',
      'sizeIs': ''
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
  background-image: url('https://images.pexels.com/photos/4202326/pexels-photo-4202326.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260');
  background-size: cover;
  background-position:bottom;
  justify-content: flex-start;
}

.hero-text{
  /* padding-top:10vw; */
  /* background-color:pink; */
  text-align:center;
  box-sizing:border-box;
  margin: 250px 5% 0 5%;
}

.container{
  padding-top:25px;
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
  /* margin: 50px 0; */
  margin:35px auto;
  color:white;
  background-color: rgb(0, 0, 175);
  padding:10px 20px;
  border-radius:10px;
}

.view-all-btn:hover{
  cursor:pointer;
  background-color:mistyrose;
}


@media screen  and (min-width:768px){

  .hero-text{
    max-width:550px;
    margin: 0 5% 0 5%;
    /* padding: 10vw 0 0 0; */
  }

}

@media screen  and (min-width:1200px){

  .hero-banner{
    background-size: cover;
    background-position: 0 -70vw;
  }
}

</style>
