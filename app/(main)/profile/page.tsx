"use client";
import SettingsCard from "@/components/SettingCardComponent/SettingsCard";
import UserCardComponent from "@/components/UserProfileComponent/user-card";
import { UserProfileResponse } from "@/types/user-profile";
import { Grid, Paper } from "@mui/material";
import React from "react";
const mockUserData: UserProfileResponse = {
  id: 1,
  fullName: "Jane Doe",
  email: "jane@example.com",
  birthday: "1990-05-15T12:00:00.000Z",
  address: "456 Oak St",
  phone: "555-5678",
  status: true,
  gender: "FEMALE",
  roleDto: {
    id: 2,
    name: "User",
    code: "USER",
  },
};
const Profile = () => {
  return (
    <Grid minHeight={"500px"} className="pt-10" gap={"2rem"} container>
      <Grid alignSelf={""} item xs={4}>
        <Paper
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          elevation={3}
          className="p-8"
        >
          <UserCardComponent {...mockUserData}></UserCardComponent>
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <SettingsCard></SettingsCard>
      </Grid>
    </Grid>
  );
};

export default Profile;
