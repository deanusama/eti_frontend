import React from 'react'

const InvoiceHead = () => {
    return (
        // <div className="released__row">

        //     <div className="released__col">Student No</div>
        //     <div className="released__col">Student Name (E)</div>
        //     <div className="released__col">Student Name (A)</div>
        //     <div className="released__col">Gender</div>
        //     <div className="released__col">Edit</div>
        //     <div className="released__col">Invoice</div>
        // </div>



        <div className="released__row">
            <div className="released__col">
                {/* <label className="checkbox">
                    <input className="checkbox__input" type="checkbox" ref={ref} onChange={handleBulkDelete} />
                    <span className="checkbox__inner">
                        <span className="checkbox__tick" />
                    </span>
                </label> */}
            </div>

            <div className="released__col">Student No</div>
            <div className="released__col">Student Name (E)</div>
            <div className="released__col">Student Name (A)</div>
            <div className="released__col">Gender</div>
            <div className="released__col">Edit</div>
            <div className="released__col">Invoice</div>
        </div>
    )
}

export default InvoiceHead