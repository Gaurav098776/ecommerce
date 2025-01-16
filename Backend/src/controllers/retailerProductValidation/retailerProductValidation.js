import joi from 'joi';

const retailerProductSchema = joi.object({
  pid : joi.string().min(3).max(8).required(),
  sub_catid: joi.string().min(1).max(5).required(),
  retid: joi.string().min(2).max(8).required(),
  productname: joi.string().min(2).max(30).required(),
  price: joi.number().positive().required(),
  qty: joi.number().integer().min(0).required(),
  company: joi.string().min(2).max(50).required(),
  updatedon: joi.string().isoDate().optional(),
  // productphoto: joi.string().uri().required(),  // or use `.string().required()` if not using URI
}).unknown(true);

const validateSchema = (req, res, next) => {
  console.log(req.body)
  const { error } = retailerProductSchema.validate(req.body);
  console.log('bb',req.body);
 
  
  if (error) {
    console.log(error);
    // 400 status code clearly communicates to the client that their request was incorrect.
    res.status(400).send(error.message);
  } else {
    next();
  }
};

export { validateSchema };
