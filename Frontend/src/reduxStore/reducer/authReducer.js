import {createSlice } from '@reduxjs/toolkit';

export const authSlice=createSlice({
    name:'user',
    initialState:{
        isLog:false,
        user:{}
    },
    reducers:{
        login:(state, action)=>{
            state.isLog=action.payload.isLog;
            state.user=action.payload.user;
        },
        logout:(state)=>{
            state.isLog=false;
            state.user={};
        },
        setUser:(state,action)=>{
            state.user=action.payload.user;
        }
    }
})

export const{login, logout,setUser}= authSlice.actions;
export default authSlice.reducer;
