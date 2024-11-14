const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createCar, getMyCars, getCarDetails, uploadCarImages, updateCarDetails, deleteCar, searchCar } = require("../controllers/carController");

/**
 * @swagger
 * /create-car:
 *   post:
 *     summary: Create a new car
 *     description: Creates a new car in the database. Requires authentication.
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carTitle:
 *                 type: string
 *               carModel:
 *                 type: string
 *               carDescription:
 *                 type: string
 *               imgsUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               createdBy:
 *                 type: string
 *             required:
 *               - carTitle
 *               - carModel
 *               - imgsUrl
 *               - createdBy
 *     responses:
 *       200:
 *         description: Car created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access  
 *       404:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router
    .route('/create-car')
    .post(authMiddleware, uploadCarImages, createCar);

/**
 * @swagger
 * /my-cars:
 *   get:
 *     summary: Get all cars created by the authenticated user
 *     description: Fetches the list of cars created by the authenticated user.
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: List of cars
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: No cars found
 *       500:
 *         description: Server error
 */
router
    .route('/my-cars')
    .get(authMiddleware, getMyCars);

/**
 * @swagger
 * /edit/{id}:
 *   patch:
 *     summary: Update car details
 *     description: Updates the details of an existing car by ID. You can update title, description, or images.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carTitle:
 *                 type: string
 *               carModel:
 *                 type: string
 *               carDescription:
 *                 type: string
 *               imgsUrl:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               createdBy:
 *                 type: string
 *             required:
 *               - carTitle
 *               - carModel
 *               - imgsUrl
 *               - createdBy
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router
    .route('/edit/:id')
    .patch(authMiddleware, uploadCarImages, updateCarDetails);

/**
 * @swagger
 * /my-cars/{id}:
 *   get:
 *     summary: Get details of a specific car
 *     description: Fetches details of a car using the car's ID.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car details fetched successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router
    .route('/my-cars/:id')
    .get(authMiddleware, getCarDetails);

/**
 * @swagger
 * /search/{text}:
 *   get:
 *     summary: Search for cars
 *     description: Searches for cars by title, description, or tags.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: text
 *         required: true
 *         description: Search query (can be a keyword in title, description, or tags)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of cars matching the search criteria
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: No cars found
 *       500:
 *         description: Server error
 */
router
    .route('/search/:text')
    .get(authMiddleware, searchCar);

/**
 * @swagger
 * /delete-car/{id}:
 *   delete:
 *     summary: Delete a car
 *     description: Deletes a car by ID. The car's details will be permanently removed.
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Server error
 */
router
    .route('/delete-car/:id')
    .delete(authMiddleware, deleteCar);

module.exports = router;
