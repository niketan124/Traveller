import React from 'react'
import NotFoundImg from '../images/404.jpg'

const PageNotFound = () => {
    return (
        <div style={{ color: 'black' }}>
            <img src={NotFoundImg} alt='img-not-found' />
        </div>
    )
}

export default PageNotFound