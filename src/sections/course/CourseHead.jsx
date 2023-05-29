import React, { forwardRef, useEffect } from 'react'
import _ from 'lodash'
import { bulkDeleteCheck } from '../../redux/slice/course'
import { useDispatch, useSelector } from 'react-redux'



const CourseHead = forwardRef(function CourseHead({ courseList, currentPage }, ref) {

    const { deleteCheck, itemsPerPage } = useSelector(state => state.course)
    const dispatch = useDispatch()


    const handleBulkDelete = (e) => {

        console.log(e.target.checked);

        const bulkSelect = courseList().slice(0, itemsPerPage).map((item) => {
            return { id: item._id }
        })

        const newArr = _.reduce(bulkSelect, function (obj, bulkSelect) {
            obj[bulkSelect.id] = e.target.checked
            return obj

        }, {})


        // console.log(newArr);
        dispatch(bulkDeleteCheck(newArr))
    }

    useEffect(() => {
        ref.current.checked = false
        dispatch(bulkDeleteCheck({}))
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
            <div className="released__col">No</div>
            <div className="released__col">Course Title (E)</div>
            <div className="released__col">Course Title (A)</div>
            <div className="released__col">S-Date</div>
            <div className="released__col">Students</div>
            <div className="released__col">List</div>
            <div className="released__col">Certificate</div>
        </div>
    )


})


export default CourseHead