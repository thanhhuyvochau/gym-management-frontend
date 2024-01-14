"use client";
import React from "react";
import { MUIDataTableColumn, MUIDataTableOptions } from "mui-datatables";
import { Box, Button, Typography } from "@mui/material";
import { AccountResponse } from "@/app/_models/AccountResponse";
import { Add, PlusOneRounded } from "@mui/icons-material";
import dynamic from "next/dynamic";
const MUIDataTable = dynamic(() => import("mui-datatables"), {
  ssr: false,
});
const mockUsers: AccountResponse[] = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, Cityville",
    phone: "123-456-7890",
    status: true,
    gender: "MALE",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    address: "456 Oak St, Townsville",
    phone: "987-654-3210",
    status: false,
    gender: "FEMALE",
  },
  // Add more mock users as needed
];

const columns: MUIDataTableColumn[] = [
  { label: "ID", name: "id" },
  { label: "Name", name: "fullName" },
  { label: "Email", name: "email" },
  { label: "Address", name: "address" },
  { label: "Phone", name: "phone" },
  {
    label: "Status",
    name: "status",
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
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <Typography className="mt-8 mb-8" variant="h3">
        Gym Onwer Management
      </Typography>
      <MUIDataTable
        title="Gym Owner Management"
        data={mockUsers}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default ManagerManagement;
