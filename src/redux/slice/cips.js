import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { isEmpty } from "lodash"
import { toast } from "react-hot-toast"





const initialState = {
    loading: false,
    cipsStudentList: [],
    deleteCheck: {},
    getUpdateCipsStudnetObj: {},


    currentPage: 1,
    itemsPerPage: 10
}


export const cipsSlice = createSlice({
    name: 'cips',
    initialState,
    reducers: {

        loadingState(state, action) {
            state.loading = action.payload
        },

        setAllCipsStudent(state, action) {
            state.cipsStudentList = action.payload
        },

        oneDeleteCheck(state, action) {

            if (!action.payload.inputValue) {

                const mcExist = state.deleteCheck[action.payload.id]
                if (mcExist) delete state.deleteCheck[action.payload.id]
                return
            }

            state.deleteCheck = { ...state.deleteCheck, [action.payload.id]: action.payload.inputValue }


        },

        bulkDeleteCheck(state, action) {


            let newDeleteChecksObj = {}

            if (!isEmpty(action.payload)) {
                Object.entries(action.payload).forEach(([id, value], i) => {

                    if (!value) {
                        const mcExist = state.deleteCheck[id]
                        if (mcExist) delete state.deleteCheck[id]
                    } else {
                        newDeleteChecksObj = action.payload
                    }

                })
            }


            state.deleteCheck = newDeleteChecksObj

        },

        emptyDeleteCheck(state, action) {
            state.deleteCheck = {}

            // action.payload
            const idArr = action.payload
            const filteredCourseList = state.cipsStudentList.filter((student) => !idArr.includes(student._id))
            state.cipsStudentList = filteredCourseList

        },
        getUpdateCipsStudent(state, action) {
            state.getUpdateCipsStudnetObj = action.payload

        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

        updatePaginationOption(state, action) {
            state.itemsPerPage = action.payload
        },

        addCipsStudent(state, action) {
            state.cipsStudentList = [...state.cipsStudentList, action.payload]
        },

        editCipsStudent(state, action) {
            const updateIndex = state.cipsStudentList.findIndex((student) => student._id === action.payload._id)

            console.log(updateIndex);
            state.cipsStudentList[updateIndex] = { ...action.payload }
        }

    }

})

const actions = cipsSlice.actions
export { actions as CipsActions }


export const addCipsStudent = (dataValues) => {
    return async (dispatch) => {

        // console.log(dataValues);
        dispatch(loadingState(true))


        try {

            const { data } = await axios.post(`https://eti-server.onrender.com/api/v1/cips`, dataValues)
            dispatch(actions.addCipsStudent(data.cipsStudent))
            toast.success(`Cips student created successfully`)
            dispatch(loadingState(false))

        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            toast.error(error.response.data.msg)
        }


    }
}



export const allCipsStudent = () => {
    return async (dispatch) => {

        dispatch(loadingState(true))
        try {
            const { data: { cipsStudent } } = await axios.get('https://eti-server.onrender.com/api/v1/cips')
            dispatch(setAllCipsStudent(cipsStudent))
            
            dispatch(loadingState(false))
            // console.log(cipsStudent);
            
            
        } catch (error) {
            dispatch(loadingState(false))
            console.log(error);
        }

    }
}

export const hideCipsStudent = () => {
    return async (dispatch, getState) => {
        const state = getState()

        console.log('hide code!!!');

        const deleteArr = Object.keys(state.cips.deleteCheck)

        try {
            const { data: { message, hideCipsStudentIds } } = await axios.post('https://eti-server.onrender.com/api/v1/cips/hide-cipsStudent', deleteArr)
            console.log(message);
            console.log(hideCipsStudentIds);


            dispatch(emptyDeleteCheck(hideCipsStudentIds))
            //     console.log(state.student.studentList);

        } catch (error) {
            console.log(error);
        }

    }
}


export const updateCipsStudent = (dataValues) => {
    return async (dispatch) => {


        try {

            const { data: { cipsStudent } } = await axios.get(`https://eti-server.onrender.com/api/v1/cips/${dataValues}`)
            dispatch(getUpdateCipsStudent(cipsStudent))

        } catch (error) {
            console.log(error);

        }

    }
}


export const editCipsStudent = (dataValues) => {
    return async (dispatch) => {


        dispatch(loadingState(true))
        try {

            const { data } = await axios.patch(`https://eti-server.onrender.com/api/v1/cips/edit-cips-student/${dataValues.id}`, dataValues)

            dispatch(actions.editCipsStudent(data.updatedCipsStudent))
            toast.success(`Cips Student Updated successfully id: ${dataValues.id}`)
            dispatch(loadingState(false))

        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            toast.error(error.response.data.msg)

        }
    }
}

export const { loadingState, setAllCipsStudent, bulkDeleteCheck, updatePaginationOption, emptyDeleteCheck, oneDeleteCheck, getUpdateCipsStudent, setCurrentPage } = cipsSlice.actions
export default cipsSlice.reducer