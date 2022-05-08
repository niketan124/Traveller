import React, { useState, useEffect } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBValidation,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTour, updateTour } from '../redux/feature/tourSlice';
import { useParams } from 'react-router-dom';

const initialState = {
    title: "",
    description: "",
    tags: []
}

const AddEditTour = () => {
    const dispatch = useDispatch()
    const [tourData, setTourData] = useState(initialState)
    const [tagError, setTagError] = useState(null)
    const { title, description, tags } = tourData
    const { id } = useParams();



    const { error, userTours } = useSelector((state) => ({ ...state.tour }))
    const { user } = useSelector((state) => ({ ...state.auth }))
    const navigate = useNavigate()

    useEffect(() => {
        if (id) {
            const singleTOur = userTours.find((tour) => tour._id === id)
            setTourData({ ...singleTOur })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    useEffect(() => {
        error && (
            toast.error(error)
        )
    }, [error])

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setTourData({ ...tourData, [name]: value })
    }
    const handleTag = (tag) => {
        setTagError(null)
        setTourData({ ...tourData, tags: [...tourData.tags, tag] })
    }

    const handleDeleteTag = (deleteTag) => {
        setTourData({ ...tourData, tags: tourData.tags.filter((tag) => tag !== deleteTag) })
    }
    const handleClear = () => {
        setTourData({
            title: "",
            description: "",
            tags: []
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!tags.length) {
            setTagError("Please provide some tags")
        }
        if (title && description && tags) {
            const updatedTourData = { ...tourData, name: user?.result?.name }
            if (!id) {
                dispatch(createTour({ updatedTourData, navigate, toast }))
            } else {
                dispatch(updateTour({ id, updatedTourData, toast, navigate }))
            }
            handleClear()
        }
    }
    return (
        <div className='container-fluid container'
            style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "450px",
                alignItems: "center",
                marginTop: "120px",
            }}
        >
            <MDBCard alignment='center'>
                <h5>{id ? "Update Tour" : "Add Tour"}</h5>
                <MDBCardBody>

                    <MDBValidation onSubmit={handleSubmit} className='row g-3' noValidate>
                        <div className='col-md-12'>
                            <MDBInput
                                placeholder='Enter Title'
                                type='text'
                                name='title'
                                value={title || ''}
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                validation="Please provide title"
                            />
                        </div>
                        <div className='col-md-12'>
                            <MDBInput
                                style={{ height: '100px' }}
                                placeholder='Enter Description'
                                type='text'
                                name='description'
                                value={description}
                                onChange={onInputChange}
                                className="form-control"
                                required
                                invalid
                                textarea
                                validation="Please provide description"
                                rows={4}
                            />
                        </div>
                        <div className='col-md-12' style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <ChipInput
                                name="tags"
                                variant='outlined'
                                placeholder='Enter Tag'
                                fullWidth
                                value={tags}
                                onAdd={(tag) => handleTag(tag)}
                                onDelete={(tag) => handleDeleteTag(tag)}
                            />
                            {tagError && (
                                <div className='tagErrorMsg'>
                                    {tagError}
                                </div>
                            )}
                        </div>
                        <div className='d-flex justify-content-start'>
                            <FileBase
                                type='file'
                                multiple={false}
                                onDone={(({ base64 }) => setTourData({ ...tourData, imageFile: base64 }))} />
                        </div>
                        <div className='col-12'>
                            <MDBBtn
                                style={{ width: '100%' }}
                            >{id ? "Update" : "Submit"}</MDBBtn>
                            <MDBBtn

                                style={{ width: '100%' }}
                                className='mt-2'
                                color='danger'
                                onClick={handleClear}
                            >Clear</MDBBtn>
                        </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditTour