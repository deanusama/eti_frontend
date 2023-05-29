import * as yup from 'yup'


export const registerSchema = yup.object().shape({
    password: yup.string().required("Email is required").min(6).max(16),
    email: yup.string().email("Email field must be valid").required("Email is required"),
    name: yup.string(),
})