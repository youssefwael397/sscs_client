import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NotifyMessage } from "../../components/Messages";
import axiosInstance from "../../lib/axiosInstancs"

export const getWarnings = createAsyncThunk(
    "warnings",
    async (args, { rejectWithValue }) => {
        try {
            console.log('register thunk')
            const url = "/api/warnings";
            const res = await axiosInstance.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


export const getWarning = createAsyncThunk(
    "warning",
    async (id, { rejectWithValue }) => {
        try {
            console.log('register thunk')
            const url = `/api/user_warnings/users/${id}`;
            const res = await axiosInstance.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);



export const extractFaces = createAsyncThunk(
    "warning/extract",
    async (id, { rejectWithValue }) => {
        try {
            console.log('register thunk')
            const url = `/api/warnings/extract/${id}`;
            const res = await axiosInstance.get(url);
            return res.data;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

const initialState = {
    is_loading: false,
    is_success: false,
    api_errors: null,
    warnings: [],
    warning: {},
    user_warnings : []
}

export const warningSlice = createSlice({
    name: 'warning',
    initialState,
    reducers: {
        ResetSuccess(state) {
            state.success = null;
        },
    },
    extraReducers: {
        // get warnings
        [getWarnings.pending]: (state, { payload }) => {
            state.is_loading = true;
            state.api_errors = null;
            state.warnings = [];
        },
        [getWarnings.fulfilled]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = true;
            state.api_errors = null;
            state.warnings = payload.warnings;
        },
        [getWarnings.rejected]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = false;
        },
        // get warning
        [getWarning.pending]: (state, { payload }) => {
            state.is_loading = true;
            state.api_errors = null;

        },
        [getWarning.fulfilled]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = true;
            state.api_errors = null;
            state.warning = payload;
            console.log(payload);
        },
        [getWarning.rejected]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = false;
            state.api_errors = payload?.response?.data?.message;
        },
        // get extracted faces
        [extractFaces.pending]: (state, { payload }) => {
            state.is_loading = true;
        },
        [extractFaces.fulfilled]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = true;
            state.api_errors = [];
            state.user_warnings = payload.data;
            console.log(payload);
        },
        [extractFaces.rejected]: (state, { payload }) => {
            state.is_loading = false;
            state.is_success = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const { ResetSuccess } = warningSlice.actions;

export default warningSlice.reducer