import React from 'react'

const CipsStudentList = ({ module, moduleExamDateFrom, moduleExamDateTo, remarks, result }) => {
    return (



        <div className="customer__row">
            <div className="customer__col">

            </div>

            <div className="customer__col">
                <div className="customer__email">{module}</div>
            </div>

            <div className="customer__col">
                <div className="customer__email">{moduleExamDateFrom}</div>
            </div>
            <div className="customer__col">
                <div className="customer__email">{moduleExamDateTo}</div>
            </div>
            <div className="customer__col">
                <div className="customer__email">{remarks}</div>
            </div>

            <div className="customer__col">
                <div className="customer__lifetime">
                    <div className="customer__price">{result}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CipsStudentList