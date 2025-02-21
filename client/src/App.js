import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Redirect,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("Profile"));
  console.log(user, "user");
  return (
    <GoogleOAuthProvider clientId="248071233476-a22ast9mkpimam5sn9eralt7o240msao.apps.googleusercontent.com">
      <BrowserRouter>
        <Container maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/" exact element={<Navigate to="/posts" />} />
            <Route path="/posts" exact element={<Home />} />
            <Route path="/posts/search" exact element={<Home />} />
            <Route path="/posts/:id" exact element={<PostDetails />} />
            <Route
              path="/auth"
              exact
              element={!user ? <Auth /> : <Navigate to="/posts" />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
