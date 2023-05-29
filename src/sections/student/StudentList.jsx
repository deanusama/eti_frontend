import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentID, oneDeleteCheckStudent, updateStudent } from '../../redux/slice/student'
import { Link } from 'react-router-dom'

const StudentList = ({ _id: id,iDNo, studentNo, gender, email, studentNameE, studentNameA, mobile, sponser }) => {
    const dispatch = useDispatch()
    const { studentDeleteCheck } = useSelector(state => state.student)

    const handleDeleteChange = (e) => {

        dispatch(oneDeleteCheckStudent({ id, inputValue: e.target.checked }))
    }



    const handleUpdateStudent = (idValue) => {
        dispatch(updateStudent(idValue))
    }


    return (
        <div className="released__row">
            <div className="released__col">
                <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" checked={!!studentDeleteCheck[id]} onChange={handleDeleteChange} />
                    <span className="checkbox__inner">
                        <span className="checkbox__tick" />
                    </span>
                </label>
            </div>
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
                <div className="released__rating">
                    <div className="released__counter">{mobile}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{email}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{sponser}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{iDNo}
                    </div>
                </div>
            </div>

            <div className="released__col">
                <Link className="released__item" to={`/add-student/${id}`} >

                    <div className="released__details" onClick={() => handleUpdateStudent(id)}>
                        <div className="released__product">Edit</div>

                    </div>
                </Link>
            </div>
        </div>
    )
}

export default StudentList