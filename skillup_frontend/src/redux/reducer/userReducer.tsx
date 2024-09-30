import {PayloadAction, createSlice } from "@reduxjs/toolkit";
import {UserReducerInitialState} from "../../types/reducer-types";
import { USer } from "../../types/types";

    
  const initialState : UserReducerInitialState ={
     user:null,
     loading:false
  }

 
   export const userSlice = createSlice({
   name:"userReducer",
   initialState,
   reducers:{
    userExit:(state:any,action:PayloadAction<USer>)=>{
      state.loading = false ;
      state.user = action.payload;
    },
    userNotExit:(state)=>{
      state.loading = false ;
      state.user = null;
    }
   }

});

export const {userExit,userNotExit} = userSlice.actions;
export default userSlice.reducer;
