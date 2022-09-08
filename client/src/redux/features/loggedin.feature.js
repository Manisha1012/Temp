import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLogdedin : false
}

let loggedinSlice = createSlice({
    name : 'isLogdedin',
    initialState : initialState,
    reducers : {
        login : function (state , action){
            state.isLogdedin = true
        }
    }
});
export const {login} = loggedinSlice.actions;
export default loggedinSlice.reducer;
