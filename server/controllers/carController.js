const carModel = require("../models/carModel");
const userModel = require("../models/userModel");
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const multer = require('multer'); // Temporarily store files in 'uploads' folder

const upload = multer({ dest: 'uploads/' }); // Upload up to 10 images
// Route to handle multiple image uploads
exports.uploadCarImages = async (req, res, next) => {
  try {
        upload.array('imgsUrl', 10)(req,res, async()=>{
            const uploadPromises = req.body.imgsUrl?.map((file) => {
                return cloudinary.uploader.upload(file, {
                    folder: 'uploads' // Optional folder name in Cloudinary
                });
            });
            
            // Use Promise.all to wait for all images to upload
            const results = await Promise.all(uploadPromises?.map(p => p.catch(e => e)));
            // Remove temporary files from server after upload
            // req.files.forEach((file) => fs.unlinkSync(file.path));
    
            // Collect the URLs of uploaded images
            const imageUrls = results?.map((result) => result.secure_url);
            // Respond with the Cloudinary URLs
            req.body.imgsUrl = imageUrls;
    
            next();
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyCars = async (req,res) => {
    try{
        //validating the user
        const user = await userModel.findOne({ _id: req.body.id });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        // fetching the cars created by the user
        const data = await carModel.find({ createdBy: user._id });

        res.status(200).json({
            status: "Success",
            message: "Cars fetched successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'

            },
            data
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at getExpenses API",
            err
        })
    }
};

exports.getCarDetails = async (req,res) => {
    try{
        //validating the user
        const user = await userModel.findOne({ _id: req.body.id });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        // fetching the cars created by the user
        const data = await carModel.findOne({ createdBy: user._id, _id: req.params.id });

        res.status(200).json({
            status: "Success",
            message: "Cars fetched successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at getExpenses API",
            err
        })
    }
};

exports.createCar = async (req,res) => {
    try{
        //validating the user
        console.log(req.body, 111);
        const user = await userModel.findOne({ _id: req.body.id});
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        // //creating the car
        req.body.createdBy = user._id;
        console.log(req.body, 122);
        const car = await carModel.create(req.body);        
        res.status(200).json({
            status: "Success",
            message: "Car created successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            car
        }
    );
    } catch(err){
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at createCar API",
            err
        })
    }
}

exports.deleteCar = async (req, res) => {
  try {
    //validating the user
    const user = await userModel?.findOne({ _id: req.body.id });
    if (!user) {
        return res.status(404).json({
            status: "failed",
            message: "User not found"
        })
    }
    const { id } = req.params;

    // Step 1: Fetch the car details from the database using the carId
    const car = await carModel.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Step 2: Delete associated images from Cloudinary
    const publicIds = car.imgsUrl?.map((url) => {
      // Extract public_id from the Cloudinary URL
      const parts = url.split('/');
      const fileName = parts[parts.length - 1];
      const publicId = fileName.split('.')[0];
      return `uploads/${publicId}`; // Assuming your images are in the 'uploads' folder
    });

    // Delete images from Cloudinary using Promise.all
    const deletePromises = publicIds?.map((publicId) => cloudinary.uploader.destroy(publicId));
    await Promise.all(deletePromises);

    // Step 3: Delete the car object from MongoDB
    await carModel.findByIdAndDelete(id);

    res.status(200).json({
        status: 'Success',
        message: 'Car and associated images deleted successfully.',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
    });
  } catch (error) {
    console.error('Error deleting car and images:', error);
    res.status(500).json({
      status: 'Failed',
      message: 'Error deleting car and images',
      error: error.message,
    });
  }
};

exports.updateCarDetails = async (req, res) => {
    try {
      const { id } = req.params; // Get the carId from URL parameters
      const { delImgs = [], ...updateData } = req.body; // Get fields to update and images to remove
  
      // Step 1: Find the car by ID
      const car = await carModel.findById(id);
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      
      // Step 2: Remove specified images from Cloudinary if any are to be removed
      if (delImgs.length > 0) {
        const deletePromises = delImgs?.map((url) => {
          const parts = url.split('/');
          const fileName = parts[parts.length - 1];
          const publicId = `uploads/${fileName.split('.')[0]}`;
          return cloudinary.uploader.destroy(publicId);
        });
  
        await Promise.all(deletePromises);
  
        // Remove the images from the imgsUrl array in the car object
        car.imgsUrl = car.imgsUrl?.filter((url) => !delImgs.includes(url));
      }
  
      // Step 3: Handle new image uploads if any new images are provided
      if (req.body.newImgs && req.body.newImgs.length > 0) {
        const uploadPromises = req.body.newImgs?.map((base64Image) => {
          return cloudinary.uploader.upload(base64Image, {
            folder: 'uploads', // Optional: specify the folder in Cloudinary
          });
        });
  
        const uploadResults = await Promise.all(uploadPromises);
        const newImageUrls = uploadResults?.map((result) => result.secure_url);
  
        // Append new images to the existing ones
        car.imgsUrl = [...car.imgsUrl, ...newImageUrls];
      }
  
      // Step 4: Update other fields
      Object.keys(updateData).forEach((key) => {
        if(key!=="imgsUrl") {
            car[key] = updateData[key];
        }
      });
  
      // Save the updated car document
         const updatedCar = await carModel.findOneAndUpdate(
            { _id: id },             // Find car by ID
            { $set: car },      // Update fields (you can add conditions or specific fields to update here)
            { new: true, runValidators: true } // `new: true` returns the updated document
        );

        if (!updatedCar) {
            return res.status(404).json({
                status: "failed",
                message: "Car not found."
            });
        }
      res.status(200).json({
        status: 'Success',
        message: 'Car updated successfully.',
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        car: updatedCar,
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({
        status: 'Failed',
        message: 'Error updating car details',
        error: error.message,
      });
    }
  };

exports.searchCar = async (req,res) => {
    try{
        //validating the user
        const user = await userModel?.findOne({ _id: req.body.id });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }

        const carData = await carModel.aggregate([
            {
                $search: {
                    index: "default",
                    text: {
                        query: req.params.text,
                        path: ["carTitle", "carDescription", "tags"]
                    }
                }
            },
            {
                $match: {
                    createdBy: user._id // Limit to the user's cars
                }
            }
        ]);

        res.status(200).json({
            status: "Success",
            message: "Cars fetched successfully.",
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization'
            },
            data: carData
        });

    } catch(err){
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at search API",
            err
        })
    }
}