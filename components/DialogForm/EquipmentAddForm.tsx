import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CustomInput from "../CustomInputComponent/CustomInput";
import axios from "axios";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const EquipmentAddForm = (props: any) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
    // const formData = new FormData();
    // formData.append("file", file);
    // axios
    //   .post("/upload", formData)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <Dialog
      onClose={props.onClickClose}
      aria-labelledby="customized-dialog-title"
      open={props.status}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"column"} gap={"0.5rem"}>
            <Typography color={"var(--primary)"} variant="h6">
              Add Equipment
            </Typography>
            <Button
              component="label"
              variant="text"
              endIcon={<FileUploadOutlinedIcon></FileUploadOutlinedIcon>}
              className="pl-0 justify-start"
            >
              Attach Photo
              <VisuallyHiddenInput onChange={handleFileUpload} type="file" />
            </Button>
          </Stack>
          {selectedImage == null ? (
            <Box
              style={{ background: "#807DA8", width: "109px", height: "109px" }}
              component={"div"}
            ></Box>
          ) : (
            <img
              src={selectedImage}
              alt="Equipment"
              style={{
                width: "109px",
                height: "109px",
              }}
            />
          )}
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid spacing={"6"} container>
          <Grid item xs={12}>
            <CustomInput title={"Equipment Name"}></CustomInput>
          </Grid>
          <Grid item xs={6}>
            <Stack
              justifyContent={"space-between"}
              direction={"column"}
              component={"div"}
              gap={"8px"}
            >
              <label style={{ fontWeight: "bold" }}>Status</label>
              <Select
                style={{ height: "43.3px", paddingBottom: "0" }}
                value={"USING"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value={"USING"}>USING</MenuItem>
                <MenuItem value={"UNUSED"}>UNUSED</MenuItem>
                <MenuItem value={"DAMAGED"}>DAMAGED</MenuItem>
              </Select>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <CustomInput title={"Quantity"}></CustomInput>
          </Grid>
          <Grid item xs={6}>
            <CustomInput title={"From"}></CustomInput>
          </Grid>
          <Grid item xs={6}>
            <CustomInput title={"To"}></CustomInput>
          </Grid>
          <Grid item xs={12}>
            <CustomInput title={"Cost Per"}></CustomInput>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="p-6">
        <Button
          style={{
            border: "2px #1A1363",
            fontWeight: "normal",
            borderRadius: "8px",
          }}
          variant="outlined"
          color="info"
          autoFocus
          onClick={props.onClickClose}
        >
          Cancel
        </Button>
        <Button
          style={{
            borderRadius: "8px",
            color: "var(--primary)",
            backgroundColor: "#DEBA3B",
            fontWeight: 600,
          }}
          autoFocus
          onClick={props.onClickClose}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentAddForm;
