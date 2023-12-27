import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/*ICON FOR DASHBOARD */
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { Stack } from "@mui/material";
import DashBoardTopBar from "./top-bar";
import { Padding } from "@mui/icons-material";
const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  children: any;
}
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
export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          "Dashboard",
          "Profile",
          "Registration",
          "Plan",
          "Payment",
          "Inventory",
          "Member",
          "Report",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{desktopIcons[index]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <DashBoardTopBar
        drawerWidth={drawerWidth}
        onClickMobileIcon={handleDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--primary)",
              color: "var(--white)",
            },
          }}
          style={{ backgroundColor: "--var(--primary)" }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "var(--primary)",
              color: "var(--white)",
            },
          }}
          style={{ backgroundColor: "--var(--primary)" }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        color={"var(--primary)"}
      >
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
