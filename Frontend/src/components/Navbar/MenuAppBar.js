import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import kjLogo from "../Admin-component/kjsieit-navbar.png";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  profIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navMenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  bStyle:{
    "&:hover": {
      backgroundColor: "#fff",
      color:"#000"
    }
  }
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const auth = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pres_url = window.location.href;
  if (
    pres_url === "http://localhost:3000/cp@2707user" ||
    pres_url ===
      "https://project-management-system-ark.herokuapp.com/cp@2707user"
  ) {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#000" }}>
          <Toolbar>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#000",
                marginRight: "5px"
              }}
            >
              <Button color="inherit" variant="contained">
                <ArrowBackRoundedIcon />
              </Button>
            </Link>
            <Typography variant="h5" className={classes.title}>
              Project Management System
            </Typography>
            {auth && (
              <div className={classes.profIcon}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{ fontSize: 40 }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/cp@2707user"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      Change Password
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/logout"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}
            <Link
              to="/logout"
              className={classes.navMenu}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Button
                color="inherit"
                style={{ marginLeft: "20px" }}
                className={classes.bStyle}
                startIcon={<ExitToAppIcon />}
              >
                Logout
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: "#b01a1a" }}>
          <Toolbar>
            <Typography variant="h5" className={classes.title}>
              Project Management System
            </Typography>
            {auth && (
              <div className={classes.profIcon}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{ fontSize: 40 }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/cp@2707user"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      Change Password
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/logout"
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
            )}
            <Link to="/cp@2707user"
                  className={classes.navMenu}
                  style={{ textDecoration: "none", color: "#fff" }}>
                  <Button
                    color="inherit"
                    startIcon={<AssignmentIndIcon />}
                    className={classes.bStyle}
                  >
                    Change Password
                  </Button>
                </Link>
                <Link
                  to="/logout"
                  className={classes.navMenu}
                  style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    color="inherit"
                    style={{ marginLeft: "20px" }}
                    className={classes.bStyle}
                    startIcon={<ExitToAppIcon />}
                  >
                    Logout
                  </Button>
                </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
