import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { isEmpty } from "lodash"
import { toast } from "react-hot-toast"


const initialState = {
    loading: false,
    courseList: [],
    deleteCheck: {},

    currentPage: 1,
    itemsPerPage: 10
}


export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {

        loadingState(state, action) {
            state.loading = action.payload
        },

        setAllCourse(state, action) {
            state.courseList = action.payload

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
            const filteredCourseList = state.courseList.filter((course) => !idArr.includes(course._id))
            state.courseList = filteredCourseList

        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },

        addCourse(state, action) {
            state.courseList = [...state.courseList, action.payload]
        },
        editCourse(state, action) {
            const updateIndex = state.courseList.findIndex(item => item._id === action.payload._id)

            state.courseList[updateIndex] = { ...action.payload }
        },

        updatePaginationOption(state, action) {
            // console.log(action.payload);
            state.itemsPerPage = action.payload
        }
    }

})

const actions = courseSlice.actions
export { actions as CourseActions }


export const addCourse = (dataValues) => {
    return async (dispatch) => {
        dispatch(loadingState(true))

        try {

            const { data } = await axios.post('https://eti-server.onrender.com/api/v1/course', dataValues)
            dispatch(actions.addCourse(data.course))
            console.log(data);
            dispatch(loadingState(false))
            toast.success('Course added successfully')


        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            toast.error('Error')
        }
    }
}

export const allCourse = () => {
    return async (dispatch) => {
        dispatch(loadingState(true))

        try {

            const { data: { course } } = await axios.get('https://eti-server.onrender.com/api/v1/course')

            dispatch(setAllCourse(course))
            dispatch(loadingState(false))
            // toast.success('Course added successfully')



        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            // toast.error('Error')
        }
    }
}

export const hideCourses = () => {
    return async (dispatch, getState) => {
        const state = getState()

        const deleteArr = Object.keys(state.course.deleteCheck)

        try {
            const { data: { message, hideCoursesIds } } = await axios.post('https://eti-server.onrender.com/api/v1/course/hide-courses', deleteArr)
            // console.log(message);
            // console.log(hideCoursesIds);


            dispatch(emptyDeleteCheck(hideCoursesIds))
            //     console.log(state.student.studentList);

        } catch (error) {

            console.log(error);
        }

    }
}

export const editCourse = (dataValues) => {
    return async (dispatch) => {

        // console.log(dataValues);

        const formDataArray = Array.from(dataValues.entries());
        const id = formDataArray[1][1]

        // console.log(formDataArray);

        dispatch(loadingState(true))
        try {

            const { data } = await axios.patch(`https://eti-server.onrender.com/api/v1/course/edit-course/${id}`, dataValues)

            // console.log(data);
            dispatch(actions.editCourse(data.updatedCourse))


            toast.success(`Course Updated successfully id: ${id}`)
            dispatch(loadingState(false))

        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            toast.error(error.response.data.msg)

        }
    }
}


export const { loadingState, setAllCourse, emptyDeleteCheck,updatePaginationOption, oneDeleteCheck, bulkDeleteCheck, getUpdateCourse, setCurrentPage } = courseSlice.actions
export default courseSlice.reducer