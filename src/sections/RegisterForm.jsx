import React from 'react'
import FormRow from '../components/FormRow'

import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { registerSchema } from '../validations';


const initialValues = { name: '', email: '', password: '' }

const RegisterForm = () => {


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(registerSchema)
    })

    const onRegister = (data) => {
        console.log(data);
    }


    return (
        <form className="entry__fieldset" onSubmit={handleSubmit(onRegister)}>

            <FormRow type="text" name="name" placeholder="Enter your name" register={register} errors={errors} />
            <FormRow type="email" name="email" placeholder="Enter your email" register={register} errors={errors} />
            <FormRow type="password" name="password" placeholder="Enter your password" register={register} errors={errors} />

            <button className="button entry__button" type='submit'>Sign up</button>
        </form>
    )
}

export default RegisterForm