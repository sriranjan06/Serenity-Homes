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
structure -> <Header><div> {/* left */} {/* center */} {/* right */} </div></Header>
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

