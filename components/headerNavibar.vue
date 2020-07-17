<template>
  <header class="navbar is-primary topheader">
    <div class="navbar-brand">
        <span class="navbar-item material-icons" @click="togglebtn">
        {{menutext}}
      </span>
      <span class="navbar-item">
        <h1>能代地域振興券使用可能店舗マップ</h1>
      </span>
    </div>

    <div class="navbar-end">
  
       <bureadcrumb></bureadcrumb>
       
    </div>
  </header>
</template>
<style>
header.navbar.topheader {
  width:100%;
  z-index: 5000;
  padding-bottom:5px;
}
</style>
<script>
import bureadcrumb from '~/components/breadcrumb.vue' // コンポーネント読み込み
export default {
  components: {
bureadcrumb
  },
  methods: {
      togglebtn(){
           this.$nuxt.$emit("Closeinformation")
          this.$store.commit('menu/menutoggle')
      }
  },
  computed: {
      menutext(){
          if(this.$store.state.menu.menubtn){
            return "close"
          }else{
              return "menu"
          }
      },

  }
};
</script>
