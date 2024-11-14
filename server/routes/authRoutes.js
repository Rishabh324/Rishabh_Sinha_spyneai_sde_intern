const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");

//routes
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and management routes
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's registration data
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - email
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               description: The user's username
 *             email:
 *               type: string
 *               description: The user's email address
 *             password:
 *               type: string
 *               description: The user's password
 *     responses:
 *       201:
 *         description: Successfully registered the user
 *       409:
 *         description: user exist
 *       500:
 *          description: User already exists
 */
router
    .route('/register')
    .post(authController.registerController);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login a user
 *     description: Login a user with email and password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's login credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: The user's email address
 *             password:
 *               type: string
 *               description: The user's password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Unauthorized access (invalid or missing token)
 */
router
    .route('/login')
    .post(authController.loginController);

/**
 * @swagger
 * /currentUser:
 *   get:
 *     tags: [Auth]
 *     summary: Get the current logged-in user's data
 *     description: Fetch the user data of the currently logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *       404:
 *         description: User not found
 *       500:
 *         description: Unauthorized access (invalid or missing token)
 */
router
    .route('/currentUser')
    .get(authMiddleware, authController.getCurrentUser);

module.exports = router;