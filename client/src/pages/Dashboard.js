import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteTour, getToursByUser } from '../redux/feature/tourSlice'
import Spinner from '../component/Spinner/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const { user } = useSelector((state) => ({ ...state.auth }))
    const { userTours, loading } = useSelector((state) => ({ ...state.tour }))
    const userId = user?.result?._id
    const navigate = useNavigate()
    useEffect(() => {
        if (userId) {
            dispatch(getToursByUser(userId))
        }
        // eslint-disable-next-line
    }, [userId])

    const dispatch = useDispatch()

    const excerpt = (str) => {
        if (str.length > 40) {
            str = str.substring(0, 45) + "..."
        }
        return str
    }


    const [color, setColor] = useState("");

    const bodyColors = [
        '#EFFFFD', '#BFFFF0', '#F7F7F7', '#FFFCDC', '#FEE3EC', '#EDD2F3', '#FDEFEF', '#F7DBF0', '#D0E8F2'
    ]

    useEffect(() => {
        var randomItem = bodyColors[Math.floor(Math.random() * bodyColors.length)]
        setColor(randomItem)
        // eslint-disable-next-line
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this tour ? It will delete permanently and can't be retrieved again!")) {
            dispatch(deleteTour({ id, toast }))
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='container-fluid' style={{
            margin: 'auto',
            padding: '120px',
            maxWidth: '900px',
            alignContent: 'center'
        }}>
            {userTours.length === 0 && (
                <div>
                    <h3>
                        No tour available with the user: <span style={{ color: '#00ff00' }}>{user?.result?.name}</span>
                    </h3>
                    <MDBBtn
                        style={{ marginTop: '100px' }}
                        rounded
                        color='info'
                        onClick={() => navigate('/addTour')} >
                        Create Tour
                    </MDBBtn>
                </div>
            )}

            {userTours.length > 0 && (
                <>
                    <h4 className='text-center'>Dashboard: {user?.result?.name}</h4>
                    <hr style={{ maxWidth: '570px' }} />
                </>
            )}

            {userTours && userTours.map((item) => (
                <MDBCardGroup key={item._id} >
                    <MDBCard style={{ maxWidth: '600px' }} className='mt-2'>
                        <MDBRow className='g-0'>
                            <MDBCol md='4' style={{ backgroundColor: `${color}` }}>
                                <MDBCardImage className='rounded'
                                    src={item.imageFile}
                                    alt={item.title}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol md='8' style={{ backgroundColor: `${color}` }}>
                                <MDBCardBody style={{ backgroundColor: `${color}` }}>
                                    <MDBCardTitle className='text-start'>
                                        {item?.title}
                                    </MDBCardTitle>
                                    <MDBCardText className='text-start'>
                                        <small className='text-muted'>
                                            {excerpt(item?.description)}
                                        </small>
                                    </MDBCardText>
                                    <div style={{ marginLeft: '5px', float: 'right', marginTop: '-50px' }}>
                                        <MDBBtn className='mt-1' tag='a' color='none'>
                                            <MDBIcon
                                                fas
                                                icon='trash'
                                                style={{ color: '#dd4b39' }}
                                                size='lg'
                                                onClick={() => handleDelete(item?._id)}
                                            />
                                        </MDBBtn>
                                        <Link to={`/editTour/${item?._id}`} >
                                            <MDBIcon fas icon='edit' style={{ color: '#55acee', marginLeft: '10px' }} size='lg' />
                                        </Link>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default Dashboard