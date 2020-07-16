<template>
<div class="card" v-show="informationshow">
  <header class="card-header">
    <p class="card-header-title">
      {{informationdata.title}}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options" @click="close_information">
      <span class="material-icons">
        expand_more
      </span>
    </a>
  </header>
  <div class="card-content">
    <div class="content">
        <p class="categorytitle">{{informationdata.category}}/<span>{{informationdata.subcategory}}</span></p>
        <p class="info">
        住所:{{informationdata.address}}<br>
        TEL:{{informationdata.tel}}
        </p>
    </div>
  </div>

</div>
</template>
<style scoped>
.card {
    position:fixed;
    z-index:1000;
    height:200px;
    width:100%;
    max-width: 450px;
    bottom:0;
    right:0;
    /*
    width:350px;
    max-width: 100%;
    height:200px;
    bottom:20px;
    right: 20px;
*/
}

.info{
    font-size:90%;
}
</style>
<script>
export default {
  
  data() {
    return {
        informationshow:false,
        informationdata:{
            title:"",
            address:"",
            tel:"",
            category:"",
            subcategory:""
        }
    };
  },
  methods:{
      close_information(){
          this.informationshow = false;
      }
  },
  created() {
    this.$nuxt.$on("Setinformation", data => {
      this.informationshow = true
      console.log(data)
      this.informationdata.title       = data.name
      this.informationdata.category    = data.category
      this.informationdata.subcategory = data.subcategory
      this.informationdata.address     = data.address
      this.informationdata.tel         = data.tel
    })
    this.$nuxt.$on("Closeinformation", data => {
        this.close_information()
    })

  }
}
</script>