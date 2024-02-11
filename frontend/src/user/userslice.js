import { createSlice } from "@reduxjs/toolkit";
const initialState  = {
      user:null,
      loading:false,
      error:null
}
 const slice = createSlice({
      name:"user",
      initialState,
      reducers:{
             signprocess:(state)=>{
                   state.loading = true
             }   
 ,
             signsucess:(state , {payload})=>
             {
                     state.user = payload,
                     state.loading = false
          },
             signinerror :(state , {payload})=>{
                  state.loading = false
          state.error =   payload               
             },
             deleteuser:(state)=>{
                     state.user = null,
                     state.error = null
             },
             signout:(state)=>{
                  state.user = null,
                  state.error = null
          }
            }
})

export const { signinerror , signprocess , signsucess , deleteuser , signout}  = slice.actions;
export default slice.reducer