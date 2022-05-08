import React, { useState, useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { register } from '../redux/feature/authSlice';

const initialState = {
    firstName: "",
    lastNAme: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Register = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }))
    const { firstName, lastName, email, password, confirmPassword } = formValue
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        error && toast.error(error)
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!firstName && !lastName && !password && !email) {
            toast.error("Please provide required details to register")
        }
        if (password !== confirmPassword) {
            toast.error("Password and Confirm Password should be same")
        }
        if (email && password && firstName && lastName && confirmPassword) {
            dispatch(register({ formValue, navigate, toast }))
        }
    }
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }
    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignItems: "center",
                marginTop: "120px",
            }}
        >
            <MDBCard alignment='center'>
                <MDBIcon fas icon='user-circle' className='fa-2x' />
                <h5>Sign Up</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                        <div className=''>
                            <MDBInput
                                icon='user'
                                label='First Name'
                                type='text'
                                value={firstName}
                                name='firstName'
                                onChange={onInputChange}
                                required
                                invalid
                                validation='please provide first name'
                                autoComplete='off'
                            />
                        </div>
                        <div className=''>
                            <MDBInput
                                icon='user'
                                label='Last Name'
                                type='text'
                                value={lastName}
                                name='lastName'
                                onChange={onInputChange}
                                required
                                invalid
                                validation='please provide last name'
                                autoComplete='off'
                            />
                        </div>
                        <div className='col-md-12'>
                            <MDBInput
                                icon='user'
                                label='Email'
                                type='email'
                                value={email}
                                name='email'
                                onChange={onInputChange}
                                required
                                invalid
                                validation='please provide your email'
                                autoComplete='off'
                            />
                        </div>
                        <div className='col-md-12'>
                            <MDBInput
                                label='Password'
                                type='password'
                                value={password}
                                name='password'
                                onChange={onInputChange}
                                required
                                invalid
                                validation='please provide your password'
                            />
                        </div>
                        <div className='col-md-12'>
                            <MDBInput
                                label='Password Confirm'
                                type='password'
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={onInputChange}
                                required
                                invalid
                                validation='please provide your password'
                            />
                        </div>
                        <div className='col-12'>
                            <MDBBtn style={{ width: '100%' }} className='mt-2'>
                                {loading && (
                                    <MDBSpinner
                                        size='sm'
                                        role='status'
                                        tag='span'
                                        className='me-1'
                                    />
                                )}
                                Register
                            </MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
                <MDBCardFooter>
                    <Link to='/login'>
                        <p>Already have an account ? Sign In</p>
                    </Link>
                </MDBCardFooter>
            </MDBCard>
        </div>
    );
}

export default Register