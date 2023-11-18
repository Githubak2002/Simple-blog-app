import {createSlice,configureStore} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLogin:false
    },
    reducers:{
        login(state){
            state.isLogin = true
        },
        logout(state){
            state.isLogin = false
        }
    }
});

export const {login,logout} = authSlice.actions;

// export default authSlice.reducer;

export const store = configureStore({
    reducer:authSlice.reducer,
})

