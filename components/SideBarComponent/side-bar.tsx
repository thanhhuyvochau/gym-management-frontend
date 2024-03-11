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
import { usePathname } from 'next/navigation';

const desktopIcons = [
  <SpaceDashboardOutlinedIcon style={{ color: 'white' }} key={1} />,
  <OtherHousesOutlinedIcon style={{ color: 'white' }} key={2} />,
  <AppRegistrationOutlinedIcon style={{ color: 'white' }} key={3} />,
  <AssignmentSharpIcon style={{ color: 'white' }} key={4} />,
  <PaymentOutlinedIcon style={{ color: 'white' }} key={5} />,
  <Inventory2OutlinedIcon style={{ color: 'white' }} key={6} />,
  <PeopleOutlinedIcon style={{ color: 'white' }} key={7} />,
  <AssessmentOutlinedIcon style={{ color: 'white' }} key={8} />,
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
    link: '/dashboard',
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
    link: '/dashboard/register-member',
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
  {
    label: 'Attendance',
    icon: desktopIcons[7],
    forRole: [GYM_OWNER], // Adjust roles as needed
    link: '/dashboard/attendance',
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

  const pathname = usePathname();

  return (
    <List>
      {generateSideBarByRole().map((item, index) => (
        <ListItem
          style={{ width: '100%', display: 'block' }}
          key={item.link}
          disablePadding
          selected={item.link === pathname}
          onClick={() => setSelectedNavItem(index)}
          sx={styles}
        >
          <Link
            style={{
              background: '#ffffff',
              textDecoration: 'none',
              color: item.link === pathname ? 'var(--primary)' : 'white',
            }}
            href={item.link}
          >
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
