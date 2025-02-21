import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  // const [user, setUser] = useSelector((state) => state.reducer.);
  console.log(user, "user");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = token;
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("Profile")));
  }, [location]);
  return (
    <AppBar
      className="appbar"
      position="static"
      color="inherit"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: "15px",
        margin: "30px 0",
        padding: "0 10px",
        alignItems: "center",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={memoriesText}
          alt="Memories"
          height="45px"
          style={{ marginLeft: "15px" }}
        />
        <img
          src={memoriesLogo}
          alt="MemoriesLogo"
          height="45px"
          className="image"
          style={{ marginLeft: "15px" }}
        />
      </Link>
      <Toolbar
        style={{ display: "flex", justifyContent: "flex-end", width: "400px" }}
      >
        {user?.result ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <Avatar alt={user.result.name} src={user.result.img}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography
              variant="h6"
              style={{ display: "flex", alignItems: "center" }}
            >
              {user.result.name}
            </Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Log out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign in
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
