import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { GymPlanResponse } from "@/app/_models/GymPlanResponse";
import CustomInput from "../CustomInputComponent/CustomInput";

interface EditGymPlanFormProps {
  gymPlan: GymPlanResponse;
  onCancel?: () => void;
  onSave?: (updatedPlan: GymPlanResponse) => void;
}

const EditGymPlanForm: React.FC<EditGymPlanFormProps> = ({
  gymPlan,
  onCancel,
  onSave,
}) => {
  const [editedPlan, setEditedPlan] = useState<GymPlanResponse>({ ...gymPlan });

  const handleFieldChange = (field: string, value: any) => {
    setEditedPlan((prevPlan) => ({ ...prevPlan, [field]: value }));
  };

  const handleSwitchChange = (
    field: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleFieldChange(field, event.target.checked);
  };

  const handleSave = () => {
    // onSave(editedPlan);
  };
  const [edit, update] = useState({
    required: true,
    disabled: false,
    isEdit: false,
  });

  return (
    <Dialog onClose={onCancel} open={true}>
      <DialogContent
        style={{
          padding: "20px",
          minWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          style={{ color: "#1a1363", marginBottom: "20px" }}
        >
          Edit Gym Plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInput
              onChange={(e: any) => handleFieldChange("name", e.target.value)}
              value={editedPlan.name}
              title={"Name"}
            ></CustomInput>
          </Grid>
          <Grid item xs={12}>
            <label style={{ fontWeight: "bold" }}>Description</label>
            <TextField
              margin="dense"
              size="small"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={editedPlan.description}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              fullWidth
              title="Time Period"
              label="Time Period"
              type="number"
              value={editedPlan.timeAmount}
              onChange={(e: any) =>
                handleFieldChange("timeAmount", e.target.value)
              }
            ></CustomInput>
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              title="Time Unit"
              label="Time Unit"
              select
              value={editedPlan.timeUnit}
              onChange={(e: any) =>
                handleFieldChange("timeUnit", e.target.value)
              }
              content={["ANNUAL", "MONTH", "YEAR"].map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            ></CustomInput>
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              title={"Price"}
              value={editedPlan.price}
              onChange={(e: { target: { value: string } }) =>
                handleFieldChange("price", parseFloat(e.target.value) || 0)
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">VND</InputAdornment>
                ),
              }}
            ></CustomInput>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={editedPlan.activate}
                  onChange={(e) => handleSwitchChange("activate", e)}
                />
              }
              label="Activation Status"
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button
            style={{
              borderRadius: "8px",
              color: "var(--primary)",
              backgroundColor: "#DEBA3B",
              fontWeight: 600,
            }}
            autoFocus
            onClick={handleSave}
          >
            Save Change
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditGymPlanForm;
