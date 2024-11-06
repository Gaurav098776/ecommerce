import Joi from 'joi';

const adminUserSchema = Joi.object({
  userid: Joi.string().min(2).max(5).required(),
  username: Joi.string().min(2).max(20).required(),
  password: Joi.string().min(6).required(), // Assuming password should be a string and have a minimum length
  email: Joi.string().email().required() // Added email validation
}).unknown(true);

const validateSchema = (req, res, next) => {
  const { error } = adminUserSchema.validate(req.body);
  if (error) {
    console.log(error);
    // 400 status code clearly communicates to the client that their request was incorrect.
    res.status(400).send(error.details[0].message); // Send the first error message
  } else {
    next();
  }
};

export { validateSchema };
