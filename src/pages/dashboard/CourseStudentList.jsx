import React from 'react'

const CourseStudentList = ({ studentNo, studentNameE, studentNameA, mobile, email }) => {
    return (
        <div className="customer__inner">
            <div className="customer__container">
                <div className="customer__wrapper">
                    <div className="customer__table">
                        <div className="customer__row">
                            <div className="customer__col">

                            </div>
                            <div className="customer__col">Name</div>
                            <div className="customer__col">Email</div>
                            <div className="customer__col">Mobile</div>
                        </div>
                        <div className="customer__row">
                            <div className="customer__col">

                            </div>
                            <div className="customer__col">
                                <div className="customer__item">
                                    
                                    <div className="customer__description">
                                        <div className="customer__user">{studentNameA}</div>
                                        <div className="customer__login">{studentNameE}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="customer__col">
                                <div className="customer__email">{email}</div>
                            </div>
                         
                            <div className="customer__col">
                                <div className="customer__lifetime">
                                    <div className="customer__price">{mobile}
                                    </div>
                                    
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseStudentList