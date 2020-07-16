<template>
  <div class="main_wrap">
    <headernav></headernav>
    <main class="inner_wrap is-flex">
      <sidebar></sidebar>
      <mapview></mapview>

    </main>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import headernav from '~/components/headerNavibar.vue' // コンポーネント読み込み
import mapview from '~/components/mapview.vue' // コンポーネント読み込み
import sidebar from '~/components/sidebar.vue' // コンポーネント読み込み
export default {
    components: {
    mapview,
    sidebar,
    headernav
  },
  async fetch ({ app, params  }) {

    const response = await app.$axios.$get('https://script.google.com/macros/s/AKfycby04vOn0hqNRcJCb5K9k6rkWzAnCb5F6yKHit5LUH9q6bSYXtE/exec')
    app.store.commit('marker/setjsondata',response)


  }
}
</script>

<style>
.main_wrap {
  margin: 0 auto;
  height:calc(100vh - 3.25rem);
  display: flex;

}
.inner_wrap{
  width:100%
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
