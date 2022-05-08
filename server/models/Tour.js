import mongoose from 'mongoose';

const tourShema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: [String],
        default: [],
    },
})


const TourModel = mongoose.model("Tour", tourShema);


export default TourModel;