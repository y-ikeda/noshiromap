export const state = () => ({
    menubtn:false,
})
export const mutations = {
    menutoggle(state){
      state.menubtn = !state.menubtn
    },
    menuclose(state){
      state.menubtn = false
    }
}