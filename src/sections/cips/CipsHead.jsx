import React, { forwardRef, useEffect } from 'react'
import _ from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { bulkDeleteCheck } from '../../redux/slice/cips'



const CipsHead = forwardRef(function CipsHead({ cipsStudentList, currentPage }, ref) {
    const { deleteCheck, itemsPerPage } = useSelector(state => state.cips)
    const dispatch = useDispatch()



    const handleBulkDelete = (e) => {


        const bulkSelect = cipsStudentList().slice(0, itemsPerPage).map((item) => {
            return { id: item._id }
        })

        // console.log(bulkSelect);


        const newArr = _.reduce(bulkSelect, function (obj, bulkSelect) {
            obj[bulkSelect.id] = e.target.checked
            return obj

        }, {})

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
            <div className="released__col">Membership ID</div>
            <div className="released__col">Student Name</div>
            <div className="released__col">Sponsor</div>
            <div className="released__col">Edit</div>
            <div className="released__col">Date of Join</div>
        </div>
    )
});

export default CipsHead