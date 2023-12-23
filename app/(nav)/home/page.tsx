import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import classes from "./Main.module.css";
import { title } from "process";

interface OfferCardProps {
  title: string;
  icon: string;
}
interface PlanCardProps {
  timeUnit?: string;
  amount?: number;
  name: string;
  icon: string;
  backgroudColor: string;
  border?: string;
  fontColor: string;
}

const PlanCard = (props: PlanCardProps) => {
  let planCardHeader;
  if (props.timeUnit && props.amount) {
    planCardHeader = (
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"space-between"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography alignSelf={"end"} variant="h4">
            {props.amount}
          </Typography>
          <Box
            component={"img"}
            src={props.icon}
            style={{
              width: "65%",
              height: "65%",
              objectFit: "scale-down",
              alignSelf: "start",
            }}
          />
        </Stack>
        <Stack>
          <Typography textAlign={"left"} variant="h5">
            {props.timeUnit}
          </Typography>
        </Stack>
      </Stack>
    );
  } else {
    planCardHeader = (
      <Stack
        padding={"0.5rem"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          component={"img"}
          src={props.icon}
          style={{
            width: "65%",
            height: "65%",
            objectFit: "scale-down",
          }}
        />
        <Stack>
          <Typography textAlign={"center"} variant="h5">
            {props.timeUnit}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        direction={"row"}
        style={{
          backgroundColor: props.backgroudColor,
          borderRadius: "27px",
          color: props.fontColor,
          width: "211px",
          height: "211px",
          padding: "0.85rem",
          border: "3px solid #FFF",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
        component={"div"}
        spacing={2}
      >
        <Stack
          flexGrow={1}
          border={props.border ? props.border : "none"}
          style={{
            borderRadius: "27px",
            height: "100%",
            width: "100%",
            padding: "1rem",
          }}
          direction={"column"}
          justifyContent={"center"}
        >
          {planCardHeader}
          <Stack direction={"row"} justifyContent={"center"} padding={"0 0"}>
            <Typography textAlign={"center"}>{props.name}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

const OfferCard = (props: OfferCardProps) => {
  return (
    <>
      <Stack
        direction={"row"}
        style={{
          backgroundColor: "#ECE9E9",
          borderRadius: "27px",
          color: "var(--main-font-color)",
          width: "211px",
          height: "211px",
          padding: "0.5rem",
        }}
        component={"div"}
        spacing={5}
      >
        <Stack
          style={{
            border: "4px solid #1A1363",
            borderRadius: "27px",
            height: "100%",
            width: "100%",
          }}
          direction={"column"}
        >
          <Stack direction={"row"}>
            <Box
              component={"img"}
              src={props.icon}
              style={{
                width: "70%",
                height: "100%",
                objectFit: "scale-down",
              }}
            ></Box>
          </Stack>
          <Stack direction={"row"} justifyContent={"end"} padding={"0 1rem"}>
            <Typography>{props.title}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

const Main = () => {
  return (
    <Stack>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="div"
        className={classes.introduction}
      >
        <Grid container>
          <Grid container justifyContent={"center"} item md={6}>
            <Stack
              direction="column"
              justifyContent={"center"}
              maxWidth={"28rem"}
            >
              <Typography variant="h3">
                Start Simplify Your Bussiness
              </Typography>
              <Typography className="text-yellow-300" variant="h3">
                Come Join Us
              </Typography>
              <Button
                style={{
                  maxWidth: "10rem",
                  background: "white",
                  color: "var(--main-font-color)",
                  fontWeight: 600,
                  marginTop: "2rem",
                }}
                variant="contained"
              >
                Learn More
              </Button>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Box
              component="img"
              src="./images/main-logo.png"
              style={{
                width: "70%",
                height: "100%",
                objectFit: "scale-down",
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.about} component="div">
        <Grid container>
          <Grid item xs={12}>
            <Typography textAlign={"center"} variant="h5">
              About
            </Typography>
            <Typography textAlign={"center"} variant="h3">
              STAMINA GYM MANAGEMENT PLATFORM
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Box
                component="img"
                src="./images/gym-model.png"
                style={{
                  width: "100%",
                  height: "50%",
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Stack direction={"column"}>
                <Box component={"div"}>
                  <Typography
                    style={{
                      color: "#FFFF7D",
                      fontWeight: "700",
                      letterSpacing: "1px",
                      lineHeight: "normal",
                    }}
                    className="pt-16"
                    variant="h6"
                  >
                    Welcome to STAMINA Platform – the ultimate solution for
                    small gym management. Streamline your operations, engage
                    members effortlessly, and elevate your fitness business.
                    Simplify, thrive, and transform the way you run your gym
                    with us. Welcome to efficiency, welcome to growth, welcome
                    to success. Sign up now!
                  </Typography>
                </Box>
                <Box className="mt-5" component={"div"}>
                  <Typography variant="h5">What we offer:</Typography>
                  <Stack
                    style={{ width: "100%", marginTop: "2.5rem" }}
                    direction={"row"}
                    spacing={2}
                  >
                    <OfferCard title="Support" icon="./images/elipse16.png" />
                    <OfferCard title="Simple" icon="./images/target-fill.png" />
                    <OfferCard
                      title="Effective"
                      icon="./images/target-fill.png"
                    />
                  </Stack>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          background: "#ECE9E9",
          color: "#151515",
          height: "500px",
          padding: "3rem",
        }}
        component="div"
      >
        <Stack direction={"row"} justifyContent={"end"}>
          <Typography letterSpacing={"4px"} fontWeight={"normal"} variant="h5">
            JOIN OUR MEMBERSHIP
          </Typography>
        </Stack>

        <Stack direction={"column"} color={"--var(main-font-color)"}>
          <Typography style={{}} variant="h4">
            Our Plan
          </Typography>
          <Stack
            width={"100%"}
            spacing={2}
            direction={"row"}
            justifyContent={"end"}
            className="mt-10"
          >
            <PlanCard
              name="Annual Membership"
              icon="./images/mdi_chess-pawn.png"
              backgroudColor="white"
              fontColor="--var(main-font-color)"
              border="4px solid #1A1363"
            />
            <PlanCard
              name="Weekly Rate"
              icon="./images/mdi_chess-knight.png"
              backgroudColor="#3E3E3E"
              amount={7}
              timeUnit="Days"
              fontColor="white"
            />
            <PlanCard
              name="Monthly Rate"
              icon="./images/mdi_chess-bishop.png"
              backgroudColor="#77749B"
              timeUnit="Month"
              amount={1}
              fontColor="white"
            />
            <PlanCard
              name="Biannual Rate"
              icon="./images/mdi_chess-king.png"
              backgroudColor="#332F64"
              timeUnit="Months"
              amount={6}
              fontColor="white"
            />
            <PlanCard
              name="Annual Rate"
              icon="./images/mdi_crown.png"
              backgroudColor="#1A1363"
              timeUnit="Year"
              amount={1}
              fontColor="white"
            />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Main;
