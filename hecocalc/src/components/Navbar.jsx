import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import { Drawer, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import "../css/navbar.css";
import LogoutIcon from "@mui/icons-material/Logout";
//import Settings from '@mui/icons-material/Settings';
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { useNavigate } from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";
//import Link from '@mui/material';

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const router = (route) => {
    navigate(route);
  };

  // const [component, setComponent] = useState(false);

  // const openPage = () => {
  //   setComponent(true);
  // };

  // const closePage = () => {
  //   setComponent(false);
  // };

  const list = () => (
    <div style={{ width: 250 }}>
      <List>
        <div className="MainMenu">Main Menu</div>
        <Divider />
        {["Dashboard"].map((label, index) => (
          <ListItem
            key={index}
            onClick={() => router("/dashboard")}
            className="nav-item"
          >
            <ListItemIcon>
              <TaskAltIcon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        {["Decision Tree"].map((label, index) => (
          <ListItem
            key={index}
            onClick={() => router("/input-page")}
            className="nav-item"
          >
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        {["Snapshots"].map((label, index) => (
          <ListItem
            key={index}
            onClick={() => router("/snapshots")}
            className="nav-item"
          >
            <ListItemIcon>
              <CameraEnhanceIcon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
        {["Settings"].map((label, index) => (
          <ListItem
            key={index}
            onClick={() => router("/settings")}
            className="nav-item"
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}

        <div className="footer">
          {["Log Out"].map((label, index) => (
            <ListItem
              key={index}
              onClick={() => router("/")}
              className="nav-item"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </div>
      </List>
    </div>
  );

  return (
    <div className="navbar-container" style={{ zIndex: 10 }}>
      <div className="setting" onClick={() => setOpen(true)}>
        <DensityMediumIcon />
      </div>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        {list()}
      </Drawer>
      {/* <div className='name'>Settings</div>

            <button className='button1' onClick={openPage} > Respository </button>
            <button className='button2'> Decision Tree </button>
            <button className='button3'> Input Data </button>

            {component && (
                <div>
                    <div className='heading'>Select the Repository you want HecoCalc to use:</div>
                    <textarea className='enter' rows={1}></textarea>
                    <button className='repobutton'>Select Repository</button>
                    <button className='but' onClick={closePage}>Close Repository Page </button>
                </div>
            )} */}
    </div>
  );
}

export default Navbar;
