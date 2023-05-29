import React from 'react'
import CourseForm from '../../sections/course/CourseForm'
import Alert from '../../components/Alert'

const AddCourse = () => {
    return (
        <>
            <Alert />

            <div className="page__inner">
                <div className="page__container">
                    <div className="page__title h3">Add Course</div>
                    <div className="create">
                        <div className="create__row">
                            <div className="create__col">
                                <CourseForm />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddCourse