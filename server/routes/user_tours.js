import express from 'express'
const router = express.Router();
import authMiddleware from '../middleware/authMiddleware.js';
import {
    createTour,
    deleteTour,
    getRelatedTours,
    getTour,
    getTours,
    getToursBySearch,
    getToursByTag,
    getToursByUser,
    likeTour,
    updateTour,
} from "../controllers/controller-tour.js";

router.get('/search', getToursBySearch)
router.get('/tag/:tag', getToursByTag)
router.post('/relatedTours', getRelatedTours)
router.get("/", getTours)
router.get("/:id", getTour)

router.post('/', authMiddleware, createTour)
router.delete("/:id", authMiddleware, deleteTour)
router.patch("/:id", authMiddleware, updateTour)
router.get("/userTours/:id", authMiddleware, getToursByUser)
router.patch("/like/:id", authMiddleware, likeTour)



export default router;