import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from './routes/posts.js'

const app = express();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//Routes
app.use('/posts', postRoutes)

const CONNECTION_URL = 'mongodb+srv://Backend2020:nyuma2020@cluster0.u7bhtdr.mongodb.net/?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5003;

mongoose.connect(CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))).catch((error) => console.log(error.message));
