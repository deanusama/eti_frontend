import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CipsStudentList from '../CipsStudentList'

const CipsCourseDetail = () => {

    const { cipsStudentList } = useSelector((state) => state.cips)
    const { id } = useParams()

    const cipsCourseDetail = useMemo(() => cipsStudentList.find(student => student._id === id), [cipsStudentList])

    console.log(cipsCourseDetail);
    // console.log(studentDetail.courseNo);

    if (!cipsCourseDetail) {
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
                <div className="page__title h3">Course No {cipsCourseDetail.idNo}</div>
                <div className="card">
                    <div className="income">
                        <div className="income__list">
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Name
                                            <div className="tooltip" title="Small description Funds">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter">{cipsCourseDetail.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Course Title
                                            <div className="tooltip" title="Small description Earning">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter" >{cipsCourseDetail.courseTitle}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="income__item">

                                <div className="income__line">
                                    <div className="income__details">
                                        <div className="income__label">Membersip
                                            <div className="tooltip" title="Small description Fees">
                                                <svg className="icon icon-info">
                                                    <use xlinkHref="#icon-info" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="income__counter">{cipsCourseDetail.membership}</div>
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
                                <div className="transactions__col">Date of Birth</div>
                                <div className="transactions__col">Date of Join</div>
                                <div className="transactions__col">Email</div>
                                <div className="transactions__col">Gender</div>
                                <div className="transactions__col">Group</div>
                                <div className="transactions__col">Expiry Date</div>
                                <div className="transactions__col">Password</div>
                                <div className="transactions__col">sponsor</div>
                            </div>

                            <div className="transactions__row">
                                <div className="transactions__col">
                                    {cipsCourseDetail.dOfBirth}
                                </div>

                                <div className="transactions__col">
                                    {cipsCourseDetail.dateOfJoin}
                                </div>


                                <div className="transactions__col">
                                    {cipsCourseDetail.email}
                                </div>

                                <div className="transactions__col">
                                    {cipsCourseDetail.gender}
                                </div>

                                <div className="transactions__col">
                                    {cipsCourseDetail.group}
                                </div>

                                <div className="transactions__col">
                                    {cipsCourseDetail.expairyDate}
                                </div>

                                <div className="transactions__col">
                                    {cipsCourseDetail.password}
                                </div>

                                <div className="transactions__col">

                                    <div className="transactions__product">{cipsCourseDetail.sponser}</div>
                                    <div className="transactions__invoice">{cipsCourseDetail.sponserEmail}</div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className="customer card" style={{ marginTop: "64px" }}>
                    <div className="card__head">
                        <div className="title-purple card__title">Students</div>

                    </div>

                    <div className="customer__inner">
                        <div className="customer__container">
                            <div className="customer__wrapper">
                                <div className="customer__table">
                                    <div className="customer__row">
                                        <div className="customer__col">

                                        </div>
                                        <div className="customer__col">Module</div>
                                        <div className="customer__col">Module Exam Date From</div>
                                        <div className="customer__col">Module Exam Date To</div>
                                        <div className="customer__col">Remarks</div>
                                        <div className="customer__col">Result</div>
                                    </div>

                                    {
                                        !cipsCourseDetail.examDetail.length ?
                                            <div>No exam detail</div> :

                                            cipsCourseDetail.examDetail.map(detail => {
                                                console.log(detail);
                                                return <CipsStudentList key={detail._id} {...detail} />
                                            })

                                    }

                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    )
}

export default CipsCourseDetail