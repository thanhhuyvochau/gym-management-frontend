import { Box, Typography } from "@mui/material";
import React from "react";

const Daskboard = () => {
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <Typography variant="h1" style={{ color: "black" }}>
        Hello World
      </Typography>
    </Box>
  );
};

export default Daskboard;
