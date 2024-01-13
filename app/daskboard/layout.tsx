"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";

/*ICON FOR DASHBOARD */
import DashBoardTopBar from "../../components/TopBarComponent/top-bar";
import SideBarComponent from "@/components/SideBarComponent/side-bar";
import { Avatar, Stack, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UserProfileResponse } from "../_models/UserProfileResponse";
import { Session } from "next-auth";

const drawerWidth = 260;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [isLoading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfileResponse | null>(
    null
  );
  React.useEffect(() => {
    const fetchData = async () => {
      const sessionData = session.data as Session;
      if (session.status === "authenticated" && userProfile == null) {
        console.log("SESSION BEFORE CALL:" + sessionData.user.token);
        const profileData = await fetchUserProfile(sessionData.user.token);
        if (profileData) {
          setUserProfile(profileData);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [session]);
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/accounts/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      const apiResponse = await response.json();
      return apiResponse.data as UserProfileResponse;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  let avatarSize = { width: "100px", height: "100px" };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  let avtEle = (
    <AccountCircleIcon style={{ ...avatarSize }}></AccountCircleIcon>
  );
  const drawer = (
    <div>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        className="pt-4 pb-4"
      >
        <Box sx={{ borderRadius: 1 }} component={"div"}>
          {avtEle}
        </Box>
        <Stack gap={"0.5rem"} direction={"column"} alignItems={"center"}>
          <Typography variant="subtitle2">{userProfile?.fullName}</Typography>
          <Typography variant="inherit">{userProfile?.email}</Typography>
        </Stack>
      </Stack>

      <SideBarComponent></SideBarComponent>
    </div>
  );

  // Remove this const when copying and pasting into your project.

  return (
    <Box height={"100%"} sx={{ display: "flex" }}>
      <DashBoardTopBar
        drawerWidth={drawerWidth}
        onClickMobileIcon={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--primary)",
              color: "var(--white)",
            },
          }}
          style={{ backgroundColor: "--var(--primary)" }}
        >
          {isLoading && drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--primary)",
              color: "var(--white)",
              paddingLeft: "26px"
            },
          }}
          style={{ backgroundColor: "--var(--primary)" }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        color={"var(--primary)"}
      >
        <Toolbar />
        <Box component={"div"}>{children}</Box>
      </Box>
    </Box>
  );
}
