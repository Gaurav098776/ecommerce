import  joi  from 'joi'

const admin_roleSchema = joi.object({
  role_id: joi.string().min(2).max(5).required(),
  role_name:  joi.string().min(2).max(20).required(),
  
}).unknown(true)

const validateSchema =  (req,res,next) => {
  const {error}  =  admin_roleSchema.validate(req.body);
  if (error){
    console.log(error);
    // 400 status code clearly communicate to the client that their request was incorrect.
    res.status(400).send(error.message);
  }else{
    next()
  }
}

export {validateSchema};