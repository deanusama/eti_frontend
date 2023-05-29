import React from 'react'

const DeleteButton = ({ deleteClick, deleteObject }) => {

    const deleteLength = Object.keys(deleteObject).length

    return (
        <div className="hover__icons">
            {
                !deleteLength ||

                <button className="button-stroke-red panel__button demo" onClick={deleteClick}>
                    {/* {isLoading.bulkDeleteMc ? <Loading /> : */}
                    <>
                        <span>{deleteLength <= 1 ? "Delete" : `Delete All ${deleteLength}`}</span>
                        <svg className="icon icon-trash">
                            <use xlinkHref="#icon-trash"></use>
                        </svg>
                    </>
                    {/* } */}
                </button>
            }
        </div>
    )
}

export default DeleteButton