"use client";
import React from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { Box } from "@mui/material";
const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"],
];
const columns = ["Name", "Company", "City", "State"];
const options: MUIDataTableOptions = {
  filterType: "checkbox",
  tableBodyMaxHeight: "100"
  
};
const AccountManagementComponent = () => {
  return (
    <Box className="children-box" component={"div"} height={"100%"}>
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default AccountManagementComponent;
