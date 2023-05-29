import React from 'react'
import FormRow from '../../components/FormRow'
import FormDropdown from '../../components/FormDropdown'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'

const UpdateCourseForm = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
    })
    return (
        <form className="create__card card" onSubmit={handleSubmit(onUpdateSubmit)}>

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

            <FormRow type="text" name="certificate" placeholder="Certificate" register={register} errors={errors} />

            <div style={{ marginTop: "32px" }}>
                <FormDropdown list={certificateList} value={certificate} onDropDownSelect={onCertificateDropDownSelect} title="Certificate" />
            </div>

            <input type="file" name="certificateDocs" id="" style={{ marginTop: "18px" }} />

            <div className='panel__btns' style={{ display: "flex", gap: "8px", marginTop: "32px" }}>

                <Button buttonText="Add Course" loading={loading} />
                <button className="button-stroke panel__button" type='reset' onClick={handleReset}>Reset</button>
            </div>
        </form>
    )
}

export default UpdateCourseForm