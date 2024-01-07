import { UserProfileResponse } from "@/types/user-profile";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
const UserCardComponent = (userProfile: UserProfileResponse) => {
  let avatarSize = { width: "100px", height: "100px" };
  let maxWidth = "400px";
  let minWidth = "300px";
  let avtEle = (
    <AccountCircleIcon style={{ ...avatarSize }}></AccountCircleIcon>
  );

  return (
    <Stack gap={"2rem"} justifyContent={"center"} maxWidth={maxWidth} minWidth={minWidth} height={"100%"} direction={"column"}>
      <Stack
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box sx={{ borderRadius: 1 }} component={"div"}>
          {avtEle}
        </Box>
        <Stack gap={"0.5rem"} direction={"row"} alignItems={"center"}>
          <BorderColorOutlinedIcon
            style={{ width: "1.2rem", height: "1.2rem" }}
          ></BorderColorOutlinedIcon>
          <Typography variant="subtitle2">Update Profile</Typography>
        </Stack>
      </Stack>
      <Stack className="mt-6" alignItems={"center"} direction={"column"}>
        <Grid className="mb-3" container>
          <Grid item xs={4}>
            <Typography
              fontWeight={"bold"}
              textAlign={"left"}
              variant="subtitle2"
            >
              Name
            </Typography>
          </Grid>
          <Grid alignSelf={"flex-end"} item xs={8}>
            <Typography textAlign={"right"} variant="subtitle2">
              JuanDelaCruz
            </Typography>
          </Grid>
        </Grid>
        <Grid className="mb-3" container>
          <Grid item xs={4}>
            <Typography
              fontWeight={"bold"}
              textAlign={"left"}
              variant="subtitle2"
            >
              Contact no
            </Typography>
          </Grid>
          <Grid alignSelf={"flex-end"} item xs={8}>
            <Typography textAlign={"right"} variant="subtitle2">
              09123456789
            </Typography>
          </Grid>
        </Grid>
        <Grid justifyContent={"space-between"} className="mb-3" container>
          <Grid item>
            <Typography
              fontWeight={"bold"}
              textAlign={"left"}
              variant="subtitle2"
            >
              Email
            </Typography>
          </Grid>
          <Grid item>
            <Typography textAlign={"right"} variant="subtitle2">
              juan.delacruz@gmail.com
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

export default UserCardComponent;
