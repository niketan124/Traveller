import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBCardGroup
} from 'mdb-react-ui-kit'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../component/Spinner/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getToursByTag } from '../redux/feature/tourSlice'

const TagTours = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { tagTours, loading } = useSelector((state) => ({ ...state.tour }))
    const { tag } = useParams()
    useEffect(() => {
        if (tag) {
            dispatch(getToursByTag(tag))
        }
        // eslint-disable-next-line
    }, [tag])

    const excerpt = (str) => {
        if (str.length > 45) {
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

    if (loading) {
        return <Spinner />
    }


    return (
        <div className='container-fluid' style={{
            margin: "auto",
            padding: "120px",
            maxWidth: '900px',
            alignContent: 'center'
        }}>
            <h3 className='text-center'>Tours with tag: <span style={{ color: '#00ff00' }}>{tag}</span></h3>
            <hr style={{ maxWidth: '570px' }} />
            {tagTours && tagTours.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: '600px', backgroundColor: `${color}` }} className='h-100 mt-2 d-sm-flex' >
                        <MDBRow className='g-0'>
                            <MDBCol md='4'>
                                <MDBCardImage
                                    className='rounded'
                                    src={item.imageFile}
                                    alt={item.title}
                                    fluid
                                />
                            </MDBCol>
                            <MDBCol md='8'>
                                <MDBCardBody>
                                    <MDBCardTitle className='text-start' >{item.title}</MDBCardTitle>
                                    <MDBCardText className='text-start'>{excerpt(item.description)}</MDBCardText>
                                    <div style={{ float: 'left', marginTop: '-10px' }}>
                                        <MDBBtn
                                            onClick={() => navigate(`/tour/${item._id}`)}
                                            size='sm'
                                            rounded
                                            color='info'>Read More</MDBBtn>
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

export default TagTours