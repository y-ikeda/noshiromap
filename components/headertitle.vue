<template>
  <header class="navbar is-link topheader"  id="top">
    <div class="navbar-brand">
      <span class="navbar-item material-icons" @click="togglebtn">
        {{ menutext }}
      </span>
      <span class="navbar-item">
        <h1>能代地域振興券使用可能店舗マップ</h1>
      </span>
    </div>
  </header>
</template>
<style>
    header.navbar.topheader {
    width: 100%;
    padding-bottom: 5px;
    }
    .mapview header.navbar.topheader {
    z-index: 5000;
 
    }
</style>
</style>
<script>
export default {
  methods: {
    togglebtn() {
      this.$nuxt.$emit("Closeinformation");
      this.$store.commit("menu/menutoggle");
    }
  },
  computed: {
    menutext() {
      if (this.$store.state.menu.menubtn) {
        return "close";
      } else {
        return "menu";
      }
    }
  }
};
</script>