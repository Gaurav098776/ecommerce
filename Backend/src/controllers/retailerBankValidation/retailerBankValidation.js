import joi from 'joi';

const retailerBankSchema = joi.object({
  retid: joi.string().min(3).max(20).required(),
  accountno: joi.string().max(40).required(),
  bankname: joi.string().max(45).required(),
  branchname: joi.string().max(24).required(),
  ifsc: joi.string().max(6).required(),
  branchcode: joi.string().max(6).required(),
  accountholdername: joi.string().max(50).required(),
}).unknown(true);

const validateSchema = (req, res, next) => {
  console.log(req.params);
  
  const { error } = retailerBankSchema.validate(req.body,req.params);
  if (error) {
    console.log(error);
    res.status(400).send(error.message); // Sends a 400 Bad Request response with the error message.
  } else {
    next(); // Proceed to the next middleware or route handler if validation succeeds.
  }
};

export { validateSchema };
