import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBCardImage,
    MDBContainer,
    MDBIcon,
    MDBBtn
} from 'mdb-react-ui-kit'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { getRelatedTours, getTour } from '../redux/feature/tourSlice'
import Spinner from '../component/Spinner/Spinner'
import RelatedTours from '../component/RelatedTours/RelatedTour'
import DisqusThread from '../component/Disqus/DisqusThread'
import { useNavigate } from 'react-router-dom'

const SingleTour = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { tour, loading, relatedTours } = useSelector((state) => ({ ...state.tour }))
    const tags = tour?.tags

    useEffect(() => {
        tags && dispatch(getRelatedTours(tags))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])


    const { id } = useParams()
    useEffect(() => {
        if (id) {
            dispatch(getTour(id))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const [color, setColor] = useState("");

    const bodyColors = [
        '#EFFFFD', '#BFFFF0', '#F7F7F7', '#FFFCDC', '#FEE3EC', '#EDD2F3', '#FDEFEF', '#F7DBF0', '#D0E8F2'
    ]

    useEffect(() => {
        var randomItem = bodyColors[Math.floor(Math.random() * bodyColors.length)]
        setColor(randomItem)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <Spinner />
    }


    return (
        <>
            <MDBContainer style={{ marginTop: '5.5rem' }}>
                <MDBCard className='mb-3 mt-2 lower-body' style={{ backgroundColor: '#83839f26' }}>
                    <MDBCardImage position='top' style={{
                        width: '100%',
                        maxHeight: '600px'
                    }} src={tour?.imageFile} alt={tour?.title} />
                    <MDBCardBody style={{ backgroundColor: `${color}` }}>
                        <MDBBtn tag='a' color='none' style={{ float: 'left', color: '#000' }} onClick={() => navigate('/')}>
                            <MDBIcon fas size='lg' icon='long-arrow-alt-left' style={{ float: 'left' }} />
                        </MDBBtn>
                        <h3>{tour?.title}</h3>
                        <span>
                            <p className='text-start tourName'>
                                Created By: {tour?.name}
                            </p>
                        </span>
                        <div style={{ float: 'left' }}>
                            <span className='text-start'>
                                {tour && tour.tags && tour.tags.map((item) => `#${item}`)}
                            </span>
                        </div>
                        <br />
                        <MDBCardText className='text-start mt-2'>
                            <MDBIcon style={{ float: 'left', margin: '6px' }}
                                far icon='calendar-alt' size='lg' />
                            <small className='text-muted'>{moment(tour?.createdAt).fromNow()}</small>
                        </MDBCardText>
                        <MDBCardText className='lead mb-0 text-start'>
                            {tour?.description}
                        </MDBCardText>
                    </MDBCardBody>
                    <RelatedTours relatedTours={relatedTours} tourId={id} />
                </MDBCard>
                <DisqusThread id={id} title={tour.title} path={`/tour/${id}`} />
            </MDBContainer>
        </>
    )
}

export default SingleTour