import React, { useEffect } from 'react'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography
} from 'mdb-react-ui-kit'

import { useDispatch, useSelector } from 'react-redux'
import { getTours, setCurrentPage } from '../redux/feature/tourSlice'
import CardTour from '../component/CardTour/CardTour'
import Spinner from '../component/Spinner/Spinner'
import Pagination from '../component/pagination/Pagination'
import { useLocation } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const { tours, loading, currentPage, numberOfPages } = useSelector((state) => ({ ...state.tour }))
    const dispatch = useDispatch()
    const location = useLocation()
    const query = useQuery()
    useEffect(() => {
        dispatch(getTours(currentPage))
        // eslint-disable-next-line
    }, [currentPage])

    if (loading) {
        return <Spinner />
    }

    const searchQuery = query.get("searchQuery")


    return (
        <div
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "1000px",
                alignContent: "center",
            }}
            className="container-fluid"
        >
            <MDBRow className="mt-5">
                {tours.length === 0 && location.pathname === '/' && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        No Tours Found
                    </MDBTypography>
                )}

                {tours.length === 0 && location.pathname !== '/' && (
                    <MDBTypography className="text-center mb-0" tag="h2">
                        We didn't found any matches for <span style={{ color: '#00ff00' }}>"{searchQuery}"</span>
                    </MDBTypography>
                )}
                <MDBCol>
                    <MDBContainer>
                        <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                            {tours &&
                                tours.map((item, index) => (
                                    <CardTour key={index} {...item} />
                                ))}
                        </MDBRow>
                    </MDBContainer>
                </MDBCol>
            </MDBRow>
            {tours.length > 0 && !searchQuery && (
                <Pagination
                    setCurrentPage={setCurrentPage}
                    numberOfPages={numberOfPages}
                    dispatch={dispatch}
                    currentPage={currentPage}
                />
            )}
        </div>
    );
}

export default Home