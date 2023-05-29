import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import courseSlice from "./slice/course";
import studentSlice from "./slice/student";
import cipsSlice from "./slice/cips";




export default configureStore({
    reducer: {
        auth: authSlice,
        course: courseSlice,
        student: studentSlice,
        cips: cipsSlice
    }
})