import React from 'react'
import Alert from '../../components/Alert'
import UpdateCourseForm from '../../sections/course/UpdateCourseForm'

const UpdateCourse = () => {
    return (
        <>
            <Alert />

            <div className="page__inner">
                <div className="page__container">
                    <div className="page__title h3">Add Course</div>
                    <div className="create">
                        <div className="create__row">
                            <div className="create__col">


                                <UpdateCourseForm />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UpdateCourse