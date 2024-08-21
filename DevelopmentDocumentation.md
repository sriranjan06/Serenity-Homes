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
complete image upload functionality for profile page
we add the useRef hook to the Profile.jsx file. decalre fileRef of type useRef
const fileRef = useRef(null); // useRef means that the variables do not change upon referesh/re-render
add onClick={} event listener to the <img /> tag for the profile pic
onClick={() => fileRef.current.click} here we declare the anonymous function within the event listener
create a file input type right above this profile image, keep it hidden ref={fileRef} and accept="image/\*"
now to ensure that only images are uploaded, we need to add a few constraints to the firebase database

firebase -> console -> serenity-homes -> build -> storage -> get started -> start in production mode -> choose location -> done!
now we need to add rules to the firebase storage:

```
rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*')
    }
  }
}
```

on Profile.jsx, go to the <input type="file"> tag and add the onChange={(e) => setFile(e.target.files[0])} event listener
we use useState snippet and define const [file, setFile] = useState(undefined);
setFile is what the updated image is goinng to be, whereas, we handle the file using a useEffect hook. 

```
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
```

no we define the handleFileUpload() function. This is our main function to handle the input file.

```
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
```
here we 
import {getStorage} from "firebase/storage"; 
const storage = getStorage(app) , the app here is the entire firebase.js function that we're calling.
we declare variable const fileName and suffix the file.name being uploaded with Date().getTime() for maintaining unique name constarint for the image.
storageRef object variable stores the storage and fileName variables as a reference (the data is not refershed with each re-render).

``` 
    const uploadTask = uploadBytesResumable(storageRef, file);
```

the above line of code can be explained this way: 
1. storageRef: This is a reference to the location in the storage service where the file will be uploaded. It's typically created using something like firebase.storage().ref().
2. file: This represents the file you want to upload. It could be a file object obtained from an input element or another source.
3. uploadBytesResumable: This is a function that starts the upload of the file to the specified storageRef. It returns an UploadTask object, which can be used to monitor and control the upload process, such as pausing, resuming, and canceling the upload, as well as tracking progress and handling errors.

.on() is a firebase function that is used to monitor changes in data. This listens for changes at a specific reference in the Firebase database and triggers the callback whenever data changes.

``` 
uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
``` 

this above function is used to display the image uploading process. 
we import { getDownloadURL } from "firebase/storage";
we do 

```
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
```

we pass downloadURL and the newly uploaded image avatar is overridden and stored within the avatar variable from the downloadURL. 
it contains the link of the newly uploaded image.

we define this to show the uploading process to the user: 
```
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload (Image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
```

git push

\\
creating update user api route

go to api/routes/user.route.js
within this file, write: 
router.post('/update/:id', updateUser); 

we need to go to api/controllers/user.controller.js 
declare function updateUser: 
export const updateUser = (req, res, next) => {}

now we import this same updateUser function into user.route.js file. 

next, we go to api/utils and create a new file called verifyUser.js
in the root folder of our project, we need to install another package called cookie parser

``` npm install cookie-parser ```
we need to initialse this cookie parser within our api. 
api/index.js
import cookieParser from 'cookie-parser';
app.use(cookieParser());

now we have initialised it. go to verifyUser.js
```
import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(401, 'Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Forbidden'));
        }
        req.user = user;
        next();
    });
}
```

go to api/routes/user.route.js
import { verifyToken } from "../utils/verifyUser.js";
router.post('/update/:id', verifyToken, updateUser);

go to api/controllers/user.controller.js 
here we define the updateUser function

```
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can only update your own account!'));
    }

    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
        }, { new: true });

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}
```

now we can test this on insomnia
create a folder called user 
create a post api call called update user
http://localhost:3000/api/user/update/:id this is the endpoint to test the updateUser api.

git push

\\
complete update user functionality and link frontend and backend

we start with ui/src/redux/user/userSlice.js
here we declare three reducers { updateUserStart, updateUserSuccess, updateUserFailure }
then we export these are userSlice.actions to make these reducers accessible globally

go to ui/src/pages/Profile.jsx
``` 
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} from "../redux/user/userSlice.js"; 
```
we also need to import ``` import { useSelector, useDispatch } from "react-redux"; ``` in order to use the reducers in our Profile.jsx file

useStateSnippet for const [formData, setFormData] = useState({}) initialize as an empty object
we always need to declare const dispatch = useDispatch(); if we need to use the reducer.

```   const { currentUser, loading, error } = useSelector((state) => state.user); ``` This is how we get the state of the current user into currentUser variable.

go to the input fields of username, email and fefaultValue = {currentUser.username}
at the beginning of the <form> tag, we declare an event listener <form onSubmit={handleSubmit}>

now we define the handleSubmit function as: 
```
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
```

we also add onChange={handleChange} event listeners to our username, email and password fields to be handle changes in the following manner: 
```   
const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
```

we declare two paragraph tags to show updating progress and errors outside the form tag for progress feedback to the user.
git push

\\
Delete user functionality
go to api/controllers/user.controller.js
declare the function: 

```
export const deleteUser = async (req, res, next) => {

}
```

go to api/routes/user.route.js and define: 
``` router.delete('/delete/:id', verifyToken, deleteUser); ```

go back to user.controller.js and define the deleteUser function clearly: 
```
export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only delete your own account!"));
    }

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json("User has been deleted!");
    } catch (error) {
        next(error);
    }
}
```
The req.user.id comes from api/utils/verifyUser.js through the jwt.verify();
The req.params.id comes from api/routes/user.route.js through  router.delete('/delete/:id', verifyToken, deleteUser); where the ':id' is the params

No we go to the frontend.
ui/src/redux/user/userSlice.js

Here we declare three more reducers that are: 
```
        deleteUserStart: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
```
Then we export these actions and reducers 
export const {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;

Now we go to Profile.jsx and we import these reducers from userSlice.js
go to the <span>Delete</span> and add an event listener: 
onClick={handleDeleteUser}
Then we define the handleDeleteUser function: 

```
const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
```

test this out on insomnia with a seperate DELETE method ``` localhost:3000/api/user/delete/:id ```
git push

\\

Add sign out user functionality
This is the exact same as delete use functionality: 
1. go to api 
2. api/controllers/auth.controller.js and define signOut function in the backend: 
``` 
export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json('User has been logged out!');
    } catch (error) {
        next(error);
    }
}
```
3. go to api/routes/auth.route.js and import the signOut function from auth.controller.js
```
router.get("/signout", signOut);
```
4. go to frontend. ui/src/redux/user/userSlice.js
5. define three reducers for the signOut functionality: 
```
signOutUserStart: (state) => {
            state.loading = true;
        },
        signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
```
6. export these reducers
```
export const { 
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
```
7. ui/src/pages/Profile.jsx and go to the <span>Sign Out</span>
8. add an event listener to this <span>
``` 
onClick={handleSignOut}
```
9. define the handleSignOut function: 
```
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("api/auth/signout");
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
```

git push

\\
Add create listing API route
first we create a model called listing.model.js 
this will be the JSON that we store in our mongodb
api/models/listing.model.js

```
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    furnished: {
        type: Boolean,
        required: true,
    },
    parking: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    offer: {
        type: Boolean,
        required: true,
    },
    imageUrls: {
        type: Array,
        required: true,
    },
    userRef: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing; 
```
we export default Listing. 
then we go to api/routes/listing.route.js
here we create the route

```
import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create', verifyToken, createListing);

export default router;

```
as you can see, in our router.post(), we are calling a function called createListing. We need to define this createListing function
The createListing function is defined in api/controllers/listing.controller.js
```
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}
```
now we need to use this listing route in our application
we go to api/index.js
```
import listingRouter from './routes/listing.route.js';

app.use('/api/listing', listingRouter);
```

now we test this in insomnia
create a new folder called listing
create a POST request called create listing with the link: localhost:3000/api/listing/create 
add the following JSON in the body and send: 
```
{
	"name": "test",
	"description": "test",
	"address": "test", 
	"regularPrice": 500,
	"discountPrice": 500,
	"bathrooms": 5, 
	"bedrooms": 5, 
	"furnished": true, 
	"parking": true, 
	"type": "rent", 
	"offer": true, 
	"imageUrls": ["abcdef", "ghijkl"],
	"userRef": "hahahahahaha"
}
```

this will succeed. 
git push

\\
Complete create listing page UI

\\
Complete upload listing images functionality

we import the firebase app
``` import { app } from "../firebase.js"; ```

we need to import getDownloadUrl, getStorage, ref and uploadBytesResumable from firebase/storage
``` 
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
```

no we create two useState snippets: 
``` 
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
```
this is to store the files and store imageUrls into formData

got to file input type and add an onChange={(e) => setFiles(e.target.files)} event listener
to the upload button, we add an event onClick={handleImageSubmit} event listener

now we need to define two functions that is the handleSubmit() and storeImage() functions
the storeImage function is defined to store the images that we upload of the listing. It is as follows: 
```
const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
```

now we define the handleSubmit() function
```
const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

```  

add two more useState snippets: 
```
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
```

now we modify the uploading button to handle and display the uploading... functionality:
```
            <button
              type="button"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
```

then we need to display the uploaded images to the user
we declare a <p> tag after the uploading functionality
```
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={url}
                className="flex justify-between p-3 border items-center"
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
```

each image needs to a have a key={} attribute when we are declaring a map() function
we also need a delete functionality for each image that we upload
the delete button calls an event listener onClick and we call the handleRemoveImage function. 
```
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
```
the stop the handleRemoveImage(index) from automatically executing, we write it as an ambigious function

the handleRemoveImage(index) function is defined as follows: 
```
const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
```

git push

\\
Complete create listing page functionality
import useSelector for using currentUser details
import useNavigate from react-router-dom to navigate to different pages

```
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
```

declare currentUser and naviagate
```
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
```

declare all the default values of all the variables of the form
```
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
```

useStates for loading and errors 
```
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
```

add onChange={handleChange} event listeners and value={} for every single input field in the form
define the handleChange function which specifically caters to the different types of input that we accept

```
const handleChange = (e) => {
    // This if is for sale and rent
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    // This if is for parking, furnished and offer
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    // This if is for name, description and address
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
```

then add a submit functionality for the entire form with all of its variables
``` <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4"> ```

define the handleSubmit function: 
```
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image!");
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount price must be lower than regular price!");
      }

      setLoading(true);
      setError(false);

      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
```

git push

\\
Create get user listings API route

go to api/controllers/user.controller.js
define the getUserListings function
```
export const getUserListings = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const listings = await Listing.find({
                userRef: req.params.id
            });

            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    } else {
        return next(errorHandler(401, "You can only view your own listings here!"));
    }
}
```

then go to api/routes/user.route.js and create an endpoint for this function
```
import { getUserListings } from "../controllers/user.controller.js";
router.get('/listings/:id', verifyToken, getUserListings);
```

test on insomnia

git push

\\ 
Complete show user listings functionality
finish designing the UI for this

\\
Complete delete user listing functionality
1. go to api/controllers/listing.controller.js 
define the function to delete the user listing

```
export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only delete your own listing!"));
    } 

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json("Listing has been deleted!")
    } catch (error) {
        next(error);
    }
}
```

2. go to api/routes/listing.route.js

import the deleteListing function
``` import {deleteListing} from "../controllers/listing.controller.js"; ```

create the api call and its endpoint

``` router.delete('/delete/:id', verifyToken, deleteListing); ```

3. go to ui/src/pages/Profile.jsx

go to the <button>Delete</button> and add an onClick event listener to this
```
<button
  onClick={() => handleListingDelete(listing._id)}
  className="text-red-700 uppercase"
>
  Delete
</button>
```

4. define the handleListingDelete() function
```
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => {
        prev.filter((listing) => listing._id !== listingId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
```

test on insomnia
create a delete request with api: http://localhost:3000/api/listing/delete/:id 
test it for a particular user and try to delete each listing

git push

\\
Create update listing API route
follow the same process of building the api as we did for delete. 

1. go to api/controllers/listing.controller.js
```
export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only update your own listings!"));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }, // This gives the updated list of values
        );

        res.status(200).json(updatedListing);

    } catch (error) {
        next(error);
    }
}
```

2. go to api/routes/listing.route.js
```
import updateListing from "../controllers/listing.controller.js";
router.post('/update/:id', verifyToken, updateListing);
```

3. test on insomnia
under listing create a post request and name it update a listing
the link ``` localhost:3000/api/listing/update/:id ```

git push

\\
Complete update listing functionality

1. go to api/controllers/listing.controller.js and define the getListing function here
```
export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return next(errorHandler(404, "Listing not found!"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}
```

2. create the route to get this listing with 
```
import { getListing } from "../controllers/listing.controller.js";
router.get('/get/:id', getListing);
```

3. go to ui/src/pages and create a new page called UpdateListing.jsx
copy all the contents of the CreateListing.jsx page into the UpdateListing.jsx and change create to update everywhere

4. go to App.jsx 
```
import UpdateListing from "./pages/UpdateListing";
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
```

5. go to the profile page and add a <Link></Link> tag which is imported from react-router-dom
```
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
```

read the UpdateListing.jsx more carefully for better understanding!

git push

\\
Add image slider to the listing page

1. go to ui/src/pages and create Listing.jsx

2. go to ui root folder and ``` npm install swiper ```

3. go to App.jsx and import the page 
``` import Listing from "./pages/Listing"; ``` 

4. This is a public page so just declare this page as a Route within the Routes
``` <Route path="/listing/:listingId" element={<Listing />} /> ```

This basically adds the image swiping functionality for our listing pages
git push

\\
Complete listing page
design the listing page completely

\\
Add contact landlord functionality completely

1. go to api/controllers/user.controller.js and write the getUser function
```
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(errorHandler(404, 'User not found!'));
        }

        const { password: pass, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
```

2. go to api/routes/user.route.js
```
import { deleteUser, test, updateUser, getUserListings, getUser } from "../controllers/user.controller.js";
router.get('/:id', verifyToken, getUser);
```

3. Design the entire Contact page and update the changes in Listing.jsx as well so that it can successfully write an email to the user

\\
### Create search API route





