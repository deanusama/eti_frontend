import React from 'react'
import StudentForm from '../../sections/student/StudentForm'
import Alert from '../../components/Alert'



const AddStudent = () => {
    return (
        <>
            <Alert />


            <div className="page__inner">
                <div className="page__container">
                    <div className="page__title h3">Add Student</div>
                    <div className="create">
                        <div className="create__row">
                            <div className="create__col">
                                <StudentForm />
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default AddStudent