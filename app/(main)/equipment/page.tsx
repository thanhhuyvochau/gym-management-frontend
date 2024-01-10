"use client";
import { EquimentResponse } from "@/app/_models/equipment";
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumn,
  MUIDataTableOptions,
} from "mui-datatables";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CustomizedButtons, {
  ColorButton,
} from "@/components/CustomButton/ViewButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EquipmentAddForm from "@/components/DialogForm/EquipmentAddForm";
const columns: MUIDataTableColumn[] = [
  { label: "Code", name: "code" },
  { label: "Name", name: "name" },
  { label: "From", name: "expectUseFrom" },
  { label: "To", name: "expectUserTo" },
  {
    label: "Cost Per",
    name: "costPer",
    options: {
      customBodyRender: (value: number) => {
        return value + "VND";
      },
    },
  },
  { label: "Status", name: "status" },
  { label: "Quantity", name: "quantity" },
  {
    label: "",
    name: "",
    options: {
      customBodyRender: () => {
        return (
          <Stack gap={"0.5rem"} direction={"row"}>
            <Button
              variant="outlined"
              color="info"
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
            <Button variant="outlined" color="success" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Stack>
        );
      },
    },
  },
];

const EquimentComponent = () => {
  const mockEquipmentData: EquimentResponse[] = [
    {
      id: 1,
      code: "TREADMILL-001",
      name: "Treadmill",
      expectUseFrom: "2022-01-01",
      expectUserTo: "2022-12-31",
      costPer: 1200,
      status: "USING",
      quantity: 3,
    },
    {
      id: 2,
      code: "BIKE-002",
      name: "Stationary Bike",
      expectUseFrom: "2022-03-15",
      expectUserTo: "2023-03-14",
      costPer: 500,
      status: "UNUSED",
      quantity: 2,
    },
    {
      id: 3,
      code: "DUMBBELL-003",
      name: "Dumbbell Set",
      expectUseFrom: "2022-02-10",
      expectUserTo: "2023-02-09",
      costPer: 800,
      status: "DAMAGED",
      quantity: 1,
    },
    {
      id: 4,
      code: "YOGA-MAT-004",
      name: "Yoga Mat",
      expectUseFrom: "2022-04-01",
      expectUserTo: "2023-03-31",
      costPer: 30,
      status: "UNUSED",
      quantity: 10,
    },
    // Add more gym equipment mock data as needed
  ];
  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    console.log("OPEN POPUP");

    setOpen(false);
  };
  const options: MUIDataTableOptions = {
    filterType: "checkbox",
    tableBodyMaxHeight: "100",
    print: false,
    download: false,
    selectableRows: "single",
    customToolbarSelect(selectedRows, displayData, setSelectedRows) {
      return (
        <>
          <Button
            startIcon={<DeleteIcon></DeleteIcon>}
            sx={{ "&:hover": { color: "red" }, color: "grey" }}
          >
            Delete
          </Button>
        </>
      );
    },
    searchAlwaysOpen: true,
    responsive: "standard",
    customToolbar(data) {
      return (
        <Button
          onClick={handleClickOpen}
          sx={{ "&:hover": { color: "blue" }, color: "grey" }}
        >
          <Add></Add>
        </Button>
      );
    },
  };
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <Typography className="mt-16 mb-16" variant="h3">
        Equipment Management
      </Typography>
      <MUIDataTable
        title="Gym Owner Management"
        data={mockEquipmentData}
        columns={columns}
        options={options}
      />
      <EquipmentAddForm
        status={open}
        onClickClose={handleClickClose}
      ></EquipmentAddForm>
    </Box>
  );
};

export default EquimentComponent;
