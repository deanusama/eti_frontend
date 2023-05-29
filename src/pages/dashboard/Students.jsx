import React, { useEffect, useMemo, useRef, useState } from 'react'
import Cookies from "js-cookie";

import { Link, useParams } from 'react-router-dom'
import StudentHead from '../../sections/student/StudentHead'
import StudentList from '../../sections/student/StudentList'
import { useDispatch, useSelector } from 'react-redux'
import { allStudent, hideStudents, setCurrentPage } from '../../redux/slice/student'
import Pagination from '../../sections/Pagination'
import ArrowRight from '../../assets/icons/ArrowRight'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import DeleteButton from '../../components/DeleteButton'
import Loading from '../../components/Loading';
import ZeroLength from '../../components/ZeroLength';


const Students = () => {
    const { studentList, studentDeleteCheck, currentPage, itemsPerPage, loading } = useSelector(state => state.student)
    const dispatch = useDispatch()

    const allSelectCheckboxRef = useRef()

    const { id } = useParams();
    Cookies.set('courseId', id)


    // Pagination
    const hideFilteredStudentList = useMemo(() => studentList.filter(item => item.courseId === id && !item.hideStudent), [studentList])

    // console.log(studentList.length,hideFilteredStudentList.length);

    const totalPages = Math.ceil(hideFilteredStudentList.length / itemsPerPage);

    const changePage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
        // setCurrentPage(pageNumber)
    }

    let pageArr;
    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        pageArr = hideFilteredStudentList.slice(startIndex, endIndex);

        // console.log(hideFilteredStudentList);

        if (!pageArr.length && currentPage !== 1) {
            changePage(currentPage - 1)

        }
        // console.log(currentPage);


        return pageArr
    };

    // console.log(currentPage, 'students page');

    const deleteCourseHandle = async () => {
        await dispatch(hideStudents())
        allSelectCheckboxRef.current.checked = false
    }


    return (


        <>
            <div className="page__inner">
                <div className="page__container">
                    <div className="drafts card js-tabs">
                        <div className="card__head">
                            <div className="title-purple card__title">Students</div>

                            <DeleteButton deleteClick={deleteCourseHandle} deleteObject={studentDeleteCheck} />


                            <div className='card__sorting' style={{ display: "flex", gap: "8px" }}>

                                <div className="card__sorting">
                                    <Link to='/short-courses' className='button-stroke button-small card__button'>
                                        <svg className="icon icon-arrow-left">
                                            <use xlinkHref="#icon-arrow-left"></use>
                                        </svg>
                                        Back</Link>

                                </div>

                                <div className="card__sorting">
                                    <Link to='/add-student' className='student__btn'>Add Student</Link>

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

                                                    getPaginatedData().length === 0 && studentList && studentList.length !== 0 ? (
                                                        <ZeroLength fieldName="Students" />
                                                    ) :

                                                        <>
                                                            <StudentHead studentList={getPaginatedData} currentPage={currentPage} ref={allSelectCheckboxRef} />

                                                            {getPaginatedData().map((student) => {
                                                                console.log(student);
                                                                return (

                                                                    <StudentList key={student._id} {...student} />
                                                                )
                                                            })}
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

export default Students