import express from 'express'
import DataBase_Connection from './db/db.js';
import StaticPage from './routes/staticPages.route.js';
import AuthRouter from './routes/userAuth.route.js';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import BlogRouter from './routes/blog.route.js';
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();


app.set("view engine","ejs");
app.set("views", path.resolve("./views"))

app.use(cookieParser());
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.use(express.static("public"));

app.use("/",StaticPage);
app.use("/auth/api",AuthRouter);
app.use("/blog",BlogRouter);

DataBase_Connection()
.then(()=>{
   
    console.log(`Database Connected Successfully !!!`);

    app.listen(PORT,()=>{
      console.log(`Server Running at http://localhost:${PORT}`);
    });
})
