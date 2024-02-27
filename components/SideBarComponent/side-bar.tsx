import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, makeStyles } from '@mui/material';
import React, { useState } from 'react';
/*ICON FOR DASHBOARD */
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { SideBarItem } from '@/app/_models/SideBarItem';
import { GYM_ADMIN, GYM_OWNER } from '@/app/_constants/role';
import Link from 'next/link';

const desktopIcons = [
  <SpaceDashboardOutlinedIcon style={{ color: 'white' }} />,
  <OtherHousesOutlinedIcon style={{ color: 'white' }} />,
  <AppRegistrationOutlinedIcon style={{ color: 'white' }} />,
  <AssignmentSharpIcon style={{ color: 'white' }} />,
  <PaymentOutlinedIcon style={{ color: 'white' }} />,
  <Inventory2OutlinedIcon style={{ color: 'white' }} />,
  <PeopleOutlinedIcon style={{ color: 'white' }} />,
  <AssessmentOutlinedIcon style={{ color: 'white' }} />,
];
const styles = {
  '&.Mui-selected': {
    backgroundColor: '#ffffffd9',
    color: 'var(--primary)',
    borderRadius: '10px 0px 0px 10px',
  },
  '&.Mui-selected svg': {
    backgroundColor: 'transparent',
    color: '#1a1363 !important',
    fontWeight: '500 !important',
  },
  '&.Mui-selected .MuiTypography-root': {
    fontWeight: '500 !important',
  },
};
const allSideBarItem: SideBarItem[] = [
  {
    label: 'Dashboard',
    icon: desktopIcons[0],
    forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/statistic',
  },
  {
    label: 'Profile',
    icon: desktopIcons[1],
    forRole: [GYM_ADMIN, GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/profile',
  },
  {
    label: 'Registration',
    icon: desktopIcons[2],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/member',
  },
  {
    label: 'Plan',
    icon: desktopIcons[3],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/gym-plan',
  },
  {
    label: 'Payment',
    icon: desktopIcons[4],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/payment',
  },
  {
    label: 'Inventory',
    icon: desktopIcons[5],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/inventory',
  },
  {
    label: 'Member',
    icon: desktopIcons[6],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/member',
  },
  {
    label: 'Report',
    icon: desktopIcons[7],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/report',
  },
];

const SideBarComponent = () => {
  const generateSideBarByRole = () => {
    let sideBarBasedOnRole: SideBarItem[] = [];
    let userRoles = ['ROLE_GYM_OWNER'];
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

  const [selectIndex, setSelectedNavItem] = useState(0);

  return (
    <List>
      {generateSideBarByRole().map((item, index) => (
        <ListItem
          style={{ width: '100%', display: 'block' }}
          key={index}
          disablePadding
          selected={index === selectIndex}
          onClick={() => setSelectedNavItem(index)}
          sx={styles}
        >
          <Link style={{ background: '#ffffff' }} href={item.link}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default SideBarComponent;
