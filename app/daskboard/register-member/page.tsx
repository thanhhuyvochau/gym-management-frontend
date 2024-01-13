import CustomInput from "@/components/CustomInputComponent/CustomInput";

import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const RegisterMember = () => {
  return (
    <>
      <Box className="mt-6" component={"div"} width={"100%"}>
        <Typography color={"#DEBA3B"} variant="h5">
          Become a Member!
        </Typography>
        <Typography color={"#1A1363"} variant="h3">
          Register
        </Typography>
        <Paper
          style={{ borderRadius: "12" }}
          elevation={6}
          className="mt-16 p-5 pt-9"
        >
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <CustomInput title={"Name of Participant"}></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput title={"Date of Join"}></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput title={"Email Address"}></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput title={"Contact No."}></CustomInput>
            </Grid>
            <Grid item xs={6}>
              <CustomInput title={"Plan"}></CustomInput>
            </Grid>
          </Grid>
          <Stack spacing={3} direction={"row"} justifyContent={"end"}>
            <Button
              style={{
                background: "#1A1363",
                color: "white",
                fontWeight: "600",
                padding: "0.25rem 1rem",
                minWidth: "100px",
                borderRadius: "12",
              }}
            >
              Avail Membership
            </Button>
            <Button
              style={{
                padding: "0.25rem 1rem",
                minWidth: "100px",
                borderRadius: "12",
              }}
              variant="outlined"
              color="success"
            >
              Edit
            </Button>
          </Stack>
        </Paper>
      </Box>
    </>
  );
};

export default RegisterMember;
