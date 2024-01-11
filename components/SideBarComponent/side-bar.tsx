import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
/*ICON FOR DASHBOARD */
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import DashBoardTopBar from "../../components/TopBarComponent/top-bar";
import { SideBarItem } from "@/app/_models/SideBarItem";
import { GYM_ADMIN, GYM_OWNER } from "@/app/_constants/role";
import { useSession } from "next-auth/react";
import { log } from "console";
import { getServerSession } from "next-auth";

const desktopIcons = [
  <SpaceDashboardOutlinedIcon style={{ color: "white" }} />,
  <OtherHousesOutlinedIcon style={{ color: "white" }} />,
  <AppRegistrationOutlinedIcon style={{ color: "white" }} />,
  <AssignmentSharpIcon style={{ color: "white" }} />,
  <PaymentOutlinedIcon style={{ color: "white" }} />,
  <Inventory2OutlinedIcon style={{ color: "white" }} />,
  <PeopleOutlinedIcon style={{ color: "white" }} />,
  <AssessmentOutlinedIcon style={{ color: "white" }} />,
];

const allSideBarItem: SideBarItem[] = [
  {
    label: "Dashboard",
    icon: desktopIcons[0],
    forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
    link: "/daskboard",
  },
  {
    label: "Profile",
    icon: desktopIcons[1],
    forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
    link: "/profile",
  },
  {
    label: "Registration",
    icon: desktopIcons[2],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: "/registe-member",
  },
  {
    label: "Plan",
    icon: desktopIcons[3],
    forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
    link: "/plan",
  },
  {
    label: "Payment",
    icon: desktopIcons[4],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: "/payment",
  },
  {
    label: "Inventory",
    icon: desktopIcons[5],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: "/inventory",
  },
  {
    label: "Member",
    icon: desktopIcons[6],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: "/member",
  },
  {
    label: "Report",
    icon: desktopIcons[7],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: "/report",
  },
];

const SideBarComponent = () => {
  const { data: session } = useSession();
  const generateSideBarByRole = () => {
    let sideBarBasedOnRole: SideBarItem[] = [];
    let userRoles = session?.user.roles;
    if (userRoles == undefined) userRoles = [];
    sideBarBasedOnRole = allSideBarItem.filter((navItem) => {
      if (!hasExistInList(userRoles as string[], navItem.forRole)) {
        return;
      } else {
        return navItem;
      }
    });

    return sideBarBasedOnRole;
  };
  const hasExistInList = (arr1: string[], arr2: string[]): boolean => {
    return arr1.some((item) => arr2.includes(item));
  };

  let sideBarBasedOnRole = generateSideBarByRole();
  return (
    <List>
      {generateSideBarByRole().map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default SideBarComponent;
