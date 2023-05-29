import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { oneDeleteCheck } from '../../redux/slice/cips'

const CipsList = ({ _id: id, membership, name, sponser, dateOfJoin }) => {
    const { deleteCheck } = useSelector(state => state.cips)
    const dispatch = useDispatch()

    const handleDeleteChange = (e) => {

        dispatch(oneDeleteCheck({ id, inputValue: e.target.checked }))
    }

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

            <div className="released__col">{membership}</div>
            <div className="released__col">
                <Link className="released__item" to={`/cips-students/${id}`}>

                    <div className="released__details">
                        <div className="released__product">{name}</div>

                    </div>
                </Link>
            </div>


            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{sponser}
                    </div>
                </div>
            </div>


            <div className="released__col">
                <Link className="released__item" to={`/add-cips-student/${id}`}>

                    <div className="released__details" >
                        <div className="released__product">Edit</div>

                    </div>
                </Link>
            </div>

            <div className="released__col">
                <div className="released__rating">
                    <div className="released__counter">{dateOfJoin}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CipsList