"use client";
import React, { useState } from "react";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AccountResponse } from "@/app/_models/AccountResponse";
import { Add, PlusOneRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
import { MemberResponse } from "@/app/_models/MemberResponse";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import MemberCard from "@/components/MemberCardComponent/MemberCard";
const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
});
const mockUsers: MemberResponse[] = [
  {
    id: 1,
    fullName: "John Doe",
    gender: "Male",
    dateOfBirth: "1990-01-01",
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    streetAddress: "123 Main St",
    city: "Cityville",
    stateProvince: "State A",
    membershipType: "Premium",
    membershipStartDate: "2022-01-01",
    membershipEndDate: "2022-12-31",
    membershipStatus: true,
  },
  {
    id: 2,
    fullName: "Jane Smith",
    gender: "Female",
    dateOfBirth: "1985-03-15",
    email: "jane.smith@example.com",
    phoneNumber: "987-654-3210",
    streetAddress: "456 Oak St",
    city: "Townsville",
    stateProvince: "State B",
    membershipType: "Regular",
    membershipStartDate: "2022-02-15",
    membershipStatus: true,
  },
  {
    id: 3,
    fullName: "Bob Johnson",
    gender: "Male",
    dateOfBirth: "1982-07-20",
    email: "bob.johnson@example.com",
    phoneNumber: "555-123-4567",
    streetAddress: "789 Pine St",
    city: "Villageville",
    stateProvince: "State C",
    membershipType: "Basic",
    membershipStartDate: "2022-03-10",
    membershipEndDate: "2022-09-10",
    membershipStatus: false,
  },
];

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

const ManagerManagement = () => {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    console.log("OPEN POPUP");

    setOpen(false);
  };
  const columns: MUIDataTableColumn[] = [
    { label: "ID", name: "id" },
    { label: "Name", name: "fullName" },
    { label: "Email", name: "email", options: { display: "false" } },
    { label: "Plan Type", name: "membershipType" },
    {
      label: "Plan Status",
      name: "membershipStatus",
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
    { label: "Gender", name: "gender" },
    {
      label: "",
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
                  let selectedMember = mockUsers[rowIndex];
                  handleViewDetail(selectedMember);
                }}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            </Stack>
          );
        },
      },
    },
  ];
  const [selectMember, setMember] = useState<MemberResponse | null>(null);
  const handleViewDetail = (member: MemberResponse) => {
    setMember(member);
    handleClickOpen();
  };
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <Typography className="mt-8 mb-16" variant="h3">
        Member Management
      </Typography>
      <MUIDataTable
        title="Gym Owner Management"
        data={mockUsers}
        columns={columns}
        options={options}
      />
      {open == true && selectMember !== null && (
        <MemberCard
          status={open}
          onClickClose={handleClickClose}
          member={selectMember!}
        ></MemberCard>
      )}
    </Box>
  );
};

export default ManagerManagement;
