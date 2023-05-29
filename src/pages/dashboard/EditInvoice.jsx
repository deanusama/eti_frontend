import React, { useEffect, useMemo, useState } from 'react'
import FormRow from '../../components/FormRow'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/Button'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { editStudentInvoice, setInvoiceCurrentPage } from '../../redux/slice/student'


const EditInvoice = () => {
    const courseId = Cookies.get('courseId')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { courseList } = useSelector(state => state.course)
    const [contractualActive, setContractualActive] = useState(false)
    const { loading, studentInvoicesList, invoiceItemPerPage } = useSelector(state => state.student)

    const { id } = useParams()


    let getUpdatedInvoice = useMemo(() => studentInvoicesList.find((invoice) => invoice._id === id), [studentInvoicesList, id])

    const initialValues = useMemo(() => {
        return getUpdatedInvoice
    })


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues,
        // resolver: yupResolver(registerSchema)
    })

    const onInvoiceSubmit = (data) => {
        const hideFilteredStudentInvoiceList = studentInvoicesList.filter((item) => !item.hideStudent).reverse()
        const afterEditRedirect = hideFilteredStudentInvoiceList.findIndex((item) => item._id === id)
        const currentPageAfterEdit = Math.ceil((afterEditRedirect + 1) / invoiceItemPerPage);


        dispatch(editStudentInvoice(data))
        navigate('/invoices')
        dispatch(setInvoiceCurrentPage(currentPageAfterEdit))
    }

    useEffect(() => {

        const result = courseList.find((item) => item._id === courseId)

        if (result.sponser === "public") {
            setContractualActive(true)
        } else {
            setContractualActive(false)
        }

    }, [courseList, courseId])

    return (

        <div className="page__inner">
            <div className="page__container">
                <div className="page__title h3">Update Invoice</div>
                <div className="create">
                    <div className="create__row">
                        <div className="create__col">
                            <form className="create__card card" onSubmit={handleSubmit(onInvoiceSubmit)}>

                                <div className="card__head">
                                    <div className="title-green card__title">Name &amp; description</div>

                                </div>

                                <div className="field">

                                    <FormRow type="text" name="studentNo" placeholder="Student No" register={register} errors={errors} />

                                    <div className='create__group' style={{ marginTop: "12px" }}>

                                        <div className="field">
                                            <FormRow type="text" name="studentNameA" placeholder="student Name A" register={register} errors={errors} />

                                        </div>
                                        <div className="field">
                                            <FormRow type="text" name="studentNameE" placeholder="student Name E" register={register} errors={errors} />

                                        </div>
                                    </div>

                                    <div className='two__fields'>

                                        <FormRow type="text" name="iDNo" placeholder="ID-No" register={register} errors={errors} />
                                        <FormRow type="text" name="gender" placeholder="Gender" register={register} errors={errors} />
                                    </div>

                                    <div className='create__group' style={{ marginTop: "12px" }}>

                                        <div className="field">
                                            <FormRow type="text" name="mobile" placeholder="Mobile" register={register} errors={errors} />

                                        </div>
                                        <div className="field">
                                            <FormRow type="text" name="email" placeholder="Emai" register={register} errors={errors} />

                                        </div>

                                    </div>

                                    {
                                        contractualActive &&

                                        <div className='create__group' style={{ marginTop: "12px" }}>

                                            <div className="field">
                                                <FormRow type="text" name="sponser" placeholder="Sponser" register={register} errors={errors} />

                                            </div>
                                            <div className="field">
                                                <FormRow type="text" name="fees" placeholder="Fees" register={register} errors={errors} />

                                            </div>

                                        </div>

                                    }

                                </div>

                                <div className='add__button'>

                                    <Button buttonText="Update Invoice" loading={loading} />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        </div>



    )
}

export default EditInvoice