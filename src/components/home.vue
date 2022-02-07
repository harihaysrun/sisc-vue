<template>

    <div class="main-container">

      <div class="hero-banner">
        <div class="hero-text" id="test">
          Looking to...
          <h1 v-if="!heroText">give away unwanted samples?</h1>
          <h1 v-if="heroText === '1'">give away unwanted samples?</h1>
          <h1 v-if="heroText === '2'">sell off products you no longer use?</h1>
          <h1 v-if="heroText === '3'">request for samples of products you're interested in?</h1>
          <h1 v-if="heroText === '4'">contribute product reviews?</h1>

        </div>
      </div>

      <div class="container">

        <div class="second-container">
          <ProductsList page-title="Recently Added" max="4" display="none" margin-left="0" margin-top="0" margin-bottom="20px" width="100%" v-on:view-product="skincareProductsPage"/>
          <button class="view-all-btn" v-on:click="skincareProductsPage">View all</button>

        </div>

        <div class="second-container">
          <RequestsList page-title="Recent Requests" max="4" display="none" margin-bottom="20px" width="100%" v-on:view-product="requestsPage"/>
          <button class="view-all-btn" v-on:click="requestsPage">View all</button>
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
      'heroText': ''
    }
  },
  created: function(){

    // alternating hero text
    let heroTextNo = 0;

    setInterval(() => {
      heroTextNo++;
      this.heroText = JSON.stringify(heroTextNo);
      // console.log(heroTextNo)
      if (heroTextNo === 4){
        heroTextNo = 0;
      }
    }, 2000);

  },
  methods:{
    skincareProductsPage:function(productId){
      this.$emit("change-to", productId)
    },
    requestsPage:function(productId){
      this.$emit("change-to-request", productId)
    }

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
  width:100%;
  margin-top:35px;
  padding:35px;
  padding-top:30vw;
  text-align:center;
  box-sizing:border-box;
}

.container{
  padding:25px 0 50px 0;
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
    margin-top:10vh;
    max-width:550px;
    /* padding:0; */
    padding-top:10vh;
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
