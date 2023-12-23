import {
  Box,
  Button,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import classes from "./Register.module.css";
import Link from "next/link";
import Input from "@mui/material/Input";

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
          xs={12}
          sm={6}
        >
          <Box
            width="65%"
            maxWidth="25rem"
            height="100%"
            className="mt-16"
            minWidth={{ xs: "100%", sm: "25rem" }}
            component="form"
            autoComplete="true"
          >
            <Stack justifyContent="center" alignItems="center" spacing={4}>
              <Typography
                style={{ color: " var( --main-font-color)" }}
                variant="h3"
              >
                Sign Up
              </Typography>

              <Grid container direction="column">
                <InputLabel
                  style={{ color: "var(--main-font-color)" }}
                  htmlFor="emailInput"
                >
                  <Typography fontWeight="600" variant="h5">
                    Email
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  id="emailInput"
                  style={{ border: "solid 4px #332F64", borderRadius: "10px" }}
                  required
                />
              </Grid>
              <Grid container direction="column">
                <InputLabel
                  style={{ color: "var(--main-font-color)" }}
                  htmlFor="passwordInput"
                >
                  <Typography fontWeight="600" variant="h5">
                    Create Password
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: "solid 4px #332F64", borderRadius: "10px" }}
                  required
                  id="passwordInput"
                />
              </Grid>
              <Grid container direction="column">
                <InputLabel
                  style={{ color: "var(--main-font-color)" }}
                  htmlFor="passwordInput"
                >
                  <Typography fontWeight="600" variant="h5">
                    Re-type Password
                  </Typography>
                </InputLabel>
                <TextField
                  className={classes.inputField}
                  style={{ border: "solid 4px #332F64", borderRadius: "10px" }}
                  required
                  id="passwordInput"
                />
              </Grid>

              <Fab
                style={{
                  background: "var( --main-font-color)",
                  color: "white",
                }}
                variant="extended"
                sx={{ width: "100%" }}
              >
                <Typography variant="h5">Register</Typography>
              </Fab>
              <Grid
                justifyContent="space-between"
                direction="row"
                container
                item
                xs={12}
              >
                <FormControlLabel
                  style={{ color: "var(--main-font-color)" }}
                  control={<Checkbox />}
                  label="Accept all the Terms and Conditions"
                />
              </Grid>
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
              maxHeight: "80%",
              objectFit: "scale-down",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
