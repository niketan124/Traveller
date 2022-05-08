import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBCardGroup,
    MDBBtn,
    MDBIcon,
    MDBTooltip
} from 'mdb-react-ui-kit'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeTour } from '../../redux/feature/tourSlice'

const CardTour = ({ imageFile, description, title, tags, _id, name, likes }) => {

    const { user } = useSelector((state) => ({ ...state.auth }))
    const dispatch = useDispatch()
    const userId = user?.result?._id || user?.result?.googleId;

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_id])


    const Likes = () => {
        if (likes?.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>
                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip
                            tag="a"
                            title={`You and ${likes.length - 1} other people liked this tour`}
                        >
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? "s" : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        );
    };

    const handleLike = () => {
        dispatch(likeTour({ _id }));
    };

    return (
        <div className='container-fluid' style={{ margin: '20px 0' }}>
            <MDBCardGroup>
                <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: '20rem' }}>
                    <MDBCardImage
                        src={imageFile}
                        alt={title}
                        position='top'
                        style={{ maxWidth: '100%', height: '180px' }}
                    />
                    <div className='top-left' style={{ color: 'white' }}>
                        {name}
                    </div>
                    <MDBCardBody style={{ backgroundColor: `${color}` }}>
                        <span className='text-start tag-card' style={{ backgroundColor: `${color}` }}>
                            {tags.map((tag, indx) => (
                                <Link key={indx} to={`/tours/tag/${tag}`}> #{tag}</Link>
                            ))}

                        </span>
                        <MDBBtn style={{ float: 'right' }} tag='a' color='none' onClick={!user?.result ? null : handleLike}>
                            {!user?.result ? (
                                <MDBTooltip title="please login to like!" tag='a' >
                                    <Likes />
                                </MDBTooltip>
                            ) :
                                <Likes />
                            }
                        </MDBBtn>
                        <br />
                        <MDBCardTitle className='text-start' style={{ marginTop: '5px' }}>{title}</MDBCardTitle>
                        <MDBCardText className='text-start'>{excerpt(description)}
                            <Link to={`/tour/${_id}`} >Read More</Link>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </MDBCardGroup>
        </div>
    )
}

export default CardTour