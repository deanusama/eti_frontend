import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const ExamDetailForm = () => {
    const { control } = useFormContext()


    const { fields, append, remove } = useFieldArray({
        name: 'examDetail',
        control
    })


    return (
        <>
            <div className="examdetail__form" >

                {fields.map((field, index) => {
                    return (

                        <div key={field.id} style={{ display: "flex", gap: "6px" }}>

                            <input type="text" className='field__input' {...control.register(`examDetail.${index}.module`)} id="" placeholder='Module' />
                            <input type="date" className='field__input' {...control.register(`examDetail.${index}.moduleExamDateFrom`)} id="" placeholder='Exam Date From' />
                            <input type="date" className='field__input' {...control.register(`examDetail.${index}.moduleExamDateTo`)} id="" placeholder='Exam Date To' />


                            <div style={{ minWidth: "80px" }}>
                                <input type="text" className='field__input' {...control.register(`examDetail.${index}.result`)} id="" placeholder='Result' />

                            </div>

                            <input type="text" className='field__input' {...control.register(`examDetail.${index}.remarks`)} placeholder='Remarks' />


                            <button className="button header__button" onClick={() => remove(index)}>
                                <span>-</span>
                            </button>
                        </div>
                    )
                })}

                <button className='button header__button' style={{ alignSelf: "flex-start" }} type='button' onClick={() => append()}>Add</button>
            </div>

        </>
    )
}

export default ExamDetailForm