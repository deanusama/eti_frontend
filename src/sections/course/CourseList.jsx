import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { oneDeleteCheck } from '../../redux/slice/course';
import { Link } from 'react-router-dom';

const CourseList = ({ _id: id, courseNo, courseTitleA, courseTitleE, durationFrom, handleUpdateCourse, handleAddStudent, certificateDocs }) => {

    const dispatch = useDispatch()
    const { deleteCheck } = useSelector((state) => state.course)


    const handleDeleteChange = (e) => {

        dispatch(oneDeleteCheck({ id, inputValue: e.target.checked }))

    }

    const handlePrint = () => {

        const fileURL = `http://localhost:5000/${certificateDocs.uri}`

        const printWindow = window.open(fileURL, '_blank');
        printWindow.onload = () => {
            printWindow.print();
            URL.revokeObjectURL(fileURL);
        };

    };

    return (
        <div className="released__row">
            <div className="released__col">
                <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" checked={!!deleteCheck[id]} onChange={handleDeleteChange} />
                    <span className="checkbox__inner">
                        <span className="checkbox__tick" />
                    </span>
                </label>
            </div>

            <div className="released__col">{courseNo}</div>

            <div className="released__col">
                <Link className="released__item" to={`/short-courses/${id}`}>

                    <div className="released__details">
                        <div className="released__product">{courseTitleA}</div>

                    </div>
                </Link>
            </div>

            <div className="released__col">{courseTitleA}</div>


            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{durationFrom}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <Link className="released__item" to={`/students/${id}`}>

                    <div className="released__details" onClick={() => handleAddStudent(id)}>
                        <div className="released__product">Add</div>

                    </div>
                </Link>
            </div>

            <div className="released__col">
                <Link className="released__item" to={`/add-course/${id}`}>

                    <div className="released__details" onClick={() => handleUpdateCourse(id)}>
                        <div className="released__product">Edit</div>

                    </div>
                </Link>
            </div>

            <div className="released__col">
                <Link className="released__item" to="#">

                    <div className="released__details">
                        <div className="released__product" onClick={handlePrint}>Print</div>

                    </div>

                </Link>
            </div>
        </div>
    )
}

export default CourseList