const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createCar, getMyCars, getCarDetails, uploadCarImages, updateCarDetails, deleteCar, searchCar } = require("../controllers/carController");

//routes
router
    .route('/create-car')
    .post(authMiddleware, uploadCarImages, createCar);
    
router
    .route('/my-cars')
    .get(authMiddleware, getMyCars);

router
    .route('/edit/:id')
    .patch(authMiddleware, uploadCarImages, updateCarDetails);

router
    .route('/my-cars/:id')
    .get(authMiddleware, getCarDetails);

router
    .route('/search/:text')
    .get(authMiddleware, searchCar);

router
    .route('/delete-car/:id')
    .delete(authMiddleware, deleteCar);

module.exports = router;