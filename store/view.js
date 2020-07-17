export const state = () => ({
    viewmode:"mapview",
})
export const mutations = {
    changeview(state,value){
      state.viewmode= value
    },
}