import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import { Link } from "react-router-dom";
import { ItemsCont } from "./style";
const BASEURL = "https://api-camping.isabek.uz/api/v1/";
export default function Sidebar() {
  const [allUsersData, setAllUsersData] = React.useState([]);
  const [allMotorsData, setAllMotorsData] = React.useState([]);
  const [allCaravanData, setAllCaravanData] = React.useState([]);
  const [allTuningData, setAllTuningData] = React.useState([]);
  const [allUsedCarData, setAllUsedCarData] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0); // State to store the total
  const [totalMotors, setTotalMotors] = React.useState(0); // State to store the total
  const [totalCaravan, setTotalCaravan] = React.useState(0); // State to store the total
  const [totalTuning, setTotalTuning] = React.useState(0); // State to store the total
  const [totalUsedCar, setTotalUsedCar] = React.useState(0); // State to store the total

  //To get ALL Motors DATA from Server
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}motors/getAllMotors`);
        const motors = await response.json();
        setAllMotorsData(motors.data);
      } catch (error) {
        console.log("Motor data is not found", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalMotors(allMotorsData.length);
  }, [allMotorsData]);
  //To get ALL  caravan DATA from Server
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}caravan/getAllCaravan`);
        const caravan = await response.json();
        setAllCaravanData(caravan.data);
      } catch (error) {
        console.log("Caravan data is not found", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    // Calculate total caravan after data is fetched
    setTotalCaravan(allCaravanData.length);
  }, [allCaravanData]);

  //to get All Users Data
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}auth/getAllUsers`);
        const users = await response.json();
        setAllUsersData(users.data);
      } catch (error) {
        console.log("Users  data is wrong:", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalUsers(allUsersData.length);
  }, [allUsersData]);

  //To get ALL Tuning DATA from Server
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}tuning/getAllTuning`);
        const tuning = await response.json();
        setAllTuningData(tuning.data);
      } catch (error) {
        console.log("Tuning data is not found", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalTuning(allTuningData.length);
  }, [allTuningData]);

  //To get ALL DATA from Server
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASEURL}usedCar/getAllUsedCar`);
        const usedCar = await response.json();
        setAllUsedCarData(usedCar.data);
      } catch (error) {
        console.log("Used car data is not found", error);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    // Calculate total users after data is fetched
    setTotalUsedCar(allUsedCarData.length);
  }, [allUsedCarData]);

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="motors" style={{ textDecoration: "none", color: "#006DAB" }}>
          <ListItemButton>Motor</ListItemButton>
        </Link>
        <Link to="caravan" style={{ textDecoration: "none", color: "#006DAB" }}>
          <ListItemButton>Caravan</ListItemButton>
        </Link>
        <Link to="tuning" style={{ textDecoration: "none", color: "#006DAB" }}>
          <ListItemButton>Tuning</ListItemButton>
        </Link>
        <Link to="usedCar" style={{ textDecoration: "none", color: "#006DAB" }}>
          <ListItemButton>Used Car</ListItemButton>
        </Link>
        <Link to="auth" style={{ textDecoration: "none", color: "#006DAB" }}>
          <ListItemButton>Users</ListItemButton>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "70px",
          width: "100%",
          background:
            "linear-gradient(-48.33deg, rgb(0, 55, 94) 1.127%,rgb(55, 95, 238) 64.563%,rgb(94, 129, 255) 100%)",
        }}
      >
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              style={{ background: "#fff", gap: "10px" }}
              onClick={toggleDrawer(anchor, true)}
            >
              <ListRoundedIcon /> Items
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
        <h1 style={{ color: "#fff" }}>Camper Admin</h1>
      </div>
      <ItemsCont>
        <div>
          <h1>Motors</h1>
          <p>{totalMotors}</p>
        </div>
        <div>
          <h1>Caravan</h1>
          <p>{totalCaravan}</p>
        </div>
        <div>
          <h1>Tuning</h1>
          <p>{totalTuning}</p>
        </div>
        <div>
          <h1>Used Car</h1>
          <p>{totalUsedCar}</p>
        </div>
        <div>
          <h1>Registrated Users</h1>
          <p>{totalUsers}</p>
        </div>
      </ItemsCont>
    </div>
  );
}
