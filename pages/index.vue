<template>
  <div class="container">
    <div class="inner_wrap is-flex">
      <mapview></mapview>
      <sidebar></sidebar>
    </div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import mapview from '~/components/mapview.vue' // コンポーネント読み込み
import sidebar from '~/components/sidebar.vue' // コンポーネント読み込み
export default {
    components: {
    mapview,
    sidebar
  },
  async fetch ({ app, params  }) {

    const response = await app.$axios.$get('https://script.google.com/macros/s/AKfycby04vOn0hqNRcJCb5K9k6rkWzAnCb5F6yKHit5LUH9q6bSYXtE/exec')
    app.store.commit('marker/setjsondata',response)


  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
