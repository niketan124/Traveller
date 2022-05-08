import React, { useState } from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from 'react-redux'
import { setLogOut } from "../../redux/feature/authSlice";
import { searchTours } from "../../redux/feature/tourSlice";
import { useNavigate } from "react-router-dom";
import decode from 'jwt-decode'

const Header = () => {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("")
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const token = user?.token

    if (token) {
        const decodedToken = decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            dispatch(setLogOut())
        }
    }

    const handleLogout = () => {
        dispatch(setLogOut())
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (search) {
            dispatch(searchTours(search))
            navigate(`/tours/search?searchQuery=${search}`)
            setSearch("")
        } else {
            navigate('/')
        }
    }

    return (
        <MDBNavbar className="container-fluid" fixed="top" expand='lg' bgColor="black" style={{ backgroundColor: '#f0e6ea' }}>
            <MDBContainer className="container-fluid">
                <MDBNavbarBrand href="/" style={{ color: "white", fontWeight: "600", fontSize: "22px" }}>
                    Traveller
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type="button"
                    aria-expanded='false'
                    aria-label="Toogle navigation"
                    onClick={() => setShow(!show)}
                >
                    <MDBIcon icon="bars" fas color="white" />
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
                        {user?.result?._id && (
                            <h5 style={{ marginRight: '30px', marginTop: "27px", color: "white" }}>
                                Logged as: <span style={{ color: '#08D9D6' }}>{user?.result?.name}</span>
                            </h5>
                        )}
                        <MDBNavbarItem>
                            <MDBNavbarLink href="/">
                                <p className="header-text">Home</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        {user?.result?._id && (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/addTour">
                                        <p className="header-text">Add Tour</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                                <MDBNavbarItem>
                                    <MDBNavbarLink href="/dashboard">
                                        <p className="header-text">Dashboard</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        )}
                        {user?.result?._id ? (
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text" onClick={handleLogout}>Logout</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        ) :
                            <MDBNavbarItem>
                                <MDBNavbarLink href="/login">
                                    <p className="header-text">Login</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        }
                    </MDBNavbarNav>
                    <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
                        <input
                            type='text'
                            className='form-control'
                            placeholder="Search Tour"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div style={{ marginTop: '5px', marginLeft: '5px' }}>
                            <MDBIcon style={{ color: 'white' }} fas icon="search" />
                        </div>
                    </form>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
};

export default Header;
