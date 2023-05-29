import React, { useEffect } from 'react'
import Alert from '../../components/Alert'
import ExamDetailForm from '../../sections/cips/ExamDetailForm'
import CipsStudentForm from '../../sections/cips/CipsStudentForm'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCipsStudent, editCipsStudent, setCurrentPage, updateCipsStudent } from '../../redux/slice/cips'
import { useNavigate, useParams } from 'react-router-dom'

const AddCipsStudent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading, getUpdateCipsStudnetObj, cipsStudentList, itemsPerPage } = useSelector((state) => state.cips)


    const methods = useForm({

        defaultValues: {
            name: "", membership: "", email: "", password: "", dateOfJoin: "", expairyDate: "", courseTitle: "", idNo: "", gender: "", dOfBirth: "", sponser: "", sponserEmail: "", group: "", fees: "",
            examDetail: [{ module: '', moduleExamDateFrom: 0, moduleExamDateTo: 0, result: "", remarks: "" }]
        }
    })


    const onCipsStudnetsSubmit = (data) => {


        // Adding pagination redirect
        const hideFilteredCourseList = cipsStudentList.filter(item => !item.hideCipsStudent)
        const totalPages = Math.ceil(hideFilteredCourseList.length / itemsPerPage);

        const currentPageAfterAdded = hideFilteredCourseList.length % itemsPerPage === 0 ? totalPages + 1 : totalPages

        // updating pagination redirect
        const afterEditRedirect = hideFilteredCourseList.findIndex((student) => student._id === id)
        const currentPageAfterEdit = Math.ceil((afterEditRedirect + 1) / itemsPerPage);

        // console.log(afterEditRedirectPlusOne);
        // console.log(currentPageAfterEdit);

        if (isEditMode) {

            dispatch(editCipsStudent({ ...data, id }))

            setTimeout(() => {

                dispatch(setCurrentPage(currentPageAfterEdit))
                navigate('/cips-students')
            }, 1000);

        } else {

            dispatch(addCipsStudent(data))

            setTimeout(() => {

                dispatch(setCurrentPage(currentPageAfterAdded))
                navigate('/cips-students')
            }, 1000);
        }

        // console.log(data);
    }

    // EDITING

    const { id } = useParams();
    const isEditMode = Boolean(id);

    useEffect(() => {

        if (isEditMode) {
            dispatch(updateCipsStudent(id))
        }

    }, [isEditMode, id])



    const { __v, _id, updatedAt, createdAt, ...rest } = getUpdateCipsStudnetObj

    useEffect(() => {


        // console.log(rest);

        if (isEditMode) {
            methods.reset(rest)
        }

    }, [getUpdateCipsStudnetObj])



    return (
        <>
            <Alert />

            <div className="page__inner">
                <form className="page__container" onSubmit={methods.handleSubmit(onCipsStudnetsSubmit)}>
                    <div className="page__title h3">Add Student</div>

                    <FormProvider {...methods}>

                        <CipsStudentForm />

                        <div className="card">
                            <div className="card__head">
                                <div className="title-purple card__title">Overview</div>
                            </div>

                            <ExamDetailForm />

                        </div>
                    </FormProvider>

                    <div className='cips panels__btns'>

                        <button className='button header__button cips' style={{ alignSelf: "flex-start" }} type='submit' disabled={loading} >
                            {loading ? "Loading..." : `${isEditMode ? "Save" : "Submit"}`}
                        </button>
                    </div>


                </form>
            </div>

        </>
    )
}

export default AddCipsStudent