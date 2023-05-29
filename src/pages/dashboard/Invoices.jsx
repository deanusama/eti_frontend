import React, { useMemo } from 'react'
import ArrowRight from '../../assets/icons/ArrowRight';
import ArrowLeft from '../../assets/icons/ArrowLeft';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceList from './InvoiceList';
import InvoiceHead from './InvoiceHead';
import Pagination from '../../sections/Pagination';
import { setInvoiceCurrentPage } from '../../redux/slice/student';

const Invoices = () => {
    const dispatch = useDispatch()
    const { studentInvoicesList, currentInvoicePage, invoiceItemPerPage } = useSelector(state => state.student)


    const hideFilteredStudentList = useMemo(() => studentInvoicesList.filter(item => !item.hideStudent), [studentInvoicesList]).reverse()
    // console.log(hideFilteredStudentList);

    // console.log(studentList.length,hideFilteredStudentList.length);

    const totalPages = Math.ceil(hideFilteredStudentList.length / invoiceItemPerPage);

    const changePage = (pageNumber) => {
        dispatch(setInvoiceCurrentPage(pageNumber))
        // setCurrentPage(pageNumber)
    }

    // useEffect(() => {
    //     dispatch(setCurrentPage(totalPages))
    // }, [hideFilteredStudentList])


    let pageArr;
    const getPaginatedData = () => {
        const startIndex = (currentInvoicePage - 1) * invoiceItemPerPage;
        const endIndex = startIndex + invoiceItemPerPage;
        pageArr = hideFilteredStudentList.slice(startIndex, endIndex);

        // console.log(hideFilteredStudentList);

        // if (!pageArr.length && currentInvoicePage !== 1) {
        //     changePage(currentInvoicePage - 1)

        // }
        // console.log(pageArr);
        // console.log(currentPage);


        return pageArr
    };

    // console.log(getPaginatedData());

    // if (!getPaginatedData() || getPaginatedData().length === 0) {
    //     return (
    //         <div className='page__inner'>
    //             <div className='page__container'>
    //                 <div>Loading...</div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <>
            <div className="page__inner">
                <div className="page__container">
                    <div className="drafts card js-tabs">
                        <div className="card__head">
                            <div className="title-purple card__title">Invoices</div>

                            {/* <DeleteButton deleteClick={deleteCourseHandle} deleteObject={studentDeleteCheck} /> */}


                        </div>
                        <div className="drafts__container">
                            <div className="drafts__tab js-tabs-item" style={{ display: 'block' }}>
                                <div className="released">
                                    <div className="released__wrapper">
                                        <div className="released__table">

                                            <InvoiceHead />

                                            {getPaginatedData().map((student) => {
                                                return (

                                                    <InvoiceList key={student._id} {...student} />
                                                )
                                            })}

                                        </div>
                                    </div>


                                    {totalPages > 1 &&
                                        <Pagination totalPages={invoiceItemPerPage} currentPage={currentInvoicePage} changePage={changePage} />
                                    }
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            <ArrowRight />
            <ArrowLeft />

        </>

    )
}

export default Invoices