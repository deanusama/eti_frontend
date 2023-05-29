import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { isEmpty } from "lodash"
import { toast } from "react-hot-toast"



const initialState = {
    loading: false,
    courseID: "",
    studentID: "",
    getUpdateStudentObj: {},
    studentList: [],
    studentInvoicesList: [],
    studentDeleteCheck: {},


    currentPage: 1,
    itemsPerPage: 10,

    currentInvoicePage: 1,
    invoiceItemPerPage: 3
}


export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {

        loadingState(state, action) {
            state.loading = action.payload
        },

        getCourseID(state, action) {
            state.courseID = action.payload

        },

        addStudent(state, action) {
            state.studentList = [...state.studentList, action.payload]
            state.studentInvoicesList = [...state.studentInvoicesList, action.payload]
        },

        editStudents(state, action) {
            const updateIndex = state.studentList.findIndex(item => item._id === action.payload._id)
            state.studentList[updateIndex] = { ...action.payload }
        },

        setAllStudent(state, action) {
            state.studentList = action.payload
        },
        setAllStudentInvoices(state, action) {
            state.studentInvoicesList = action.payload
        },

        oneDeleteCheckStudent(state, action) {

            if (!action.payload.inputValue) {

                const mcExist = state.studentDeleteCheck[action.payload.id]
                if (mcExist) delete state.studentDeleteCheck[action.payload.id]
                return
            }

            state.studentDeleteCheck = { ...state.studentDeleteCheck, [action.payload.id]: action.payload.inputValue }
        },

        BulkDeleteCheckStudent(state, action) {


            let newDeleteChecksObj = {}

            if (!isEmpty(action.payload)) {
                Object.entries(action.payload).forEach(([id, value], i) => {

                    if (!value) {
                        const mcExist = state.studentDeleteCheck[id]
                        if (mcExist) delete state.studentDeleteCheck[id]
                    } else {
                        newDeleteChecksObj = action.payload
                    }

                })
            }

            state.studentDeleteCheck = newDeleteChecksObj
        },

        emptyStudentDeleteCheck(state, action) {
            state.studentDeleteCheck = {}

            // action.payload
            const idArr = action.payload
            const filteredStudentList = state.studentList.filter((student) => !idArr.includes(student._id))
            state.studentList = filteredStudentList
        },

        getUpdateStudent(state, action) {
            state.getUpdateStudentObj = action.payload
        },

        getStudentID(state, action) {
            state.studentID = action.payload
        },

        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setInvoiceCurrentPage(state, action) {
            state.currentInvoicePage = action.payload
        },

        editInvoice(state, action) {
            const updatedInvoice = state.studentInvoicesList.findIndex((item) => item._id === action.payload._id)
            state.studentInvoicesList[updatedInvoice] = { ...action.payload }
        }

    }


})

const actions = studentSlice.actions
export { actions as StudentActions }

export const addStudent = (dataValues) => {
    return async (dispatch) => {

        dispatch(loadingState(true))

        try {
            const { data } = await axios.post('https://eti-sarver.vercel.app/api/v1/student', dataValues)
            dispatch(actions.addStudent(data.student))
            dispatch(loadingState(false))
            toast.success('Student added successfully')

        } catch (error) {
            dispatch(loadingState(false))

            toast.error('ERROR!!!')
            console.log(error);
        }
    }
}

export const updateStudent = (idValue) => {
    return async (dispatch, getState) => {
        const state = getState()


        // console.log(state.studentID);
        try {

            const { data: { student } } = await axios.get(`https://eti-sarver.vercel.app/api/v1/student/${idValue}`)

            dispatch(getUpdateStudent(student))

        } catch (error) {
            console.log(error);
        }
    }
}

export const updateStudentInvoice = (idValue) => {
    return async (dispatch) => {

        try {

            const { data } = await axios.patch(`https://eti-sarver.vercel.app/api/v1/student/edit-invoice/${idValue}`)
            // dispatch(getUpdateStudent(student))
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }
}

export const allStudent = () => {
    return async (dispatch) => {
        dispatch(loadingState(true))

        try {
            const { data: { students } } = await axios.get('https://eti-sarver.vercel.app/api/v1/student')

            dispatch(setAllStudent(students))
            dispatch(loadingState(false))
        } catch (error) {
            dispatch(loadingState(false))
            console.log(data);
        }
    }
}

export const editStudent = (dataValues) => {
    return async (dispatch) => {

        dispatch(loadingState(true))
        try {

            const { data } = await axios.patch(`https://eti-sarver.vercel.app/api/v1/student/edit-student/${dataValues.id}`, dataValues)

            console.log(data, 'updatedBacking');
            // toast.success(`Course Updated successfully id: ${id}`)
            dispatch(actions.editStudents(data.updatedStudent))
            dispatch(loadingState(false))

        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            // toast.error(error.response.data.msg)

        }
    }
}

export const hideStudents = () => {
    return async (dispatch, getState) => {
        const state = getState()

        const deleteArr = Object.keys(state.student.studentDeleteCheck)

        try {
            const { data: { hideStudentIds } } = await axios.post('https://eti-sarver.vercel.app/api/v1/student/hide-students', deleteArr)


            dispatch(emptyStudentDeleteCheck(hideStudentIds))


        } catch (error) {

            console.log(error);
        }
    }
}

export const getStudentsInvoices = () => {
    return async (dispatch) => {
        try {
            const { data: { studentInvoices } } = await axios.get('https://eti-sarver.vercel.app/api/v1/student/student-invoices')

            console.log(studentInvoices);
            dispatch(actions.setAllStudentInvoices(studentInvoices))


        } catch (error) {

            console.log(error);
        }
    }
}


export const editStudentInvoice = (dataValues) => {
    return async (dispatch) => {

        console.log(dataValues);

        dispatch(loadingState(true))
        try {

            const { data } = await axios.patch(`https://eti-sarver.vercel.app/api/v1/student/edit-invoice/${dataValues._id}`, dataValues)

            console.log(data, 'updatedBacking');
            // toast.success(`Course Updated successfully id: ${id}`)
            dispatch(actions.editInvoice(data.updatedInvoice))
            dispatch(loadingState(false))

        } catch (error) {
            console.log(error);
            dispatch(loadingState(false))
            // toast.error(error.response.data.msg)

        }
    }
}


export const { getCourseID, setCurrentPage, loadingState, getStudentID, setInvoiceCurrentPage, setAllStudent, oneDeleteCheckStudent, getUpdateStudent, BulkDeleteCheckStudent, emptyStudentDeleteCheck } = studentSlice.actions
export default studentSlice.reducer