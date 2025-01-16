import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
  origin: 'http://localhost:5173', // specify your frontend origin here
  credentials: true, // Allow credentials (cookies) to be included in requests
}));

app.use(express.json({limit:"16kb"}))

// when you get data from url
app.use(express.urlencoded({extended:true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//routes import 
import userRouter from './routes/adminUser.js'
import categoryRouter from "./routes/admin_p_Category.js"
import roleRouter from './routes/adminRoles.js'
import roleAssignRouter from './routes/adminRoleAssign.js'
import subCategoryRouter from './routes/admin_p_subCategory.js'
import protectedRoute from './routes/protected.Routes.js'

//retailer route
import retailerRouter from './routes/retailer.Route.js'
import retailerProductRouter from './routes/retailerProduct.js'
import retailerBank from './routes/retailerBank.Route.js'

//routes declaration 
app.use("/api/v1/users",userRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/roles",roleRouter)
app.use("/api/v1/rolesAssign",roleAssignRouter)
app.use("/api/v1/subcategory",subCategoryRouter)
app.use("/api/v1/protected",protectedRoute)
app.use("/api/v1/retailer",retailerRouter)
app.use("/api/v1/retailerProduct",retailerProductRouter)
app.use("/api/v1/retailerbank",retailerBank)



export { app }