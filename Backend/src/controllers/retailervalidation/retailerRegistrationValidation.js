import  joi  from 'joi'

const retailerSchema = joi.object({
  retid: joi.string().min(3).max(8).required(), // Assuming retid is an integer
  retregno: joi.string().required().max(20), // Retailer registration number (string, 20 chars max)
  retname: joi.string().required().max(100), // Retailer name (string, max length 100)
  contactno: joi.string().pattern(/^[0-9]{10}$/).required(), // Contact number (10 digits)
  alternatecontact: joi.string().allow(null,'').pattern(/^[0-9]{10}$/).optional(), // Alternate contact number (10 digits, optional)
  address: joi.string().max(255).required(), // Address (string, max length 255)
  state: joi.string().max(50).required(), // State (string, max length 50)
  city: joi.string().max(50).required(), // City (string, max length 50)
  pincode: joi.string().pattern(/^[0-9]{6}$/).required(), // Pincode (6 digits)
  email: joi.string().email().required(), // Email address
  url: joi.string().allow(null,'').uri().optional(), // Website URL (optional)
  pan: joi.string().pattern(/[A-Z]{5}[0-9]{4}[A-Z]{1}/).required(), // PAN number (specific pattern)
  password: joi.string().min(6).max(20).required(), // Password (8-20 characters)
  status: joi.string().valid('active', 'inactive').required(), // Status (can be 'active' or 'inactive')
  registeron: joi.date().required() // Registration date (ISO date format)
}).unknown(true)

const validateSchema =  (req,res,next) => {
  const {error}  =  retailerSchema.validate(req.body);
  if (error){
    console.log(error);
    // 400 status code clearly communicate to the client that their request was incorrect.
    res.status(400).send(error.message);
  }else{
    next()
  }
}

export {validateSchema};