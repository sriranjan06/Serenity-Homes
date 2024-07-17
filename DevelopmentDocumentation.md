npm create vite@latest serenity-homes-ui
React, Javascript + SWC
install tailwindcss vite
follow tailwindcss vite documentation to install and set up the project
delete app.css file as it is not necessary
delete vite.svg under the public folder
delete react.svg under the assets folder
clear all contents under app.jsx and use the ES7 extension and do rafce
install autorename extension
install consoleninja extension
install prettier extension
install tailwind css intellisense
now, we create the pages and routes
inside src folder, create another folder called pages
inside pages, create About.jsx, Home.jsx, Profile,jsx, SignIn.jsx, SignUp.jsx
then install react-router-dom npm install react-router-dom
within the App.jsx file, import BrowserRouter, Routes and Route from react-router-dom
within App return, wrap everything in the <BrowserRouter></BrowserRouter> tag, then <Routes></Routes> tag
inside <Routes></Routes> list out each page as a <Route path="/" element={<Home />} />
inside the src folder, we create another folder called components
create first component Header.jsx, rafce and call the component within the App.jsx file
place the <Header /> within the <BrowserRouter> tags but above the <Routes> tag
begin designing the Header component. classify as left, center and right
structure -> <Header><div> {/_ left _/} {/_ center _/} {/_ right _/} </div></Header>
left will have the name <h1>Serenity Homes</h1> styled accordingly
center will have a <form> within which we have an <input type="text">
install react icons with npm install react-icons
use FaSearch icon
now, for the right part of the header/navbar, we create an unordered list <ul> and then list items <li> home, about and sign-in
import Link from react-router-dom
wrap each of the <li> within a <Link to="/"> tag to ensure that routing takes places in the SPA without loading
\\
let us create our api folder
go to the root directory of the project and type npm init -y
create a folder called serenity-homes-api
create an index.js file within the api folder
install express within the root directory of the project with the command npm install express
write this within the index.js in api folder
import express from 'express';
const app = express();

app.listen(3000, () => {
console.log("Server is running on port 3000");
})
got to root directory's package.json file and add type:"modules" after main:
now, to run the file, type node serenity-homes-api/index.js in root directory terminal
\\
to ensure that the api/server side auto reloads, we need a package called nodemon
npm install nodemon
got to root package.json and delete the "test" under "scripts"
write two new commands under "scripts"
"dev": "nodemon serenity-homes-api/index.js",
"start": "node serenity-homes-api/index.js"
now, npm run dev command will run nodemon and will start the server
nodemon is used to restart the server automatically each time any changes are made to it
mv .git ../ command is used to move the git tracking file from a child directory to a parent directory
move the .gitignore file from the child directory into the root directory of the project so that all the node modules aren't pushed into the github repository
npm install mongoose in root directory
go to chrome and go to mongodb.com and login
create a new cluster -> deployment -> database -> set up connection security -> set up connection method
in the set up connection method Add your connection string into your application code
now, come back to vscode and in the root directory create an environment variable file called .env
within .env create a variable called MONGO = "" copy paste your mongodb connection string into this variable
now, go to index.js under api and import mongoose from 'mongoose';
after importing, below the import statement write mongoose.connect(process.env.MONGO);
to be able to use the .env file, we need to install a package called dotenv
npm install dotenv and within the api/index.js file, import dotenv from 'dotenv';
configure the dotenv using dotenv.config();
\\
now, to ensure that the connection is estbalished to mongodb, modify the following:
mongoose.connect(process.env.MONGO).then(() => {
console.log("Connected to MongoDB!");
}).catch((err) => {
console.log(err);
})
\\
now you can see that the backend server is running without any issues
now go to your .gitignore file and add .env so that the .env file isn't pushed to github. the .env file contains our password
when you go to commit the file now, you can see that the .env file is not tracked for commit
push code to github
\\
within api create another folder called models
inside models, create a file called user.model.js
inside user.model.js -> import mongoose
set the rules of the Schema or model within this file
const User = mongoose.model('User', userSchema);
and then export default User
\\
we now create an api route
api/index.js
here, we write app.use('/api/user', userRouter);
under api, create a new folder called routes
under routes, create a new file called user.route.js
inside user.route.js
import express from "express";

const router = express.Router();

router.get('/test', (req, res) => {
res.json({
message: 'Hello World',
})
})

export default router;
now import userRouter from './routes/user.route.js' within api/index.js
in user.route.js, instead of declring the function within the router.get('/test', test) api, we need to call it from elsewhere
under serenity-homes-api, we create a new folder called controllers
api/controllers/user.controller.js
we write the test function declaration here
export const test = (req, res) => {
res.json({
message: 'How are you world?',
})
}
\\
now we create an api for the sign up page
create auth.route.js inside routes and write
import express from 'express';
const router = express.Router();
router.post("/signup")
create auth.controller.js under controller
export const signup = (req, res) => {
console.log(req.body);
}
create auth.route.js
import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup)

export default router;
in index. js import the necessary file
import authRouter from './routes/auth.route.js';
and call the api using: app.use('/api/auth', authRouter);
we now use insomnia for api route test
by default, we cannot send a JSON. we need to allow the JSON to be sent.
we can do this by going to index.js and adding app.use(express.json());
we can now see the json sent in the server terminal
we need to store this information, therefore we destructure the console.log in auth.controller.js and receive each variable so that we can store them in the database
the following is auth.controller.js now:
import User from '../models/user.model.js'

export const signup = async (req, res) => {
const { username, email, password } = req.body;
const newUser = new User({ username, email, password })
await newUser.save()
res.status(201).json("User created successfully")
}
make sure all the data is correct in api/routes/auth.route.js
check that the api is passing correctly through insomnia (similar tool to postman)
\\
now, we go to mongodb and see that the data is stored inside the database. however, the password is viewable as plain text.
we need to encrypt it
go to root folder of project and install npm install bcryptjs
import brcyptjs from 'bcryptjs'; into auth.controller.js
inside the signup function -> const hashedPassword = bcryptjs.hashSync(password, 10);
change password from password to passowrd: hashedPassword
\\
to ensure that the user does not enter duplicate username and email, we need to write our auth.controller.js code inside a try{}catch{} block
catch the error and res.status(500).json(error.message);
\\
we create the middelware for handling errors
we go to api/index.js and write app.use((err, req, res, next) => {})
the four parameters are err -> error that has occured, req -> the type of request, res -> the body or the resulting message, next -> goes to the next error in the middleware
the function is defined as: 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
now, within the auth.controller.js file, we pass next as a parameter into the signup function.
we call this next within the catch (error) {
    next(error);
}
now when we pass a duplicate value, the we test in insomina and see that the server throws a more comprhensive error
\\
we can also write custom/user defined errors. this include errors such as password too long etc. 
under api, we create a new folder called utils. 
api/utils/error.js
within error.js, we define:
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error
}
now, we can call the errorHandler function wherever we wish to display our custom error. Don't forget to import the error. 
git push
\\
we now move on to the creation of UI of sign up page
designed the ui for sign-up page
import { Link } from "react-router-dom";
\\
adding funcionality to the sign-up page
we add the onChange={handleChange} event listener to all three input fields
we need to create a new function called handleChange since it is a user defined function
along with that, we use a useState hook to store form data. The variable is called formData
This holds the state of the previous input element within the form while the current element is being updated
this is done with the help of the spread operator ...formData
now we need to submit this information. to do this, we need to add an onSubmit={handleSubmit} event listener to the form tag
define the handleSubmit function and e.preventDefault() to prevent refreshing the page
we want to send the data, therefore we write it as: const res = await fetch("/api/auth/signup", formData);
here res means response
we got the ui and vite.config.js file
we add the following code snippet under the defineConfig function:
server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
this is to show that wherever we find a url which has "/api" in it, we prefix "http://localhost:3000" to this so that it is hitting the correct endpoint always. Here the 3000 port is the backend port where we want to pass the data that we are collecting in the front end.
now, we cannot just send formData the object as it is as it is not secure and good practice to do so. 
we need to STRINGIFY it. 
therefore, the handleSubmit function is written as: 
const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
  };
perfect! cross verify on mongodb -> serenity homes project -> databases -> browse configuration and we should be able to see the entered data in the database
\\
now we need to handle the loading of the page and handle the errors in the page
we use two useStates that are setLoading and setError
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);
within the handleSubmit function, we set the setLoading(true);
if(data.success === false){
    setLoading(false);
}
else we set it as false anyway outside the if statement
enter this entire portion into try{}catch(error){} block and handle the setError() and setLoading() functions correctly
add a conditional <p> tag as an error which displays the error onto the frontend screen
perfect!
\\
now let us display a message called user created successfully onto our frontend
we use the useNavigate hook from react-router-dom
const navigate = useNavigate();
and within the try catch block after setError(null), we write navigate("/sign-in");
done!
\\


