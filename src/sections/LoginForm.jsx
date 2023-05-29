import React, { useEffect } from 'react'
import FormRow from '../components/FormRow'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { registerSchema } from '../validations';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slice/auth';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';


const initialValues = { email: '', password: '' }

const LoginForm = () => {

    const dispatch = useDispatch()
    const { loading, user } = useSelector(state => state.auth)

    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(registerSchema)
    })

    const onLogin = (data) => {
        dispatch(loginUser(data))

    }

    useEffect(() => {

        if (user) {
            const delay = 2000; // Delay in milliseconds (e.g., 2 seconds)
            const timeout = setTimeout(() => {
                navigate('/');
            }, delay);

            return () => {
                clearTimeout(timeout); // Clear the timeout if the component unmounts before the delay
            };
        }
    }, [user, navigate])


    return (
        <form className="entry__fieldset" onSubmit={handleSubmit(onLogin)}>

            <div className="field field_icon">

                <FormRow type="email" name="email" placeholder="Enter your email" register={register} errors={errors} />
            </div>

            <div className="field field_icon">

                <FormRow type="password" name="password" placeholder="Enter your password" register={register} errors={errors} />
            </div>

            <Button buttonText="Submit" loading={loading} />
        </form>

    )
}

export default LoginForm