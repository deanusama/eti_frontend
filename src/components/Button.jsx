import React from 'react'

const Button = ({ buttonText, loading, isEditMode }) => {
    return (
        <button className="button entry__button" type='submit' disabled={loading}>
            {loading ? 'Loading...' : `${isEditMode ? "save" : buttonText}`}
        </button>
    )
}

export default Button