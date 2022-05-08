import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5)
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && navigate('/login');
        return () => clearInterval(interval)
    }, [count, navigate])
    return (
        <div
            style={{
                marginTop: "100px",
                alignContent: "center",
                justifyContent: "center",
            }}
        >
            <Spinner />
            <h5>Redirecting you to login page in {count} seconds... </h5>
        </div>
    );
}

export default LoadingToRedirect