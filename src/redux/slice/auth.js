import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

const user = Cookies.get('user')
const token = Cookies.get('token')

const initialState = {
    loading: false,
    user: user ? JSON.parse(user) : null,
    token: token,

}

const setUserCookie = ({ user, token }) => {

    const opts = { secure: true, sameSite: "Strict", path: "/", expires: 30 }

    Cookies.set('user', JSON.stringify(user), opts)
    Cookies.set('token', token, opts)
}

const removeUserCookie = () => {
    Cookies.remove('user')
    Cookies.remove('token')
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        loadingState(state, action) {
            state.loading = action.payload
        },

        setCurrentUser(state, action) {
            state.user = action.payload.user
            state.token = action.payload.token
        },

        removeCurrentUser(state, action) {
            state.user = null
            state.token = null
        },
    }

})

export const loginUser = (dataValues) => {
    return async (dispatch) => {
        dispatch(loadingState(true))

        try {
            const { data } = await axios.post('https://eti-sarver.vercel.app/api/v1/user/login', dataValues)
            const { user, token } = data

            dispatch(setCurrentUser({ user, token }))
            toast.success('User login successfuly', { duration: 2000 })


            dispatch(loadingState(false))
            setUserCookie({ user, token })

        } catch (error) {

            toast.error(error.response.data.msg)
            dispatch(loadingState(false))

        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {

        removeUserCookie()
        dispatch(removeCurrentUser())
    }
}

export const { loadingState, setCurrentUser, removeCurrentUser } = authSlice.actions
export default authSlice.reducer