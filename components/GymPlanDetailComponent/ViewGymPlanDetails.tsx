import React from "react";
import { Dialog, DialogContent, Typography, Grid, Button } from "@mui/material";
import { GymPlanResponse } from "@/app/_models/GymPlanResponse";

interface GymPlanDetailsProps {
  gymPlan: GymPlanResponse;
  onClickClose: () => any;
  status: boolean;
}

const GymPlanDetails: React.FC<GymPlanDetailsProps> = ({
  gymPlan,
  onClickClose,
  status,
}) => {
  const dialogStyles = {
    padding: "20px",
    minWidth: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const titleStyles = {
    color: "#1a1363",
    marginBottom: "10px",
  };

  const subtitleStyles = {
    color: "#555",
    marginBottom: "20px",
  };

  const detailStyles = {
    marginBottom: "15px",
  };

  const buttonStyles = {
    backgroundColor: "#1a1363",
    color: "#fff",
    borderRadius: "5px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#0d0a4a",
    },
  };

  return (
    <Dialog
      onClose={onClickClose}
      aria-labelledby="customized-dialog-title"
      open={status}
    >
      <DialogContent style={dialogStyles}>
        <Typography variant="h4" align="center" style={titleStyles}>
          {gymPlan.name}
        </Typography>
        <Grid className="mt-6" container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" style={detailStyles}>
              <strong>Time Period:</strong> {gymPlan.timeAmount}{" "}
              {gymPlan.timeUnit}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" style={detailStyles}>
              <strong>Price:</strong> {gymPlan.price.toFixed(2)} VND
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" style={detailStyles}>
              <strong>Activation Status:</strong>{" "}
              {gymPlan.activate ? "Active" : "Inactive"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" style={detailStyles}>
              <strong>Description:</strong> {gymPlan.description}
            </Typography>
          </Grid>
        </Grid>
        <Typography
          variant="caption"
          align="center"
          style={{ color: "#777", marginTop: "20px", display: "block" }}
        >
          Created on {gymPlan.createdDate} | Register Number:{" "}
          {gymPlan.registerNumber}
        </Typography>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            variant="contained"
            style={buttonStyles}
            onClick={onClickClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GymPlanDetails;
