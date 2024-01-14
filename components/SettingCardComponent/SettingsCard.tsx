// IMPORTS
import React, { Component, use, useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "../CustomInputComponent/CustomInput";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

//APP
export default function SettingsCard(props: any) {
  //TAB STATES
  const [value, setValue] = React.useState(0);
  // FORM STATES
  const [user, setUser] = useState({
    ...props.info,
    showPassword: false,
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // GENDER SELECT STATES
  const genderSelect = [
    {
      value: "MALE",
      label: "Male",
    },
    {
      value: "FEMALE",
      label: "Female",
    },
  ];
  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  //BUTTON STATES
  const [edit, update] = useState({
    required: true,
    disabled: true,
    isEdit: true,
  });

  // EDIT -> UPDATE
  const changeButton = (event: any) => {
    event.preventDefault();
    user.showPassword = false;
    edit.disabled = !edit.disabled;
    edit.isEdit = !edit.isEdit;
    update({ ...edit });
  };

  // TOGGLE PASSWORD VISIBILITY
  const handlePassword = () => {
    user.showPassword = !user.showPassword;
    setUser({ ...user });
  };
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  //RETURN
  return (
    <Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
      {/* TABS */}
      <br></br>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Information" {...a11yProps(0)} />
        <Tab label="Password" {...a11yProps(1)} />
      </Tabs>
      <Divider></Divider>

      {/* MAIN CONTENT CONTAINER */}
      <Box component={"div"}>
        <TabPanel value={value} index={0}>
          <CardContent
            sx={{
              p: 3,

              textAlign: { xs: "center", md: "start" },
            }}
          >
            {/* FIELDS */}
            <FormControl fullWidth>
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                columnSpacing={5}
                rowSpacing={3}
              >
                {/* ROW 1: FIRST NAME */}
                <Grid component="form" item xs={6}>
                  <CustomInput
                    id="firstName"
                    name="firstName"
                    value={user.fullName}
                    onChange={changeField}
                    title="Full Name"
                    dis={edit.isEdit}
                    req={edit.required}
                  ></CustomInput>
                </Grid>

                <Grid item xs={6}>
                  <CustomInput
                    select
                    id="gender"
                    name="gender"
                    value={
                      user.gender == undefined
                        ? genderSelect[0].value
                        : user.gender
                    }
                    onChange={changeField}
                    title="Gender"
                    dis={edit.disabled}
                    req={edit.required}
                    //MAP THRU OPTIONS
                    content={genderSelect.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  ></CustomInput>
                </Grid>
                {/* ROW 3: PHONE */}
                <Grid item xs={6}>
                  <CustomInput
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={changeField}
                    title="Phone Number"
                    dis={edit.disabled}
                    req={edit.required}
                    //DIALING CODE
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">84+</InputAdornment>
                      ),
                    }}
                  ></CustomInput>
                </Grid>
                {/* ROW 3: EMAIL */}
                <Grid item xs={6}>
                  <CustomInput
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={changeField}
                    title="Email Address"
                    dis={edit.disabled}
                    req={edit.required}
                  ></CustomInput>
                </Grid>
                {/* BUTTON */}
                <Grid
                  container
                  justifyContent={{ xs: "center", md: "flex-end" }}
                  item
                  xs={12}
                >
                  <Button
                    type="button"
                    sx={{
                      p: "0.25rem 2rem",
                      my: 2,
                      height: "2.25rem",
                      opacity: 0.8,
                      "&:hover": { opacity: 1 },
                    }}
                    component="button"
                    size="large"
                    variant="contained"
                    style={{ backgroundColor: "var(--primary)" }}
                    onClick={() => changeButton(event)}
                  >
                    {edit.isEdit === false ? "UPDATE" : "EDIT"}
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </CardContent>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CardContent
            sx={{
              p: 3,

              textAlign: { xs: "center", md: "start" },
            }}
          >
            {/* FIELDS */}
            <FormControl fullWidth>
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                columnSpacing={5}
                rowSpacing={3}
              >
                {/* ROW 4: PASSWORD */}
                <Grid item xs={12}>
                  <CustomInput
                    id="pass"
                    name="pass"
                    value={user.pass}
                    onChange={changeField}
                    title="Current Password"
                    dis={edit.disabled}
                    req={edit.required}
                    type={user.showPassword ? "text" : "password"}
                    // PASSWORD ICON
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassword}
                            edge="end"
                            disabled={edit.disabled}
                          >
                            {user.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></CustomInput>
                </Grid>
                {/* ROW 4: PASSWORD */}
                <Grid item xs={12}>
                  <CustomInput
                    id="pass"
                    name="pass"
                    value={user.pass}
                    onChange={changeField}
                    title="New Password"
                    dis={edit.disabled}
                    req={edit.required}
                    type={user.showPassword ? "text" : "password"}
                    // PASSWORD ICON
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePassword}
                            edge="end"
                            disabled={edit.disabled}
                          >
                            {user.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  ></CustomInput>
                </Grid>
                {/* BUTTON */}
                <Grid
                  container
                  justifyContent={{ xs: "center", md: "flex-end" }}
                  item
                  xs={12}
                >
                  <Button
                    sx={{ p: "1rem 2rem", my: 2, height: "3rem" }}
                    component="button"
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() => changeButton(event)}
                  >
                    {edit.isEdit === false ? "SAVE" : "CHANGE"}
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </CardContent>
        </TabPanel>
      </Box>
    </Card>
  );
}
function updateUser() {
  throw new Error("Function not implemented.");
}
