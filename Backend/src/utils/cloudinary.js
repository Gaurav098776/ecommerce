import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localfFilePath)=>{
  try{
     if(!localfFilePath) return null
     //upload the file on cloudinary
     const response =  await cloudinary.uploader.upload(localfFilePath,{
      resource_type:'auto'
     })
     // file has been uploaded sucessfully
    //  console.log('file is uploaded on cloudinary',response.url);
    fs.unlinkSync(localfFilePath)
     return response;
     
  }catch (error){
     fs.unlinkSync(localfFilePath) //remove the locally saved temporary file as the upload operation got filed
     return null;
  }
}

export {uploadOnCloudinary}



