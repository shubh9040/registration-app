import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import { baseUrl } from "../../utils/constant";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
const defaultTheme = createTheme();

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      // Fetch user details from backend API using the token
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      const method = "api/user";
      const response = await axios.get(baseUrl + method, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("response: ", response);
      if (response.status === 200) {
        setUser(response.data); // Assuming user data is nested under 'user' key
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error or redirect to login if token is invalid
      navigate("/login");
    }
  };

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    if (currentTime >= 5 && currentTime < 12) {
      return "Good Morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div>
      <Navbar />

      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Welcome
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    placeItems: "center",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  <p>
                    <Typography variant="h5">{`${getGreeting()},${
                      user?.firstName
                    } ${user?.lastName}`}</Typography>
                  </p>
                  <img
                    src={user?.profilePicture}
                    alt="Profile"
                    height="200px"
                    width="200px"
                  />
                  <Typography variant="h6">
                    Mobile Number: {user?.mobileNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Homepage;
