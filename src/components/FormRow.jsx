import React from 'react'

const FormRow = ({ type, name, placeholder, register, errors }) => {
    return (

        // <div className="field field_icon">
<div>
            <div className="field__wrap">
                <input className="field__input" type={type} name={name} placeholder={placeholder} {...register(name)} />
            </div>
            <span className="field_error">{errors[name]?.message && errors[name]?.message}</span>
            </div>
        // </div>
    )
}

export default FormRow

// : mongooseError[name]