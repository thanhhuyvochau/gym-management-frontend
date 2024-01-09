"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Grid, Paper } from "@mui/material";
import { UserProfileResponse } from "@/types/user-profile";
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
  const session = useSession();
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      const sessionData = session.data as Session;
      if (session.status === "authenticated" && userProfile == null) {
        console.log("SESSION BEFORE CALL:" + sessionData.user.token);
        const profileData = await fetchUserProfile(sessionData.user.token);
        if (profileData) {
          setUserProfile(profileData);
        }
      }
    };

    fetchData();
  }, [session]);

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
          <UserCardComponent {...(userProfile as UserProfileResponse)} />
        </Paper>
      </Grid>
      <Grid item xs={7}>
        <SettingsCard />
      </Grid>
    </Grid>
  );
};

export default Profile;
