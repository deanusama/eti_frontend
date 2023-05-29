import React, { useMemo, useState } from 'react'
import Button from '../../components/Button'
import FormRow from '../../components/FormRow'
import { useForm } from 'react-hook-form'
import FormDropdown from '../../components/FormDropdown'
import { certificateList, sponserList } from '../../utils'
import { addCourse, editCourse, setCurrentPage } from '../../redux/slice/course'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react'



const CourseForm = () => {
    const [sponser, setSponser] = useState("public")
    const [certificate, setCertificate] = useState("A")
    const navigate = useNavigate()

    const { id } = useParams();
    const isEditMode = Boolean(id);


    const dispatch = useDispatch()
    const { loading, courseList, itemsPerPage } = useSelector(state => state.course)

    let getUpdatedCourse
    if (isEditMode) {
        const result = useMemo(() => courseList.find((course) => course._id === id), [courseList, id])
        const { __v, _id, createdAt, ...rest } = result

        getUpdatedCourse = rest
    }

    const initialValues = useMemo(() => {
        if (isEditMode && getUpdatedCourse) {
            return getUpdatedCourse;
        }
        return {
            courseNo: '',
            courseTitleA: '',
            courseTitleE: '',
            durationFrom: '',
            durationTo: '',
            level: '',
            licenseNumber: '',
            authentication: '',
            trainerName: '',
            venue: '',
            language: '',
            sponserName: '',
            fees: '',
            certificateDocs: ''
        };
    }, [isEditMode, getUpdatedCourse]);


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
    })


    useEffect(() => {
        if (isEditMode && getUpdatedCourse) {
            setSponser(getUpdatedCourse.sponser);
            setCertificate(getUpdatedCourse.certificate);
        }
    }, [isEditMode]);


    const onSponserDropDownSelect = (value) => setSponser(value)
    const onCertificateDropDownSelect = (value) => setCertificate(value)



    const onCourseSubmit = (data) => {

        let formData;
        let certificateDocs;

        if (isEditMode) {
            const { certificateDocs: cd, sponser, certificate, updatedAt, ...rest } = data
            formData = rest
            certificateDocs = cd


        } else {
            const { certificateDocs: cd, ...rest } = data
            formData = rest
            certificateDocs = cd
        }

        const finalSend = new FormData()

        finalSend.append('id', id)
        finalSend.append('sponser', sponser)
        finalSend.append('certificate', certificate)

        Object.entries(formData).forEach(([key, value]) => {
            finalSend.append(key, value)
        })

        finalSend.append('certificateDocs', certificateDocs[0])


        // const finalSend = { ...data, sponser, certificate }
        const hideFilteredCourseList = courseList.filter(item => !item.hideCourse)
        const totalPages = Math.ceil(hideFilteredCourseList.length / itemsPerPage);

        const currentPageAfterAdded = hideFilteredCourseList.length % itemsPerPage === 0 ? totalPages + 1 : totalPages


        const afterEditRedirect = hideFilteredCourseList.findIndex((course) => course._id === id)

        const currentPageAfterEdit = Math.ceil((afterEditRedirect + 1) / itemsPerPage);

        if (isEditMode) {


            dispatch(editCourse(finalSend))
            // console.log(data);

            navigate('/short-courses')
            dispatch(setCurrentPage(currentPageAfterEdit))

        } else {

            dispatch(addCourse(finalSend))

            navigate('/short-courses')
            dispatch(setCurrentPage(currentPageAfterAdded))

        }

    }

    if (isEditMode) {

        if (!getUpdatedCourse) {
            return (
                <div>Loading...</div>
            )
        }
    }



    return (
        <form className="create__card card" onSubmit={handleSubmit(onCourseSubmit)}>

            <div className="card__head">
                <div className="title-green card__title">Name &amp; description</div>

            </div>

            <div className="field">

                <FormRow type="text" name="courseNo" placeholder="Course No" register={register} errors={errors} />

                <div className='create__group' style={{ marginTop: "12px" }}>



                    <div className="field">
                        <FormRow type="text" name="courseTitleA" placeholder="Course Title A" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="courseTitleE" placeholder="Course Title A" register={register} errors={errors} />

                    </div>


                    <div className="field">
                        <FormRow type="text" name="durationFrom" placeholder="From" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="durationTo" placeholder="To" register={register} errors={errors} />

                    </div>

                    <div className="field">
                        <FormRow type="text" name="level" placeholder="Level" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="licenseNumber" placeholder="License Number" register={register} errors={errors} />

                    </div>

                </div>
                <div className='two__fields'>

                    <FormRow type="text" name="authentication" placeholder="Authentication" register={register} errors={errors} />
                    <FormRow type="text" name="trainerName" placeholder="Trainer Name" register={register} errors={errors} />
                </div>

                <div className='create__group' style={{ marginTop: "12px" }}>

                    <div className="field">
                        <FormRow type="text" name="venue" placeholder="Venue" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="language" placeholder="Language" register={register} errors={errors} />

                    </div>

                </div>

            </div>

            <FormDropdown list={sponserList} value={sponser} onDropDownSelect={onSponserDropDownSelect} title="Sponser" />


            {sponser === 'contractual' && (

                <div className='create__group' style={{ marginTop: "12px", marginBottom: "12px" }}>

                    <div className="field">
                        <FormRow type="text" name="sponserName" placeholder="Sponser Name" register={register} errors={errors} />

                    </div>
                    <div className="field">
                        <FormRow type="text" name="fees" placeholder="Fees" register={register} errors={errors} />

                    </div>

                </div>

            )}

            {/* <FormRow type="text" name="certificate" placeholder="Certificate" register={register} errors={errors} /> */}

            <div style={{ marginTop: "32px" }}>
                <FormDropdown list={certificateList} value={certificate} onDropDownSelect={onCertificateDropDownSelect} title="Certificate" />
            </div>

            {
                isEditMode ?

                    <>
                        <div style={{ marginTop: "18px" }}>

                            <div className='review__content' style={{ marginBottom: '4px' }}>
                                Previous file: {getUpdatedCourse.certificateDocs?.name}
                            </div>
                            <input type="file" name="certificateDocs" {...register("certificateDocs")} />
                        </div>
                    </> :

                    <input type="file" name="certificateDocs" {...register("certificateDocs")} style={{ marginTop: "18px" }} />

            }


            <div className='panel__btns' style={{ display: "flex", gap: "8px", marginTop: "32px" }}>

                <Button buttonText="Add Course" loading={loading} isEditMode={isEditMode} />
                {/* <button class="button-stroke panel__button" type='reset' onClick={handleReset}>Reset</button> */}
            </div>
        </form>
    )
}

export default CourseForm