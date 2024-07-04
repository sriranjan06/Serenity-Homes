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
