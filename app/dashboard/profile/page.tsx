"use client";
import React, { useEffect, useRef, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { UserProfileResponse } from "@/app/_models/UserProfileResponse";
import SettingsCard from "@/components/SettingCardComponent/SettingsCard";
import UserCardComponent from "@/components/UserProfileComponent/user-card";
import { Session } from "next-auth/core/types";
import { boolean } from "zod";

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

const fetchUserProfile = async (token: string) => {
  try {
    const response = await fetch("http://localhost:8080/api/accounts/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const apiResponse = await response.json();
    return apiResponse.data as UserProfileResponse;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

const Profile = () => {

  const [isLoading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null
  );
  

  return (
    !isLoading && (
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
            <UserCardComponent {...(userProfile as UserProfileResponse)} />
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <SettingsCard info={userProfile} />
        </Grid>
      </Grid>
    )
  );
};

export default Profile;
