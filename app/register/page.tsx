import {
  Box,
  Button,
  Fab,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import classes from "./Register.module.css";
const Register = () => {
  return (
    <>
      <Grid className={classes.fullHeightContainer} container>
        <Grid
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={classes.fullHeightGridItem}
          container
          item
          xs={6}
        >
          <Box minWidth={"70%"} component="form" autoComplete="true">
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Typography
                style={{ color: " var( --main-font-color)" }}
                variant="h3"
              >
                Sign Up
              </Typography>
              <TextField
                className={classes.inputField}
                required
                label="Email"
              />
              <TextField
                className={classes.inputField}
                required
                label="Password"
              />
              <TextField
                className={classes.inputField}
                required
                label="rePassword"
              />
              <Box></Box>
              <Fab
                style={{
                  background: "var( --main-font-color)",
                  color: "white",
                }}
                className={classes.loginButton}
                variant="extended"
                sx={{ width: 100 }}
              >
                Register
              </Fab>
            </Stack>
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          item
          xs={6}
          style={{ maxHeight: "100%" }}
        >
          <Box
            component="img"
            src="./images/main-logo.png"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "scale-down",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
