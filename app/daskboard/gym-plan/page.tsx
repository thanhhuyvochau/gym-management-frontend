"use client";
import React, { useState } from "react";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AccountResponse } from "@/app/_models/AccountResponse";
import { Add, PlusOneRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { GymPlanResponse } from "@/app/_models/GymPlanResponse";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import GymPlanDetails from "@/components/GymPlanDetailComponent/ViewGymPlanDetails";
import { log } from "console";
import EditGymPlanForm from "@/components/GymPlanDetailComponent/EditGymPlanForm";

const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
});

const options: MUIDataTableOptions = {
  filterType: "checkbox",
  tableBodyMaxHeight: "100",
  print: false,
  download: false,
  selectableRows: "single",
  customToolbarSelect(selectedRows, displayData, setSelectedRows) {
    return <></>;
  },
  searchAlwaysOpen: true,
  responsive: "standard",
  customToolbar(data) {
    return (
      <Button sx={{ "&:hover": { color: "green" }, color: "grey" }}>
        <Add></Add>
      </Button>
    );
  },
};
const GymPlanManagement = () => {
  const [openDetail, setOpenDetail] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = useState<GymPlanResponse | null>(
    null
  );
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleClickOpen = () => {
    setOpenDetail(true);
  };
  const handleClickClose = () => {
    setOpenEdit(false);
  };
  const handleClickOpenEditForm = () => {
    setOpenEdit(true);
  };
  const handleClickCloseEditForm = () => {
    setOpenEdit(false);
  };
  const mockGymPlanData: GymPlanResponse[] = [
    {
      id: 1,
      name: "Basic Plan",
      description: "Access to basic gym facilities",
      timeUnit: "MONTH",
      timeAmount: 1,
      price: 29.99,
      activate: true,
      createdDate: "2022-01-01",
      registerNumber: 100,
    },
    {
      id: 2,
      name: "Premium Plan",
      description: "Access to premium gym facilities and classes",
      timeUnit: "MONTH",
      timeAmount: 3,
      price: 79.99,
      activate: true,
      createdDate: "2022-02-15",
      registerNumber: 75,
    },
    {
      id: 3,
      name: "Annual Plan",
      description: "Access to all gym facilities for a year",
      timeUnit: "YEAR",
      timeAmount: 1,
      price: 349.99,
      activate: true,
      createdDate: "2022-03-10",
      registerNumber: 50,
    },
    {
      id: 4,
      name: "Student Plan",
      description: "Special plan for students",
      timeUnit: "MONTH",
      timeAmount: 6,
      price: 49.99,
      activate: false,
      createdDate: "2022-04-20",
      registerNumber: 30,
    },
  ];

  const columns: MUIDataTableColumn[] = [
    { label: "Plan Name", name: "name" },
    { label: "Price (VND)", name: "price" },
    {
      label: "Register",
      name: "registerNumber",
    },
    {
      label: "Status",
      name: "activate",
      options: {
        customBodyRender(value, tableMeta, updateValue) {
          return (
            <>
              {value ? (
                <Typography
                  fontSize={"1rem"}
                  fontWeight={"normal"}
                  variant="h6"
                  color="green"
                >
                  Active
                </Typography>
              ) : (
                <Typography
                  fontSize={"1rem"}
                  fontWeight={"normal"}
                  variant="h6"
                  color="red"
                >
                  In Active
                </Typography>
              )}
            </>
          );
        },
      },
    },
    {
      label: "Action",
      name: "",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <Stack gap={"0.5rem"} direction={"row"}>
              <Button
                variant="outlined"
                color="info"
                startIcon={<VisibilityIcon />}
                onClick={() => {
                  let rowIndex = tableMeta.rowIndex;
                  let selectedPlan = mockGymPlanData[rowIndex];
                  setSelectedPlan(selectedPlan);
                  handleClickOpen();
                }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<EditIcon />}
                onClick={() => {
                  let rowIndex = tableMeta.rowIndex;
                  let selectedPlan = mockGymPlanData[rowIndex];
                  setSelectedPlan((previous) => {
                    return (previous = selectedPlan);
                  });
                  handleClickOpenEditForm();
                }}
              >
                Edit
              </Button>
            </Stack>
          );
        },
      },
    },
  ];
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <Typography className="mt-8 mb-16" variant="h3">
        Gym Plan Management
      </Typography>

      {selectedPlan !== null && (
        <GymPlanDetails
          onClickClose={handleClickClose}
          status={openDetail}
          gymPlan={selectedPlan as any}
        ></GymPlanDetails>
      )}
      <MUIDataTable
        title="Gym Owner Management"
        data={mockGymPlanData}
        columns={columns}
        options={options}
      />
      {selectedPlan !== null && (
        <EditGymPlanForm
          gymPlan={selectedPlan as any}
          onOpen={openEdit}
          onCancel={handleClickCloseEditForm}
        ></EditGymPlanForm>
      )}
    </Box>
  );
};

export default GymPlanManagement;
