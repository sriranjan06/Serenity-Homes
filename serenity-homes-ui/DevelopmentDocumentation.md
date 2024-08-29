# Project Setup

### 1. Create Vite project <br>
>  npm create vite@latest serenity-homes-ui

- Choose `React` with `JavaScript + SWC` as the framework.

### 2. Install Tailwind CSS: <br>
- Follow the [Tailwind CSS Vite documentation](https://tailwindcss.com/docs/guides/vite) to install and set up Tailwind CSS.
- Delete unnecessary files:
  - `app.css`
  - `vite.svg` under the `public` folder.
  - `react.svg` under the `assets` folder.
- Clear all contents in `App.jsx` and use the ES7 extension to generate a React functional component (rafce).

### 3. Install Extensions:
- Install the following VSCode extensions:
  - `Auto Rename Tag`
  - `Console Ninja`
  - `Prettier - Code Formatter`
  - `Tailwind CSS IntelliSense`

# Creating Pages and Routes

### 1. Create Pages:
- Inside the `src` folder, create a new folder called `pages`.
- Create the following files in the `pages` folder:
  - `About.jsx`
  - `Home.jsx`
  - `Profile.jsx`
  - `SignIn.jsx`
  - `SignUp.jsx`

### 2. Set Up Routing:
- Install `react-router-dom`: <br>
> npm install react-router-dom

- In `App.jsx`, import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
- Wrap the returned JSX with `<BrowserRouter>`.
- Inside `<BrowserRouter>`, add a `<Routes>` tag.
- Add individual `<Route>` components for each page:
> <Route path="/" element={`<Home />`} /> <br>
> <Route path="/about" element={`<About />`} /> <br>
> <Route path="/profile" element={`<Profile />`} /> <br>
> <Route path="/sign-in" element={`<SignIn />`} /> <br>
> <Route path="/sign-up" element={`<SignUp />`} /> <br>

# Creating Components

### 1. Create Header Component: 
- Inside the src folder, create a components folder.
Create a Header.jsx file.
- Use the ES7 extension to create a functional component (rafce).
- Import and include `<Header />` in App.jsx inside the `<BrowserRouter>` but above `<Routes>`.

### 2. Design Header Structure: 
- Structure the header with left, center, and right sections:

``` 
 <Header>
  <div>
    {/* Left: */}
    <div>  
     <h1>Serenity Homes</h1> 
    </div>

    {/* Center: */}
    <div>  
      <form> 
        <input type="text" /> 
      </form> 
    </div>
    
    {/* Right: */}
    <div>  
      <ul>    
        <li>Home</li>
        <li>About</li>
        <li>Sign In</li> 
      </ul> 
    </div>
  </div>
 </Header>
 ```

- Style accordingly with Tailwind CSS.
- Use `react-icons` for the search icon:
> npm install react-icons
- Import `FaSearch` from `react-icons/fa` and use it in the search form.
- Import `Link` from `react-router-dom`
- Wrap each of the `<li>` within a `<Link to="/">` tag to ensure that routing takes places in the SPA without loading.

# Setting Up the Backend

### 1. Create API Folder: 
- Go to the root directory and initialize a Node.js project:
> npm init -y
- Create a folder named serenity-homes-api.
- Create an index.js file inside serenity-homes-api.
- Install Express:
> npm install express
- Write the following code in `index.js` to start a server:
```
import express from 'express';
const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
- Modify the `package.json` file in the root directory:
> "type": "module"
- Run the server:
> node serenity-homes-api/index.js

### 2. Install Nodemon:
- Install `nodemon` for automatic server reloading:
> npm install nodemon
- Update scripts in package.json:
```
"scripts": {
  "dev": "nodemon serenity-homes-api/index.js",
  "start": "node serenity-homes-api/index.js"
}
```
- Run the server with:
> npm run dev

### 3. Set Up MongoDB: 
- Install Mongoose:
> npm install mongoose

- Set up a MongoDB cluster on [mongodb.com](mongodb.com) and obtain the connection string.
- Create a `.env` file in the root directory to store the MongoDB connection string:
> MONGO="<your_connection_string>"

- In `index.js`, connect to MongoDB:
```
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));
```

- Install `dotenv` to use environment variables:
> npm install dotenv

- Import and configure `dotenv` in `index.js`:
```
import dotenv from 'dotenv';
dotenv.config();
```

### 4. Set Up User Model and Routes:
- Create a `models` folder in the `api` directory and add `user.model.js`:
```
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
export default User;
```

- Create a `routes` folder in the `api` directory and add `user.route.js`:
```
import express from "express";
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Hello World' });
});

export default router;
```

- Import the router into `index.js` and set up the route:
```
import userRouter from './routes/user.route.js';
app.use('/api/user', userRouter); 
```

### 5. Move Git Files to Appropriate Directories: 
- Move `.git` tracking file from a child directory to a parent directory
> mv .git ../
- Move the `.gitignore` file from the child directory into the root directory of the project so that all the node modules aren't pushed into the github repository
- Add the `.env` within the `.gitignore` file so that the `.env` file isn't pushed to github. The `.env` file contains our access keys.

# User Authentication

### 1. Create Sign-Up API:
- In `routes`, create `auth.route.js`:
```
import express from 'express';
import { signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post("/signup", signup);
export default router;
```

- In `controllers`, create `auth.controller.js`:
```
import User from '../models/user.model.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json("User created successfully");
};
```

- Import the route into `index.js`:
```
import authRouter from './routes/auth.route.js';
app.use('/api/auth', authRouter);
```

- Test the API using Insomnia.

- Additional Notes: <br>
  1. Adding funcionality to the sign-up page, we add the onChange={handleChange} event listener to all three input fields. 
  2. We need to create a new function called handleChange since it is a user defined function. 
  3. We use a useState hook to store form data. The variable is called formData. This holds the state of the previous input element within the form while the current element is being updated. 
  4. The spread operator ...formData is used. We need to submit this information. We do this by adding an onSubmit={handleSubmit} event listener to the form tag. 
  5. Define the handleSubmit function and e.preventDefault() to prevent refreshing the page. 
  6. We send the data in the followig manner: 
  > const res = await fetch("/api/auth/signup", formData);
    - res implies response
  7. Go to the vite.config.js file and add the following code snippet under the defineConfig function:
  ```
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  ```
  8. Wherever we find a url which has `"/api"` in it, we prefix `"http://localhost:3000"` to this so that it is hitting the correct endpoint always. The 3000 port is the backend port where we want to pass the data that we are collecting in the front end.
  9. We cannot just send formData the object as it is as it is not secure and isn't good practice to do so. Therefore we `STRINGIFY` it.
  10. The `handleSubmit` function is defined in the following the manner: 
  ```
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
  ```

- Perfect! Cross verify on mongodb -> serenity homes project -> databases -> browse configuration and we should be able to see the entered data in the database.

  11. To handle the loading and errors in the page, we use two useStates that are setLoading and setError: 
  ```
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  setLoading(true);
  if(data.success === false){
    setLoading(false);
  }
  ```

### 2. Encrypt Passwords:
- Install `bcryptjs` for password hashing:
> npm install bcryptjs
- Modify the `signup` function in `auth.controller.js`:
```
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.status(201).json("User created successfully");
};
```

### 3. Handle Errors: 
- Modify the `signup` function to use try-catch for error handling:
```
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};
```

- Create a custom error handler in `utils/error.js`:
```
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
```

- Modify the catch block to use the custom error handler:
> next(errorHandler(500, error.message));

### 4. Global Error Handling:
- In `index.js`, add a global error handler:
```
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
```

### 5. Create Sign-In API:
- In `auth.controller.js`, create the `signin` function:
```
export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });

    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
```

- Add a new route in `auth.route.js`:
> router.post("/signin", signin);

- Additional Notes: Create Sign In API route <br>
  - Go to `api/controllers/auth.controller.js`
  - Create a new function called `signin` with the same parameters request, response and next.
  - Email and password is requested from body
  - Add a try{}catch(){} block
  - Validate email in mongoose/mongodb by using the User (which is the model that we have created) and `findOne` cluster `findOne({ email: email});`
  - If email was not found, call our custom error called errorHandler and pass 404 as the argument
  - Else, if email was found, we need to check the password
while checking the password, we need to compare the password currently input by the user and the existing password that has been encrypted and stored in the db: 
  ```
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  ```


  - If we need to ensure that the username and password is correct, we need to authenticate it. We use cookies to authenticate the username and password inside the browser.
  - Create a hash token that includes the id of the user and save this token inside the browser cookies.
  - The best package to hash the data is json web tokens package.
  - In the root directory: 
  > npm install jsonwebtoken

  - import at the top of the auth.controller.js file: 
  > import jwt from 'jsonwebtoken';

  - Within the try block after checking for validUsername and validPassword, we write: 
  ``` 
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  ```
  
  - _id is a primary key generated by mongodb.
  - process.env.JWT_SECRET is the key. 
  - the .env is a hidden file and it contains the JWT secret and must not be publicly hosted. the JWT_SECRET can be anything of your choice.

  - We take the response from the user and store it in a cookie and we call this cookie, "access_token".
  - `httpOnly: true` for secure sites only to store the cookie
  json(validUser) is the part of the user information (username) that we are collecting and storing with the cookie. <br>

  - To check the api, we go to insomnia and create a folder called sign in. The api call is post with url: 
  > http://localhost:3000/api/auth/signin

  - Only email and password is required in the body.
  - We call the signin function written and exported in `auth.controller.js` into `auth.route.js` in the following way:
  > router.post("/signin", signin);
  
  - Ensure that `signin` is also imported at the top of `auth.route.js`. <br>

  - Perfect, now we test it, we get 200 OK which is the ok response we created and the cookie is created inside with the access_token as the variable which is a hashed value. Because it is not best practice to display the hashed password after authentication even on the console, we need to ensure that it is removed. We add the following line:
  
  > const { password: pass, ...rest } = validUser._doc;
  - Here, we are destructuring to extract the `password` property and the rest of the properties from the `validUser._doc` object. 
  - `password: pass` extracts the `password` property from the `validUser._doc` and renames it to `pass`.
  - `...rest` collects the remaining properties of `validUser._doc` into a new object called `rest`. 

  - Rewrite the response as: <br>
  ```
  res
  .cookie("access_token", token, { httpOnly: true })
  .status(200)
  .json(rest);
  ```

  - When we test the api on insomnia, we see that the preview does not have the password property showing. This is what we want. Therefore the password won't be leaked to the user.

- Complete the sign in page functionality by copy pasting sign up page code and remove the excessive code and trim it to what is required for a sign in. 
- Change the navigation route to home page and change all sign up to sign in. 
- Remove username, keep only email and password. Verify that the access_token is created and also verify that the cookie remains in session by refreshing the page and seeing. 
- Try entering wrong credentials into sign in page to ensure that the correct errors are displayed.

# Redux Setup

### 1. Install Redux Toolkit:
> npm install @reduxjs/toolkit react-redux

### 2. Create Redux Store:
- Inside `src`, create a `redux` folder.
- Create `store.js`:
```
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});
```

- In `main.jsx`, wrap `<App />` with `<Provider>`:
```
import { store } from "./redux/store.js";
import { Provider } from "react-redux";

<Provider store={store}>
  <App />
</Provider>
```

### 3. Create User Slice:

- Inside `redux`, create a `user` folder.
- Create `userSlice.js`:
```
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => { state.loading = true; },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Other reducers for update, delete, etc.
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
```

- Additional Notes: 
  - Create a global state using redux toolkit to ensure that the logged in user's info is used in all places while in session. 
  - Go to the ui folder and install:
  > npm install @reduxjs/toolkit react-redux

  - Go to serenity-homes-ui/src/redux/store.js
  - Paste boilerplate code here from [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)

  - Add this after reducer to ensure that we do not get serializable check:
  ```
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
  }),
  ```

  - main.jsx and add the following: 
  ```
  import { store } from "./redux/store.js";
  import { Provider } from "react-redux";
  ```
  - Cover the entire `<App />` by replacing the `<React.strictmode>` with `<Provider store={store}><App /><Provider>`
  - Create slices for the user
  - redux/user/userSlice.js
  - create `userSlice.js` inside the user folder and: 
  > import { createSlice } from "@reduxjs/toolkit";

  - Set up the initialState. 
  - initialState is an object that defines the initial state of the slice. in our case, we give it three properties: <br>
  `currentUser`, `error` and `loading`
    - currentUser will hold the user information when a user signs in successfully.
    - loading: Initially set to false, this indicates whether the sign-in process is currently ongoing.

  - We create an object called userSlice using the in-built object createSlice which has the name, initialState and reducers as variables.
  - createSlice is called with an object that defines the name of the slice, the initial state, and the reducers.
    - name: 'user': This is the name of the slice. It will be used as a prefix for the generated action types.
    - initialState: This is the initial state defined earlier.
    - reducers: This is an object where each key is the name of a reducer function, and the value is the reducer function itself. Reducers handle state changes based on the dispatched actions.
    - signInStart: This reducer sets loading to true, indicating that the sign-in process has started.
    - signInSuccess: This reducer is called when the sign-in process is successful. It updates currentUser with the user data from the action's payload, sets loading to false, and clears any previous errors.
    - signInFailure: This reducer is called when the sign-in process fails. It updates error with the error message from the action's payload and sets loading to false.
    - userSlice.actions: This contains the action creators generated by createSlice for each of the reducers defined. Here, it exports signInStart, signInSuccess, and signInFailure action creators.
    - userSlice.reducer: This is the reducer function generated by createSlice for this slice of state. It is exported as the default export and will be used in the Redux store to handle actions related to this slice. <br>

  - Initial State: Defines the starting state of the user slice.
    - Reducers: Define how the state should change in response to actions. In this case, they handle the sign-in process (start, success, and failure).
    - Actions: Automatically generated action creators based on the reducer names.
    - Reducer Function: Generated by createSlice and used in the Redux store to handle state changes for this slice.

  - By using Redux Toolkit's createSlice, you can simplify the process of managing state, creating actions, and writing reducers, making your Redux code more concise and easier to maintain.
  
  - Import this into the store.js file
  > import userReducer from './user/userSlice.js'; 
  
    - pass user: userReducer under reducers within the store function within store.js
    - now we can use the useDispatch and useSelector within our sign in page
    ```
    import {
      signInStart,
      signInSuccess,
      signInFailure,
    } from "../redux/user/userSlice.js";
    const dispatch = useDispatch();
    ```

  - Now, instead of `setLoading(true);` we can write `dispatch(signInStart());`
  - Replace all `setLoading`, `setError` etc. statements with `dispatch()`, `signInFailure`, `signInSuccess` etc. appropriately. 
  - Remove the two hooks that we had declared on top and rewrite: 
  > const { loading, error } = useSelector((state) => state.user);

  - Install extension redux devtool to test out redux
  - Try to sign in with correct credentials and wrong credentials. you can see the global state changes. 

# Persistent State with Redux Persist

### 1. Install Redux Persist:
> npm install redux-persist

- - Rewrite some of our code as we need to ensure that global state management does not lose our data if our page is refreshed. Instead, we need to store the data in the browser local storage.

### 2. Configure Redux Persist:
- Modify `store.js`:
```
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
```

- Modify `main.jsx`:
```
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
```

# OAuth Implementation with Firebase

### 1. Set Up Firebase:
- Create a Firebase project and web app.
- Install Firebase:
> npm install firebase

- Create `firebase.js` in `src`:
```
import { initializeApp } from "firebase/app";

const firebaseConfig = { /* Your Firebase config */ };
export const app = initializeApp(firebaseConfig);
```

### 2. Enable Google Authentication:
- In Firebase Console, enable Google authentication under Authentication > Sign-in methods.

### 3. Create OAuth Component:
- Create `Oauth.jsx` in `components`:
```
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { app } from "../firebase.js";

const Oauth = () => {
  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", { method: "POST", body: JSON.stringify(result.user) });
      const data = await res.json();
      dispatch(signInSuccess(data));
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleGoogleClick}>Continue with Google</button>;
};

export default Oauth;
```
### 4. Set Up Google Sign-In API:
- In `auth.controller.js`, create `google` function:
```
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const hashedPassword = bcryptjs.hashSync(Date.now().toString(), 10);
      const newUser = new User({ username: req.body.displayName, email: req.body.email, password: hashedPassword });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
```

- Add a new route in `auth.route.js`:
> router.post("/google", google);

- Additional Notes: 
  - Go to firebase and create our firebase account. New project named serenity-homes. It must be a web app.
  - Copy paste the firebase sdk content from your web app with all the necessary information into this file.
  <br>
  - Create a new `.env` file within our ui folder which will hold the `VITE_FIREBASE_API_KEY`.
  - Rewrite the firebase key as: 
  > apiKey: import.meta.env.VITE_FIREBASE_API_KEY

  - Go to the firebase console again, build on the left sidebar, click on authentication, get started sign-in methods, choose the provider we need (google in this case), enable, name it as Serenity Homes, the email associated is mine and click save.

  - The `google` function in the backend must first find the email from the `User` model and store it inside a user variable. 
  - If the user variable was successfully able to find the email, that means the user exists and we can proceed. 
  - We declare a token variable and assign it a value which is a combination of the `user._id` (mongodb) and `JWT_SECRET`. This creates a unique token for the user.
  - Then, we declare a variable called rest, where we take all the user data using the `user._doc` and remove the password variable from the user data and store the remaining values into the new object variable called rest.
  - We do this by destructuring the `user._doc` using the spread operator.
  - Then we generate a response with the token being called `access_token`, `httpOnly` to ensure that it is secured and allowed only on http, status 200 which means success and return the body as a json and the object to be returned is rest.
  - Else if the user does not exist, we need to generate a new password for this new user signing in through google. 
  - Google sign in does not provide the password to the application, hence we generate our own.
  - We hash the generated password. 
  - Create an object called `newUser` which has `User` object with username, email, generatedPassword and profilePhoto as variables.
  - We save this information into the `newUser` object.
  - After this creation of newUser, we follow the same process of creating a token for the newUser, removing password field and store into rest, then setting the response as a body which returns an access_token as cookie, httpOnly, 200 status success and as a json.

# Private and Protected Routes

### 1. Create Private Route Component:
- Create `PrivateRoute.jsx`:
```
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
```

### 2. Protect Profile Route:
- In `App.jsx`, wrap the `Profile` route with `PrivateRoute`:
```
<Route element={<PrivateRoute />}>
  <Route path="/profile" element={<Profile />} />
</Route>
```

# Profile Page with Image Upload

### 1. Design Profile Page:
- Use `useSelector` to access `currentUser`:
> const { currentUser } = useSelector((state) => state.user);

- Create an `input` element for image upload and a hidden `fileRef` using `useRef`:
```
const fileRef = useRef(null);
<input type="file" ref={fileRef} accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
<img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt="Profile" />
```

### 2. Configure Firebase Storage:
- Set up Firebase Storage with the following rules:
```
rules_version = '2';
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

### 3. Handle Image Upload:
- Create the `handleFileUpload` function in `Profile.jsx`:
```
const handleFileUpload = (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
- Update the UI to show progress, errors, and success messages.

- useRef means that the variables do not change upon referesh/re-render


- firebase -> console -> serenity-homes -> build -> storage -> get started -> start in production mode -> choose location -> done!

  - storageRef: This is a reference to the location in the storage service where the file will be uploaded. It's typically created using something like firebase.storage().ref().
  - file: This represents the file you want to upload. It could be a file object obtained from an input element or another source.

  - uploadBytesResumable: This is a function that starts the upload of the file to the specified storageRef. It returns an UploadTask object, which can be used to monitor and control the upload process, such as pausing, resuming, and canceling the upload, as well as tracking progress and handling errors.

  - .on() is a firebase function that is used to monitor changes in data. This listens for changes at a specific reference in the Firebase database and triggers the callback whenever data changes.

# User Account Management

### 1. Create Update User API:
- In `user.controller.js`, create `updateUser` function:
```
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
```
- Add a `route` in `user.route.js`:
> router.post('/update/:id', verifyToken, updateUser);


### 2. Link Frontend and Backend:
- Use `useDispatch` and `useSelector` in `Profile.jsx` for updating user information.
- Handle form submission with the `handleSubmit` function:
```
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

### 3. Delete User Account:
- In `user.controller.js`, create `deleteUser` function:
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
};
```

- Add a route in `user.route.js`:
> router.delete('/delete/:id', verifyToken, deleteUser);

### 4. Sign Out User:

- In `auth.controller.js`, create `signOut` function:
```
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
```

- Add a route in `auth.route.js`:
> router.get("/signout", signOut);

### 5. Update Redux for Sign Out:

- Add sign out reducers in `userSlice.js`:
```
signOutUserStart: (state) => { state.loading = true; },
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

 - Additional Notes: 
  Creating update `user` api route

  - We go to api/utils and create a new file called verifyUser.js
  - In the root folder of our project, we need to install another package called cookie parser: 
  > npm install cookie-parser

  - we need to initialse this cookie parser within our api: 
  `api/index.js`
  ```
  import cookieParser from 'cookie-parser';
  app.use(cookieParser());
  ```

  - Go to `verifyUser.js`
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

# Listings Management

### 1. Create Listing Model:

- Create `listing.model.js` in `models`:
```
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
  regularPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  furnished: { type: Boolean, required: true },
  parking: { type: Boolean, required: true },
  type: { type: String, required: true },
  offer: { type: Boolean, required: true },
  imageUrls: { type: Array, required: true },
  userRef: { type: String, required: true },
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
```

### 2. Create Listing API:

- Create `listing.route.js`:
```
import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post('/create', verifyToken, createListing);
export default router;
```

- In `listing.controller.js`, create `createListing` function:
```
import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
```

- Add the listing route in `index.js`:
```
import listingRouter from './routes/listing.route.js';
app.use('/api/listing', listingRouter);
```

### 3. Create Listing Page UI:
- Design the UI for `CreateListing.jsx`.
- Handle form submission, image upload using Firebase Storage, and validation.

### 4. Get User Listings API:
- In `user.controller.js`, create `getUserListings` function:
```
export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};
```

- Add a `route` in `user.route.js`:
> router.get('/listings/:id', verifyToken, getUserListings);

### 5. Delete User Listing API:

- In `listing.controller.js`, create deleteListing function:
```
export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only delete your own listing!"));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
```

- Add a `route` in `listing.route.js`:
> router.delete('/delete/:id', verifyToken, deleteListing);


- Add `delete` functionality to the profile page in `Profile.jsx`.

- The req.user.id comes from api/utils/verifyUser.js through the jwt.verify();
- The req.params.id comes from api/routes/user.route.js through router.delete('/delete/:id', verifyToken, deleteUser); where the ':id' is the params

- Now we go to the frontend: `ui/src/redux/user/userSlice.js`
- Here we declare three more reducers that are:
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

- Then we export these actions and reducers: 
```
export const {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} = userSlice.actions;
export default userSlice.reducer;
```

- Now we go to Profile.jsx and we import these reducers from userSlice.js
- Go to the `<span>Delete</span>` and add an event listener:
`onClick={handleDeleteUser}`. 
- We define the handleDeleteUser function:

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

- Test this out on insomnia with a seperate DELETE method: 
> localhost:3000/api/user/delete/:id

### 6. Update Listing API:
- In `listing.controller.js`, create `updateListing` function:

```
export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(404, "Listing not found!"));
  if (req.user.id !== listing.userRef) return next(errorHandler(401, "You can only update your own listings!"));
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};
```

- Add a `route` in `listing.route.js`:
> router.post('/update/:id', verifyToken, updateListing);

- Create an `UpdateListing.jsx` page to handle listing updates.

### 7. Image Slider for Listings:

- Install Swiper:
> npm install swiper

- Create a `Listing.jsx` page and add the image slider.

# Search Functionality

### 1. Create Search API:

- Add a route in `listing.route.js`:
```
import { getListings } from "../controllers/listing.controller.js";
router.get("/get", getListings);
```

- In `listing.controller.js`, create getListings function:
```
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") offer = { $in: [false, true] };

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") furnished = { $in: [false, true] };

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") parking = { $in: [false, true] };

    let type = req.query.type;
    if (type === undefined || type === "all") type = { $in: ["sale", "rent"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer, furnished, parking, type,
    }).sort({ [sort]: order }).limit(limit).skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
```

### 2. Add Search Form Functionality:

- In `Header.jsx`, add a search input field and handle form submission:
```
const [searchTerm, setSearchTerm] = useState("");
const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("searchTerm", searchTerm);
  const searchQuery = urlParams.toString();
  navigate(`/search?${searchQuery}`);
};
```

### 3. Create Search Page UI:
- Design the `Search.jsx` page and handle the display of search results.

### 4. Add Show More Listings Functionality:
- Add a "Show More" button in the search page to load more listings:
```
const onShowMoreClick = async () => {
  const numberOfListings = listings.length;
  const startIndex = numberOfListings;
  const urlParams = new URLSearchParams(location.search);
  urlParams.set("startIndex", startIndex);
  const searchQuery = urlParams.toString();
  const res = await fetch(`/api/listing/get?${searchQuery}`);
  const data = await res.json();
  if (data.length < 9) setShowMore(false);
  setListings([...listings, ...data]);
};
```

# Final Touches

### 1. Complete Home and About Pages:
- Design and complete the `Home.jsx` and `About.jsx` pages.

### 2. Deploy to Render:
- Update the `package.json` file in the root directory with the following script:
```
"build": "npm install && npm install --prefix serenity-homes-ui && npm run build --prefix serenity-homes-ui"
```
- In `index.js`, serve the built frontend files:
```
import path from "path";
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/serenity-homes-ui/dist/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "serenity-homes-ui", "dist", "index.html"));
});
```

- Push the code to GitHub and deploy to [Render](https://render.com).







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
`import { app } from "../firebase.js";`

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
`<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">`

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
`import {deleteListing} from "../controllers/listing.controller.js";`

create the api call and its endpoint

`router.delete('/delete/:id', verifyToken, deleteListing);`

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
   the link `localhost:3000/api/listing/update/:id`

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

2. go to ui root folder and `npm install swiper`

3. go to App.jsx and import the page
   `import Listing from "./pages/Listing";`

4. This is a public page so just declare this page as a Route within the Routes
   `<Route path="/listing/:listingId" element={<Listing />} />`

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

1. add a get listing route within the listing.route.js

```
import { getListings } from "../controllers/listing.controller.js";
router.get("/get", getListings);
```

2. define the getListings function within the api/controllers/listing.controller.js

```
export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === "false") {
            offer = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === "false") {
            furnished = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === "false") {
            parking = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === "all") {
            type = { $in: ["sale", "rent"] };
        }

        const searchTerm = req.query.searchTerm || "";
        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const listings = await Listing.find({
            name: { $regex: searchTerm, $options: "i" },
            offer,
            furnished,
            parking,
            type,
        }).sort({
            [sort]: order
        }).limit(limit).skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
}
```

1. Function Definition
   This line defines an asynchronous function getListings, which is exported for use in other parts of your application. The function takes three arguments:
   req: The request object, which contains information about the HTTP request (e.g., query parameters, headers).
   res: The response object, used to send back the desired HTTP response.
   next: A function used to pass control to the next middleware in case of an error.
2. Try-Catch Block
   The code inside this try block is executed. If an error occurs, it is caught by the catch block.
3. Extracting Query Parameters with Defaults
   These lines extract limit and startIndex from the query parameters in the request (req.query).
   limit determines how many results to return, with a default value of 9 if not provided.
   startIndex determines the starting point for pagination, with a default value of 0 if not provided.
   parseInt is used to convert the query parameters from strings to integers.
4. Handling Boolean Filters
   This section deals with the offer query parameter:
   If offer is undefined or "false", the offer variable is set to an object { $in: [false, true] }. This means the query will include listings where offer can be either false or true.
   This logic is used to ensure that if no specific offer filter is provided, the query includes all listings.
   Similar logic applies to the furnished parameter, where the listings can be either furnished or unfurnished if the parameter is not specified.
   The same logic is used for the parking parameter, allowing listings with or without parking.
5. Handling Type Filter
   The type parameter filters listings by their type (e.g., "sale" or "rent").
   If type is undefined or "all", the type variable is set to include both "sale" and "rent" listings.
6. Search Term, Sort, and Order Parameters
   searchTerm: A string to filter listings based on their name, defaulting to an empty string if not provided.
   sort: The field by which the listings should be sorted, defaulting to "createdAt" (assuming the listings have a creation date).
   order: The sort order ("asc" for ascending or "desc" for descending), defaulting to "desc" (most recent first).
7. Database Query Execution
   Listing.find: Executes a MongoDB query on the Listing collection, using the following filters:
   name: { $regex: searchTerm, $options: "i" }: Filters listings by name using a case-insensitive regular expression that matches the searchTerm.
   offer, furnished, parking, type: These are the filters defined earlier.
   .sort({ [sort]: order }): Sorts the results based on the sort field and order direction.
   .limit(limit): Limits the number of returned documents to the specified limit.
   .skip(startIndex): Skips a number of documents, allowing for pagination.
8. Returning the Result
   If the query is successful, the results (listings) are returned as a JSON response with a status code of 200 (OK).
9. Error Handling
   If an error occurs during the query execution, it is passed to the next function, which typically forwards the error to an error-handling middleware.

\\
Complete header search form functionality

1. add the import statements

```
import { useState } from "react";
import { useNavigate } from "react-router-dom";
```

2. add value and onChange event listeners to the search input type

```
<input
  type="text"
  placeholder="Search..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

3. place the search functionality icon within the button tags

```
<button>
  <FaSearch className="text-slate-600" />
</button>
```

4. add an onSubmit event listener to the form

```
<form onSubmit={handleSubmit}></form>
```

5. define the handleSubmit function
```
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
```

const [searchTerm, setSearchTerm] = useState("");

Initializes searchTerm state with an empty string and provides a function setSearchTerm to update it.
const navigate = useNavigate();

Gets the navigate function from React Router for programmatic navigation.
const handleSubmit = (e) => {

Defines a function handleSubmit to handle form submissions.
e.preventDefault();

Prevents the default form submission behavior.
const urlParams = new URLSearchParams(window.location.search);

Creates a URLSearchParams object to manage query parameters from the current URL.
urlParams.set("searchTerm", searchTerm);

Updates the searchTerm query parameter with the current value of searchTerm state.
const searchQuery = urlParams.toString();

Converts the updated query parameters to a string.
navigate(/search?${searchQuery});

Navigates to the /search page with the updated query parameters.
useEffect(() => {

Sets up a side effect that runs when location.search changes.
const urlParams = new URLSearchParams(location.search);

Retrieves the query parameters from the current URL.
const searchTermFromUrl = urlParams.get("searchTerm");

Extracts the searchTerm from the query parameters.
if (searchTermFromUrl) {

Checks if searchTerm exists in the URL.
setSearchTerm(searchTermFromUrl);

Updates the searchTerm state with the value from the URL.
}, [location.search]);

Re-runs the effect whenever location.search changes.

\\
Create search page UI
designed the UI for Search.jsx

\\
Add onChange and onSubmit functionality to the search page

\\
Create the listings item component and show listings
``` npm install -D @tailwindcss/line-clamp ```
the above is used to clamp a two line truncated statement

\\
Add show more listings functionality

1. add the show more listings button in the same div as the loading display
```
          {/* show more listings button */}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
```

2. define the onShowMoreClick function
```
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
```

git push

\\
Complete home page

designed and added all the necessary elements to the Home.jsx page including swiper

\\
Complete About page

Designed and completed the about page

\\
Deploy to render

1. go to root folder package.json and add a script
``` "build": "npm install && npm install --prefix serenity-homes-ui && npm run build --prefix serenity-homes-ui" ```

2. go to api/index.js
in the index.js

```
import path from "path";

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/serenity-homes-ui/dist/")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "serenity-homes-ui", "dist", "index.html"));
});
```

git push

\\
go to render 
create an account if you don't have one 




