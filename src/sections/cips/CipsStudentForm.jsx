import React from 'react'
import { useFormContext } from 'react-hook-form'
import { studentDetailArray } from '../../utils'

const CipsStudentForm = () => {
    const { register, errors } = useFormContext()


    return (

        <div className="create__card card">

            <div>

                <div className="card__head">
                    <div className="title-green card__title">Name &amp; description</div>

                </div>

                <div className='field'>
                    <div className='create__group' style={{ marginTop: "12px" }}>


                        {
                            studentDetailArray.map((student, index) => {
                                return (

                                    <div key={student.id} className="field">
                                        <input type="text" className='field__input' id="" placeholder={student.placeholder} name={student.name} {...register(student.name)} />
                                    </div>
                                )
                            })
                        }




                    </div>
                </div>

            </div>
        </div>
    )
}

export default CipsStudentForm