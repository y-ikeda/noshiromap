export const state = () => ({
    menubtn:false,
})
export const mutations = {
    menutoggle(state){
      state.menubtn= !state.menubtn
    },
}