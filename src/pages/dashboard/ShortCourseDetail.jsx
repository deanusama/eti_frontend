import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CourseStudentList from './CourseStudentList'

const ShortCourseDetail = () => {

    const { courseList } = useSelector((state) => state.course)
    const { id } = useParams()

    const studentDetail = useMemo(() => courseList.find(course => course._id === id), [courseList])
    const { student } = studentDetail

    if (!studentDetail) {
        return (
            <div className='page__inner'>
                <div className='page__container'>
                    <div>Loading...</div>
                </div>
            </div>
        )
    }

    return (

        <div className="page__inner">
            <div className="page__container">
                <div className="page__title h3">Course No {studentDetail.courseNo}</div>
                <div className="card">
                    <div className="income">
                        <div className="income__list">
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Course Title A
                                            <div className="tooltip" title="Small description Funds">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter">{studentDetail.courseTitleA}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Course Title E
                                            <div className="tooltip" title="Small description Earning">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter" >{studentDetail.courseTitleE}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Trainers Name
                                            <div className="tooltip" title="Small description Fees">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter">{studentDetail.trainerName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="transactions card">

                    <div className="transactions__wrapper">
                        <div className="transactions__table">
                            <div className="transactions__row">
                                <div className="transactions__col">Duration From</div>
                                <div className="transactions__col">Duration To</div>
                                <div className="transactions__col">Level</div>
                                <div className="transactions__col">Sponsor</div>
                                {studentDetail.sponser === "contractual" &&

                                    <div className="transactions__col">Fees</div>
                                }
                                <div className="transactions__col">Language</div>
                                <div className="transactions__col">License No</div>
                                <div className="transactions__col">Venue</div>
                                <div className="transactions__col">Certificate</div>
                            </div>


                            <div className="transactions__row">
                                <div className="transactions__col">
                                    {studentDetail.durationFrom}
                                </div>

                                <div className="transactions__col">
                                    {studentDetail.durationTo}
                                </div>



                                <div className="transactions__col">
                                    {/* <div className="transactions__details">
                                        <div className="transactions__product">{studentDetail.sponserName}</div>
                                        <div className="transactions__invoice">{studentDetail.sponser}</div>
                                    </div> */}
                                    <div className="status-green-dark transactions__status">{studentDetail.level}</div>
                                </div>

                                <div className="transactions__col">
                                    {
                                        studentDetail.sponser === "contractual" &&

                                        <div className="transactions__product">{studentDetail.sponserName}</div>
                                    }
                                    <div className="transactions__invoice">{studentDetail.sponser}</div>
                                </div>

                                {studentDetail.sponser === "contractual" &&

                                    <div className="transactions__col">
                                        {studentDetail.fees}
                                    </div>

                                }

                                <div className="transactions__col">
                                    {studentDetail.language}
                                </div>

                                <div className="transactions__col">
                                    {studentDetail.licenseNumber}
                                </div>

                                <div className="transactions__col">
                                    <div className="transactions__amount">{studentDetail.venue}</div>
                                </div>

                                <div className="transactions__col">
                                    <div className="transactions__amount">{studentDetail.certificate}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="customer card" style={{ marginTop: "64px" }}>
                    <div className="card__head">
                        <div className="title-purple card__title">Students</div>

                    </div>

                    {
                        !student || student.length === 0 ?
                            <div>No students in this course</div> :

                            studentDetail.student.map(item => {
                                console.log(item);
                                return <CourseStudentList key={item._id} {...item} />
                            })
                    }


                </div>
            </div>
        </div>

    )
}

export default ShortCourseDetail


