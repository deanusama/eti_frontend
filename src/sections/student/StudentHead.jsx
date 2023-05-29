import React, { forwardRef, useEffect, useState } from 'react'
import _ from 'lodash'
import { BulkDeleteCheckStudent } from '../../redux/slice/student'
import { useDispatch, useSelector } from 'react-redux'


const StudentHead = forwardRef(function StudentHead({ currentPage, studentList }, ref) {

    const dispatch = useDispatch()

    const { studentDeleteCheck, itemsPerPage } = useSelector((state) => state.student)

    const handleBulkDelete = (e) => {

        // const bulkSelect = studentList().slice(0, 3).map((item) => {
        //     return { id: item._id }
        // })

        const bulkSelect = studentList().slice(0, itemsPerPage).map((item) => {
            return { id: item._id }
        })


        const newArr = _.reduce(bulkSelect, function (obj, bulkSelect) {
            obj[bulkSelect.id] = e.target.checked
            return obj

        }, {})

        // console.log(newArr);
        dispatch(BulkDeleteCheckStudent(newArr))

    }

    useEffect(() => {


        ref.current.checked = false
        dispatch(BulkDeleteCheckStudent({}))

    }, [currentPage])


    return (
        <div className="released__row">
            <div className="released__col">
                <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" ref={ref} onChange={handleBulkDelete} />
                    <span className="checkbox__inner">
                        <span className="checkbox__tick" />
                    </span>
                </label>
            </div>
            <div className="released__col">Student No</div>
            <div className="released__col">Student Name (E)</div>
            <div className="released__col">Student Name (A)</div>
            <div className="released__col">Gender</div>
            <div className="released__col">Mobile</div>
            <div className="released__col">Email</div>
            <div className="released__col">Sponser</div>
            <div className="released__col">ID No</div>
            <div className="released__col">Edit</div>
        </div>
    )

})


export default StudentHead