import  joi  from 'joi'

const admin_p_sub_CategorySchema = joi.object({
  catid: joi.string().min(2).max(5).required(),
  catname :  joi.string().min(2).max(20).required(),
  startdate : joi.date().iso().required()
}).unknown(true)

const validateSchema =  (req,res,next) => {
  const {error}  =  admin_p_sub_CategorySchema.validate(req.body);
  if (error){
    console.log(error);
    // 400 status code clearly communicate to the client that their request was incorrect.
    res.status(400).send(error.message);
  }else{
    next()
  }
}

export {validateSchema};