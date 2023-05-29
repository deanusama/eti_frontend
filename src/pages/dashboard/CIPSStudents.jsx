import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CipsHead from '../../sections/cips/CipsHead'
import CipsList from '../../sections/cips/CipsList'
import ArrowRight from '../../assets/icons/ArrowRight'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import { useDispatch, useSelector } from 'react-redux'
import { allCipsStudent, hideCipsStudent, setCurrentPage, updatePaginationOption } from '../../redux/slice/cips'
import Pagination from '../../sections/Pagination'
import DeleteButton from '../../components/DeleteButton'
import FormDropdown from '../../components/FormDropdown'
import { paginationOptionList } from '../../utils'
import Loading from '../../components/Loading'
import ZeroLength from '../../components/ZeroLength'


const CIPSStudents = () => {
    const { cipsStudentList, deleteCheck, currentPage, itemsPerPage, loading } = useSelector((state) => state.cips)
    const dispatch = useDispatch()

    const allSelectCheckboxRef = useRef()

    // Pagination

    const hideFilteredCourseList = cipsStudentList.filter(item => !item.hideCipsStudent)
    const totalPages = Math.ceil(hideFilteredCourseList.length / itemsPerPage);
    // console.log(totalPages, 'total page');
    // console.log(currentPage, 'current page');

    const changePage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
        // setCurrentPage(pageNumber)
    }


    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageArr = hideFilteredCourseList.slice(startIndex, endIndex);

        // console.log(pageArr);

        if (!pageArr.length && currentPage !== 1) changePage(currentPage - 1)
        // console.log(currentPage);

        return pageArr
    }

    // console.log('render');

    const deleteCourseHandle = async () => {
        await dispatch(hideCipsStudent())
        allSelectCheckboxRef.current.checked = false
    }

    const onPaginationOptionDropDownSelect = (value) => {

        dispatch(updatePaginationOption(value))
    }


    return (
        <>
            <div className="page__inner">
                <div className="page__container">
                    <div className="drafts card js-tabs">
                        <div className="card__head">
                            <div className="title-purple card__title">Cips Student</div>

                            {/* <form className="form">
                                <input className="course__input" type="text" name="search"
                                    placeholder="Search product" autoComplete="off" onChange={handleSearchField} />

                            </form> */}

                            <DeleteButton deleteClick={deleteCourseHandle} deleteObject={deleteCheck} />


                            <div className='card__sorting pagination__select'>

                                <FormDropdown list={paginationOptionList} value={itemsPerPage} styleClass="pagination" onDropDownSelect={onPaginationOptionDropDownSelect} />

                                <div className="card__sorting">
                                    <Link to='/add-cips-student' className='student__btn'>Add Student</Link>
                                </div>
                            </div>
                        </div>
                        <div className="drafts__container">
                            <div className="drafts__tab js-tabs-item" style={{ display: 'block' }}>
                                <div className="released">
                                    <div className="released__wrapper">
                                        <div className="released__table">

                                            {
                                                loading ? (
                                                    <Loading />
                                                ) :

                                                    getPaginatedData().length === 0 && cipsStudentList && cipsStudentList.length !== 0 ? (
                                                        <ZeroLength fieldName="Cips Students" />
                                                    ) :
                                                        <>

                                                            <CipsHead cipsStudentList={getPaginatedData} currentPage={currentPage} ref={allSelectCheckboxRef} />

                                                            {
                                                                getPaginatedData().map((cipsStudent) => {

                                                                    return (

                                                                        <CipsList key={cipsStudent._id} {...cipsStudent} />
                                                                        // handleUpdateCourse={handleUpdateCourse} handleAddStudent={handleAddStudent}
                                                                    )
                                                                })
                                                            }

                                                        </>
                                            }

                                        </div>
                                    </div>
                                    {totalPages > 1 &&
                                        <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
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

export default CIPSStudents