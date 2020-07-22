<template>
  <div class="main_wrap" :class="viewmode">
    <headertitle></headertitle>
    <headernav></headernav>
    <main class="inner_wrap is-flex">
      <sidebar></sidebar>
      <mapview v-show="viewmode == 'mapview'"></mapview>
      <shoplistview v-show="viewmode == 'shoplistview'"></shoplistview>
      <nearshopview v-show="viewmode == 'nearshopview'"></nearshopview>
    </main>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import headertitle  from '~/components/headertitle.vue' // コンポーネント読み込み
import headernav    from '~/components/headerNavibar.vue' // コンポーネント読み込み
import mapview      from '~/components/mapview.vue' // コンポーネント読み込み
import shoplistview from '~/components/shoplistview.vue' // コンポーネント読み込み
import sidebar      from '~/components/sidebar.vue' // コンポーネント読み込み
import nearshopview from '~/components/nearshopview.vue' // コンポーネント読み込み
export default {
    components: {
    mapview,
    sidebar,
    headertitle,
    headernav,
    shoplistview,
    nearshopview
  },
  computed:{
    viewmode(){return this.$store.state.view.viewmode;}
  },
  async fetch ({ app, params  }) {

    const response = await app.$axios.$get('https://script.google.com/macros/s/AKfycby04vOn0hqNRcJCb5K9k6rkWzAnCb5F6yKHit5LUH9q6bSYXtE/exec')
    app.store.commit('marker/setjsondata',response)


  },
  mounted(){
 
      
  },
  created(){

  },
  beforeMount(){
       let height=window.innerHeight;
        document.documentElement.style.setProperty( '--vh', height/100 + 'px');
   
  }

}
</script>

<style>
.main_wrap {
  margin: 0 auto;
  height:100vh;
  height:calc( var(--vh) * 100 );
  display: flex;
  flex-flow:column nowrap;

}
.inner_wrap{
  position:relative;
  width:100%;
  height: 100%;
  flex-flow:column nowrap;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
