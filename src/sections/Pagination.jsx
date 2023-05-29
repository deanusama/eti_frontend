import React from 'react'

const Pagination = ({ totalPages, currentPage, changePage }) => {


    const pages = Array.from({ length: totalPages }, (_, i) => {
        return i + 1
    })


    const nextPage = () => {
        let newPage = currentPage + 1
        if (newPage > totalPages) {
            newPage = totalPages
        }

        changePage(newPage)
    }

    const prevPage = () => {
        let newPage = currentPage - 1
        if (newPage < 1) {
            newPage = 1
        }

        changePage(newPage)
    } 

   
    return (
        <div className="products__foot">

            <button className="products__arrow" disabled={currentPage === 1} onClick={prevPage} >
                <svg className="icon icon-arrow-left">
                    <use xlinkHref="#icon-arrow-left"></use>
                </svg>
            </button>


            {
            // noPages ? null :

                pages.map((pageNumber) => {
                    return (
                        <button key={pageNumber} className={pageNumber === currentPage ? "products__arrow active" : 'products__arrow'} onClick={() => changePage(pageNumber)}>
                            {pageNumber}
                        </button>
                    )
                })

            }

            <button className="products__arrow" disabled={currentPage === totalPages} onClick={nextPage}>
                <svg className="icon icon-arrow-right">
                    <use xlinkHref="#icon-arrow-right"></use>
                </svg>
            </button>
        </div>
    )
}

export default Pagination