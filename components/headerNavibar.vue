<template>
  <section class="header-navibar-under level has-background-light">
    <div class="level-left">
      <breadcrumb></breadcrumb>
 
    </div>
    <div class="level-right">
      <div class="level-item tabs">
        <ul>
          <li :class="activetab('mapview')">
            <a @click="changetab('mapview')">
              <span class="material-icons" 
                >maps </span
              >地図
            </a>
          </li>
          <li :class="activetab('shoplistview')">
            <a @click="changetab('shoplistview')">
              <span class="material-icons" 
                >store_mall_directory</span
              >店舗一覧</a
            >
          </li>
          <li :class="activetab('nearshopview')">
            <a @click="changetab('nearshopview')">
              <span class="material-icons" 
                >gps_fixed</span
              >近くのお店</a
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style>
.level.header-navibar-under {
  margin-bottom: 0;
}
</style>
<script>
import bureadcrumb from "~/components/breadcrumb.vue"; // コンポーネント読み込み

export default {
  components: {
    bureadcrumb,

  },
  methods: {
    activetab(tabname) {

      if (this.viewmode == tabname) {
        return "is-active"
      }
      return;
    },
    changetab(value) {
    
      this.$store.commit("menu/menuclose");
      this.$store.commit("view/changeview", value);
    }
  },
  computed: {
    menutext() {
      if (this.$store.state.menu.menubtn) {
        return "close";
      } else {
        return "menu";
      }
    },
    viewmode() {
      return this.$store.state.view.viewmode;
    }
  }
};
</script>
