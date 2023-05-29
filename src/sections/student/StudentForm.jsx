import React, { useEffect, useMemo, useState } from 'react'
import FormRow from '../../components/FormRow'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent, editStudent, setCurrentPage, updateStudent } from '../../redux/slice/student'
import { allCourse } from '../../redux/slice/course'
import { useMatch, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie'






const StudentForm = () => {
    const courseId = Cookies.get('courseId')

    // console.log(courseID);
    const [contractualActive, setContractualActive] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, studentList, currentPage, itemsPerPage } = useSelector(state => state.student)
    const { courseList } = useSelector(state => state.course)

    // EDITING

    const { id } = useParams();
    const isEditMode = Boolean(id);

    console.log(isEditMode);

    const updateStudent = useMemo(() => studentList.find(student => student._id === id), [studentList, id])
    console.log(updateStudent);


    const initialValues = useMemo(() => {

        if (isEditMode && updateStudent) {
            return updateStudent

        } else {
            return {
                studentNo: "",
                studentNameA: "",
                studentNameE: "",
                iDNo: "",
                gender: "",
                mobile: "",
                email: "",
                sponser: "",
                fees: "",
            }
        }
    }, [isEditMode, updateStudent])


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        // resolver: yupResolver(registerSchema)
    })

    const onStudentSubmit = async (data) => {

        // dispatch(loginUser(data))

        const hideFilteredCourseList = studentList.filter(item => !item.hideStudent && item.courseId === courseId)
        const totalPages = Math.ceil(hideFilteredCourseList.length / itemsPerPage);

        const currentPageAfterAdded = hideFilteredCourseList.length % itemsPerPage === 0 ? totalPages + 1 : totalPages


        const afterEditRedirect = hideFilteredCourseList.findIndex((student) => student._id === id)
        const currentPageAfterEdit = Math.ceil((afterEditRedirect + 1) / itemsPerPage);

        if (isEditMode) {

            dispatch(editStudent({ ...data, id }))

            setTimeout(() => {
                dispatch(setCurrentPage(currentPageAfterEdit))
                navigate(-1)
            }, 1000);


        } else {

            const finalSend = { ...data, courseId }
            await dispatch(addStudent(finalSend))
            await dispatch(setCurrentPage(currentPageAfterAdded))

            navigate(`/students/${courseId}`)
        }

        // Cookies.remove('courseId')

    }

    useEffect(() => {
        const result = courseList.find((item) => item._id === courseId)

        if (result?.sponser === "public") {
            setContractualActive(true)
        } else {
            setContractualActive(false)
        }

    }, [courseId, courseList])



    return (
        <form className="create__card card" onSubmit={handleSubmit(onStudentSubmit)}>

            <div className="card__head">
                <div className="title-green card__title">Name &amp; description</div>

            </div>

            <div className="field">

                <FormRow type="text" name="studentNo" placeholder="Student No" register={register} errors={errors} />

                <div className='create__group' style={{ marginTop: "12px" }}>

                    <div className="field">
                        <FormRow type="text" name="studentNameA" placeholder="student Name A" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="studentNameE" placeholder="student Name E" register={register} errors={errors} />

                    </div>
                </div>

                <div className='two__fields'>

                    <FormRow type="text" name="iDNo" placeholder="ID-No" register={register} errors={errors} />
                    <FormRow type="text" name="gender" placeholder="Gender" register={register} errors={errors} />
                </div>

                <div className='create__group' style={{ marginTop: "12px" }}>

                    <div className="field">
                        <FormRow type="text" name="mobile" placeholder="Mobile" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="email" placeholder="Emai" register={register} errors={errors} />

                    </div>

                </div>

                {
                    contractualActive &&

                    <div className='create__group' style={{ marginTop: "12px" }}>

                        <div className="field">
                            <FormRow type="text" name="sponser" placeholder="Sponser" register={register} errors={errors} />

                        </div>
                        <div className="field">
                            <FormRow type="text" name="fees" placeholder="Fees" register={register} errors={errors} />

                        </div>

                    </div>

                }

            </div>

            <div className='add__button'>

                <Button buttonText="Add Student" loading={loading} isEditMode={isEditMode} />
            </div>
        </form>
    )
}

export default StudentForm