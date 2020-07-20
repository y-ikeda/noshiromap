export const state = () => ({

  lat: 0,
  lng: 0,

})
export const mutations = {

  setpos(state, value) {
    state.lat = value.lat
    state.lng = value.lng
  }
}
