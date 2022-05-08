import React, { useEffect, useState } from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const RelatedTours = ({ relatedTours, tourId }) => {
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


    return (
        <>
            <div style={{ marginTop: '20px' }}>
                {relatedTours && relatedTours.length > 0 && (
                    <>
                        {relatedTours.length > 1 && <h4>Related Tours</h4>}
                        <MDBRow className="row-cols-1 row-cols-md-3 g-4" style={{ marginTop: '20px' }}>
                            {relatedTours
                                .filter((item) => item._id !== tourId)
                                .splice(0, 3)
                                .map((item) => (
                                    <MDBCol>
                                        <MDBCard style={{ backgroundColor: `${color}` }}>
                                            <Link to={`/tour/${item._id}`}>
                                                <MDBCardImage
                                                    src={item.imageFile}
                                                    alt={item.title}
                                                    position="top"
                                                />
                                            </Link>
                                            <span className="text-start tag-card">
                                                {item.tags.map((tag) => (
                                                    <Link to={`/tours/tag${tag}`}> #{tag}</Link>
                                                ))}
                                            </span>
                                            <MDBCardBody style={{ backgroundColor: `${color}` }}>
                                                <MDBCardTitle className="text-start">
                                                    {item.title}
                                                </MDBCardTitle>
                                                <MDBCardText className="text-start">
                                                    {excerpt(item.description)}
                                                </MDBCardText>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </MDBCol>
                                ))}
                        </MDBRow>
                    </>
                )}
            </div>
        </>
    );
};

export default RelatedTours;