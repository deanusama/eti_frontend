import React, { useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import CourseList from '../../sections/course/CourseList'
import CourseHead from '../../sections/course/CourseHead'
import { useDispatch, useSelector } from 'react-redux'
import { allCourse, hideCourses, setCurrentPage, updatePaginationOption } from '../../redux/slice/course'
import Pagination from '../../sections/Pagination'
import ArrowRight from '../../assets/icons/ArrowRight'
import ArrowLeft from '../../assets/icons/ArrowLeft'
import DeleteButton from '../../components/DeleteButton'
import { getCourseID } from '../../redux/slice/student'
import FormDropdown from '../../components/FormDropdown'
import { paginationOptionList } from '../../utils'
import ZeroLength from '../../components/ZeroLength'
import Loading from '../../components/Loading'



const ShortCourses = () => {

    const dispatch = useDispatch()
    const { courseList, deleteCheck, currentPage, itemsPerPage, loading } = useSelector(state => state.course)

    const allSelectCheckboxRef = useRef()


    const handleUpdateCourse = (id) => {
        dispatch(getCourseID(id))
        console.log(id);

    }

    const handleAddStudent = (id) => dispatch(getCourseID(id))

    // Pagination

    // const hideFilteredCourseList = courseList.filter(item => !item.hideCourse)
    const hideFilteredCourseList = useMemo(() => courseList.filter(item => !item.hideCourse), [courseList])
    const totalPages = Math.ceil(hideFilteredCourseList.length / itemsPerPage);

    const changePage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber))
        // setCurrentPage(pageNumber)
    }

    const getPaginatedData = () => {
        // console.log(itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageArr = hideFilteredCourseList.slice(startIndex, endIndex);

        if (!pageArr.length && currentPage !== 1) changePage(currentPage - 1)

        return pageArr
    };

    console.log('render');


    // Delete
    const deleteCourseHandle = async () => {
        await dispatch(hideCourses())
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
                            <div className="title-purple card__title">Short Courses</div>

                            {/* <form className="form">
                                <input className="course__input" type="text" name="search"
                                    placeholder="Search product" required="required" autoComplete="off" />
                                <button className="form__button">
                                    <svg className="icon icon-search">
                                        <use xlinkHref="#icon-search" />
                                    </svg>
                                </button>
                            </form> */}

                            <DeleteButton deleteClick={deleteCourseHandle} deleteObject={deleteCheck} />


                            <div className="card__sorting pagination__select">

                                <FormDropdown list={paginationOptionList} value={itemsPerPage} styleClass="pagination" onDropDownSelect={onPaginationOptionDropDownSelect} />

                                <Link to='/add-course' className='student__btn'>Add course</Link>
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

                                                    getPaginatedData().length === 0 && courseList && courseList.length !== 0 ? (

                                                        <ZeroLength fieldName="Courses" />
                                                    ) :

                                                        <>
                                                            <CourseHead courseList={getPaginatedData} currentPage={currentPage} ref={allSelectCheckboxRef} />


                                                            {getPaginatedData().map((course) => {

                                                                return (
                                                                    <CourseList key={course._id} {...course} handleUpdateCourse={handleUpdateCourse} handleAddStudent={handleAddStudent} />
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

export default ShortCourses