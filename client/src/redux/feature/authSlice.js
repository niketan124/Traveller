import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../Api';


export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signIn(formValue)
        toast.success("You have Login Successfully")
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const register = createAsyncThunk("auth/register", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signUp(formValue)
        toast.success("Registered Successfully")
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})


export const googleSignIn = createAsyncThunk("auth/googleSignIn", async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.googleSignIn(result)
        toast.success("Google Sign In Successfully")
        navigate('/')
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: '',
        loading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLogOut: (state, action) => {
            localStorage.clear()
            state.user = null
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [login.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [register.pending]: (state, action) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [register.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
        [googleSignIn.pending]: (state, action) => {
            state.loading = true
        },
        [googleSignIn.fulfilled]: (state, action) => {
            state.loading = false
            localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
            state.user = action.payload
        },
        [googleSignIn.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload.message
        },
    }
});


export const { setUser } = authSlice.actions
export const { setLogOut } = authSlice.actions
export default authSlice.reducer;
