import React, { useEffect, useState } from 'react'

const FormDropdown = ({ list, value, onDropDownSelect, title, styleClass }) => {
    const [show, setShow] = useState(false)
    const handleSelect = () => setShow(!show)

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest(".nice-select.select") && !e.target.closest(".nice-select.open .list")) {
                setShow(false)
            } else if (e.target.closest(".active-result")) {
                setShow(false)
            }
        }
        document.body.addEventListener('click', handleClick);
        return () => {
            document.body.removeEventListener('click', handleClick);
        }
    })

    return (
        <div className="field">
            {title &&

                <div className="field__label">{title ? title : null}
                    <div className="tooltip tooltipstered">
                        <svg className="icon icon-info">
                            <use xlinkhref="#icon-info" />
                        </svg>
                    </div>
                </div>

            }
            <div className="field__wrap">
                <select className={`${styleClass ? "select__pagination" : "select"} `} style={{ display: 'none' }}>
                    <option>Select category</option>
                    <option>Category 1</option>
                    <option>Category 2</option>
                </select>



                <div className={`nice-select select ${show && "open"}`} onClick={handleSelect}>
                    <span className="current">{value}</span>
                    <ul className="list">
                        {/* <li data-value="Select category" className="option selected focus">Select category</li> */}

                        {list.map((item, i) => {
                            return (
                                <li key={i} className="option" onClick={() => onDropDownSelect(item)}>{item}</li>
                            )
                        })}

                    </ul>
                </div>
            </div>
        </div>

    )
}

export default FormDropdown