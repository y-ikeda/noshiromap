<template>
  <header class="navbar is-fixed-top is-primary">
    <div class="navbar-brand">
        <span class="navbar-item material-icons" @click="togglebtn">
        {{menutext}}
      </span>
      <span class="navbar-item">
        <h1>能代地域振興券使用可能店舗マップ</h1>
      </span>
    </div>

    <div class="navbar-end">
      
    </div>
  </header>
</template>
<style>
header.navbar.is-fixed-top {
  z-index: 5000;
}
</style>
<script>
export default {
  methods: {
      togglebtn(){
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
      }
  }
};
</script>
