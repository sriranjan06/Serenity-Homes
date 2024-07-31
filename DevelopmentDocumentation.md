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
Create Sign In API route
now we go to api/controllers/auth.controller.js
we create a new function called signin with the same parameters request, response and next
email and password is requested from body
we then add a try{}catch(){} block
to validate email in mongoose/mongodb, we use the User (which is the model that we have created) and findOne cluster
findOne({ email: email});
if email was not found, call our custom error called errorHandler and pass 404 as the argument
else, if email was found, we need to check the password
while checking the password, we need to compare the password currently input by the user and the existing password that has been encrypted and stored in the db
const validPassword = bcryptjs.compareSync(password, validUser.password);
\\
if we need to ensure that the username and password is correct, we need to authenticate it.
we use cookies to authenticate the username and password inside the browser.
we need to create a hash token that include the id of the user and we save this token inside the browser cookies.
the best package to hash the data is json web tokens package.
we now need to create the hashed value of the users using the JWT.
in the root directory, npm install jsonwebtoken
import at the top of the auth.controller.js file import jwt from 'jsonwebtoken';
then within the try block after checking for validUsername and validPassword, we do const token = jwt.sign({ id: validUser.\_id }, process.env.JWT_SECRET);
\_id is a primary key generated by mongodb.
process.env.JWT_SECRET is the key. the .env is a hidden file and it contains the JWT secret and must not be publicly hosted.
the JWT_SECRET can be anything of your choice.
now, we take the response from the user and store it in a cookie and we call this cookie, "access_token"
httpOnly: true for secure sites only to store the cookie
json(validUser) is the part of the user information (username) that we are collecting and storing with the cookie
\\
now to check the api, we go to insomnia and create a folder called sign in
the api call is post with url: localhost:3000/api/auth/signin
we only need email and password in the body here
we need to call the signin function written and exported in auth.controller.js into auth.route.js in the following way:
router.post("/signin", signin);
make sure that signin is also imported at the top of auth.route.js
perfect, now we test it, we get 200 OK which is the ok response we created and the cookie is created inside with the access_token as the variable which is a hashed value.
because it is not best practice to display the hashed password after authentication even on the console, we need to ensure that it is removed.
we add the following line: const { password: pass, ...rest } = validUser.\_doc;
here, we are destructuring to extract the 'password' property and the rest of the properties from the 'validUser.\_doc' object
'password: pass' extracts the 'password' property from the validUser.\_doc and renames it to 'pass'
'...rest' collects the remaining properties of 'validUser.\_doc' into a new object called 'rest'
then we rewrite the response as:
res
.cookie("access_token", token, { httpOnly: true })
.status(200)
.json(rest);
now when we test the api on insomnia, we see that the preview does not have the password property showing. This is what we want.
therefore the password won't be leaked to the user.
git push
\\
Complete the sign in page functionality
copy paste sign up page code and remove the excessive code and trim it to what is required for a sign in
change the navigation route to home page
change all sign up to sign in
remove username, keep only email and password
verify that the access_token is created and also verify that the cookie remains in session by refreshing the page and seeing
try entering wrong credentials into sign in page to ensure that the correct errors are displayed
git push
\\
now we create a global state using redux toolkit to ensure that the logged in user's info is used in all places while in session
go to the ui folder and install npm install @reduxjs/toolkit react-redux
inside the ui folder, go to src folder. under src, create a folder called redux
ui/src/redux/store.js
paste boilerplate code here from https://redux-toolkit.js.org/tutorials/quick-start
add this after reducer to ensure that we do not get serializable check:
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
serializableCheck: false,
}),
now, we go to main.jsx and add the following
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
now, cover the entire <App /> by replacing the <React.strictmode> with <Provider store={store}><App /><Provider>
now, we create a slices for the user
inside the redux folder, we create another folder called user
create userSlice.js inside the user folder and import { createSlice } from "@reduxjs/toolkit";
set up the initialState
initialState is an object that defines the initial state of the slice. in our case, we give it three properties:
currentUser, error and loading
currentUser will hold the user information when a user signs in successfully.
loading: Initially set to false, this indicates whether the sign-in process is currently ongoing.
we create an object called userSlice using the in-built object createSlice which has the name, initialState and reducers as variables.
createSlice is called with an object that defines the name of the slice, the initial state, and the reducers.
name: 'user': This is the name of the slice. It will be used as a prefix for the generated action types.
initialState: This is the initial state defined earlier.
reducers: This is an object where each key is the name of a reducer function, and the value is the reducer function itself. Reducers handle state changes based on the dispatched actions.
signInStart: This reducer sets loading to true, indicating that the sign-in process has started.
signInSuccess: This reducer is called when the sign-in process is successful. It updates currentUser with the user data from the action's payload, sets loading to false, and clears any previous errors.
signInFailure: This reducer is called when the sign-in process fails. It updates error with the error message from the action's payload and sets loading to false.
userSlice.actions: This contains the action creators generated by createSlice for each of the reducers defined. Here, it exports signInStart, signInSuccess, and signInFailure action creators.
userSlice.reducer: This is the reducer function generated by createSlice for this slice of state. It is exported as the default export and will be used in the Redux store to handle actions related to this slice.
\\
Initial State: Defines the starting state of the user slice.
Reducers: Define how the state should change in response to actions. In this case, they handle the sign-in process (start, success, and failure).
Actions: Automatically generated action creators based on the reducer names.
Reducer Function: Generated by createSlice and used in the Redux store to handle state changes for this slice.
By using Redux Toolkit's createSlice, you can simplify the process of managing state, creating actions, and writing reducers, making your Redux code more concise and easier to maintain.
\\
now we need to import the import userReducer from './user/userSlice.js'; in the store.js file
pass user: userReducer under reducers within the store function within store.js
now we can use the useDispatch and useSelector within our sign in page
import {
signInStart,
signInSuccess,
signInFailure,
} from "../redux/user/userSlice.js";
then const dispatch = useDispatch();
instead of setLoading(true); we can write dispatch(signInStart());
we can replace all setLoading, setError etc. statements with dispatch() signInFailure, signInSuccess etc. appropriately
we can remove the two hooks that we had declared on top and rewrite const { loading, error } = useSelector((state) => state.user);
install extension redux devtool to test out redux
try to sign in with correct credentials and wrong credentials. you can see the global state changes
\\
npm install redux-persist within the ui folder
we need to rewrite some of our code as we need to ensure that as the global state management is happening, we do not lose our data if our page is refreshed. Instead, we need to store the data in the browser local storage
rewrite store.js to this: import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
key: 'root',
storage,
version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
reducer: persistedReducer,
middleware: (getDefaultMiddleware) => getDefaultMiddleware({
serializableCheck: false,
}),
})

export const persistor = persistStore(store);
modify the main.jsx file with this:
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>
</Provider>
these are all the necessary imports:
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
\\
now we add continue with google button on the sign-in and sign-up pages
add google oauth functionality
let us create a new component called Oauth.jsx under ui/src/components/Oauth.jsx
within the return statement, add a button tag with the text Continue with Google
we add an event handler called onClick = {handleGoogleClick}
we define the handleGoogleClick function above the return statement. It must be asynchronous
now just call the <Oauth /> components within the SignIn.jsx and SignUp.jsx pages after the sign-in/sign-up buttons respectively
let us go to firebase and create our firebase account. new project named serenity-homes
new web app called serenity-homes
npm install firebase within the ui folder
create a file called ui/src/firebase.js
copy paste the firebase sdk content from your web app with all the necessary information into this file
we now need to export the last const as // Initialize Firebase
export const app = initializeApp(firebaseConfig); from the firebase.js file.
we need to create a new .env file within our ui folder which will hold the VITE_FIREBASE_API_KEY.
rewrite the firebase key as -> apiKey: import.meta.env.VITE_FIREBASE_API_KEY
now, go to the firebase console again continue to console
got to build on the left sidebar, click on authentication, get started sign-in methods, choose the provider we need (google in this case), enable, name it as Serenity Homes, the email associated is mine and click save.
go to Oauth.jsx and write code within the try block
const provider = new GoogleAuthProvider();
import GoogleAuthProvider at the top from "firebase/auth";
const auth = getAuth(app); the app we are passing here is the export const app = initializeApp(firebaseConfig); from firebase.js file.
import getAuth from "firebase/auth" as well.
declare new variable called result which holds the auth and provider details which is accessed through signInWithPopup() which is imported from "firebase/auth" again.
when we console log the result, we can see that a lot of user data is obtained such as the name, email and photo.
we want to use this infomration for the user logged in.
we do this by storing data in our response variable res.
we import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
const dispatch = useDispatch();
const data = await res.json();
dispatch(signInSuccess(data));
we are using the fetch() function to store the response data.
we are hitting the api endpoint /api/auth/google
this needs to be implemented at the backend as well
\\
we go to api/routes/auth.route.js
router.post("/google", google);
go to api/controller/auth.controller.js
we need to define a function called "google"
this function must first find the email from the User model and store it inside a user variable
if the user variable was successfully able to find the email, that means the user exists and we can proceed
we declare a token variable and assign it a value which is a combination of the user.\_id (mongodb) and JWT_SECRET. This creates a unique token for the user.
then we declare a variable called rest, where we take all the user data using the user.\_doc and remove the password variable from the user data and store the remaining values into the new object variable called rest. we do this by destructuring the user.\_doc using the spread operator.
then we generate a response with the token being called access_token, httpOnly to ensure that it is secured and allowed only on http, status 200 which means success and return the body as a json and the object to be returned is rest.
else if the user does not exist, we need to generate a new password for this new user signing in through google. google sign in does not provide the password to the application, hence we generate our own.
then we hash the generated password. we create an object called newUser which has User object with username, email, generatedPassword and profilePhoto as variables.
then we save this information into the newUser object.
after this creation of newUser, we follow the same process of creating a token for the newUser, removing password field and store into rest, then setting the response as a body which returns an access_token as cookie, httpOnly, 200 status success and as a json.
\\
in oauth.jsx, let us import useNaviate and Navigate("/") after we successfully sign-in using google.
we can verify that everything is working by redux debugger, network and response, application, localstorage etc. in the front end
git push
\\
let us update the header section with the signed in user credentials. let us also make the home page private, if the user is not signed in, then they cannot view their profile page.
go to Header.jsx component
go to the last link which is <Link>Sign In</Link>
change the link to <Link to="/profile"> and write a conditional within this
{currentUser ? (
<img src={currentUser.avatar}>
) : (

<li> Sign In </li>
)}
currentUser is a user-defined variable which is of the object type useSelector imported from react-redux
import { useSelector } from "react-redux";
const { currentUser } = useSelector((state) => state.user);
state.user is the userSlice created in redux by me

create a new component called PrivateRoute.jsx
create currentUser here again using the useSelector from react-redux
import { Outlet, Navigate } from "react-router-dom"; these are inbuilt components that we need
we return a conditional for PrivateRoute.jsx component
return currentUser ? <Outlet /> : <Navigate to="sign-in" />;

go to the App.jsx file
take the Profile route page and wrap it within the PrivateRoute component like this:
<Route element={<PrivateRoute />}>
<Route path="/profile" element={<Profile />} />
</Route>
git push

\\
complete profile page ui
import {useSelector} from "react-redux"
define object variable:
const { currentUser } = useSelector((state) => state.user);
then use the src={currentUser.avatar} within the <img /> to diaplay the profile picture
design all other functionalities on the page

\\
