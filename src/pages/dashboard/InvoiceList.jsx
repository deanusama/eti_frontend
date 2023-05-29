import React from 'react'
import { Link } from 'react-router-dom'
import MyPDFDocument from '../../MyPDFDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useDispatch } from 'react-redux';
import { updateStudentInvoice } from '../../redux/slice/student';

const InvoiceList = ({ _id: id, studentNo, gender, studentNameE, studentNameA }) => {
    const dispatch = useDispatch()


    const allData = {
        id, studentNo, gender, studentNameE, studentNameA
    }

    const handleUpdateStudentInvoice = (value) => {
        console.log(value);

        dispatch(updateStudentInvoice())

    }

    return (
        <div className="released__row">

            <div className="released__col"></div>
            <div className="released__col">{studentNo}</div>

            <div className="released__col">
                <Link className="released__item" to="#">

                    <div className="released__details">
                        <div className="released__product">{studentNameE}</div>

                    </div>
                </Link>
            </div>

            <div className="released__col">
                <a className="released__item" href="#" >

                    <div className="released__details">
                        <div className="released__product">{studentNameA}</div>

                    </div>
                </a>
            </div>

            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{gender}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <Link className="released__item" to={`/edit-invoice/${id}`} >

                    <div className="released__details">
                        <div className="released__product">Edit</div>

                    </div>
                </Link>
            </div>

            <PDFDownloadLink document={<MyPDFDocument {...allData} />} fileName="myDocument.pdf">

                {({ blob, url, loading, error }) => {
                    return (
                        <div className='product-released__col'>

                            {loading ? 'Loading ...' : 'Generate'}

                        </div>

                    )
                }
                }

            </PDFDownloadLink>
        </div>
    )
}

export default InvoiceList