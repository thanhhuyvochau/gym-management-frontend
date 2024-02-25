"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Grid from "@mui/material/Grid/Grid";
import { log } from "console";

interface NavItem {
  name: string;
  navLink: () => any;
}

// const pages = ["About", "Why Join Us?", "Plan", "Login", "Logout"];

const pages: NavItem[] = [
  { name: "About", navLink: () => "/about" },
  { name: "Why Join Us?", navLink: () => "/why-join-us" },
  { name: "Plan", navLink: () => "/plan" },
  { name: "Login", navLink: () => "/login" },
  {
    name: "Dashboard",
    navLink: () => "/daskboard",
  },
  {
    name: "Logout",
    navLink: () => signOut({ redirect: true, callbackUrl: "/home" }),
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export function HomeReponsiveAppBar() {
  const { data: session } = useSession();
  // const session = getCustomSession();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    // signIn("credential");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar color="default" position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href={"/home"}>
            <Avatar
              sx={{
                display: { xs: "none", md: "flex" },
                width: "80px",
                height: "80px",
                objectFit: "contain",
              }}
              alt="Remy Sharp"
              src="/images/nav-logo.svg"
            />
          </Link>

          <Grid width="fit-content" container direction="column">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: "600",
                letterSpacing: ".3rem",
                color: "var(--main-font-color)",
                textDecoration: "none",
              }}
            >
              STAMINA
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: "600",
                letterSpacing: ".3rem",
                color: "var(--main-font-color)",
                textDecoration: "none",
              }}
            >
              FITNESS
            </Typography>
          </Grid>

          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => {
              if (page.name == "Logout") {
                let logoutButton;
                if (session != undefined) {
                  logoutButton = (
                    <Button
                      key={page.name}
                      onClick={page.navLink}
                      style={{
                        color: "var(--main-font-color)",
                        display: "block",
                      }}
                    >
                      {page.name}
                    </Button>
                  );
                  return logoutButton;
                } else {
                  return;
                }
              } else if (page.name == "Login") {
                let logInButton;
                if (session == undefined) {
                  return (logInButton = (
                    <Button
                      key={page.name}
                      onClick={page.navLink}
                      style={{
                        color: "var(--main-font-color)",
                        display: "block",
                      }}
                    >
                      {page.name}
                    </Button>
                  ));
                } else {
                  return;
                }
              } else if (page.name == "Dashboard") {
                if (session != undefined) {
                  return (
                    <Button key={page.name}>
                      <Link
                        href={page.navLink()}
                        key={page.name}
                        style={{
                          color: "var(--main-font-color)",
                          display: "block",
                        }}
                      >
                        {page.name}
                      </Link>
                    </Button>
                  );
                }
              } else {
                return (
                  <Button key={page.name}>
                    <Link
                      href={page.navLink()}
                      key={page.name}
                      style={{
                        color: "var(--main-font-color)",
                        display: "block",
                      }}
                    >
                      {page.name}
                    </Link>
                  </Button>
                );
              }
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box component={"div"}>
        <HomeReponsiveAppBar></HomeReponsiveAppBar>
        <Box style={{}} component={"div"}>
          {children}
        </Box>
      </Box>
    </>
  );
}
