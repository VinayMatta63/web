import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainLogo } from "components";
import { getDeviceType } from "helpers";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer, IconButton } from "@material-ui/core";
import DrawerStructure from "./drawer";
import { useHistory } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useStateValue } from "helpers/StateProvider";
import axios from "../../../helpers/axios";
import Alerts from "./Alerts";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);
  const [login, setLogin] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   axios.get("/api/").then((res) =>
  //     dispatch({
  //       type: "SET_EVENTS",
  //       events: {
  //         id: res.data.id,
  //         title: res.data.title,
  //         desc: res.data.desc,
  //         start: res.data.start,
  //         venue: res.data.venue,
  //         url: res.data.url,
  //       },
  //     })
  //   );
  //   // .catch((e) => alert(e));
  // }, [dispatch]);
  useEffect(() => {
    axios
      .get("api/users/isLogedIn")
      .then((res) => res.json())
      .then((parJson) => {
        if (parJson.email) {
          dispatch({
            type: "SET_USER",
            user: { email: parJson.email, name: parJson.firstName },
          });
        } else if (parJson.error) {
          alert("error occured");
        }
      });
  }, [dispatch]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setAlertOpen(true);
    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  }, [user]);

  useEffect(() => {
    setAlertOpen(false);
  }, []);

  const handleOpenLogin = () => {
    if (user) {
      dispatch({
        type: "SET_USER",
        user: null,
      });
      localStorage.removeItem("token");
    } else {
      setLogin(true);
    }
  };

  const handleCloseLogin = () => {
    setLogin(false);
  };
  const handleChange = (type) => {
    setOpen(false);
    switch (type) {
      case "home":
        history.push("/home");
        if (process.browser) {
          window.scrollTo(0, 0);
        }
        break;
      case "events":
        history.push("/events");
        if (process.browser) {
          window.scrollTo(0, 0);
        }
        break;
      case "team":
        history.push("/team");
        if (process.browser) {
          window.scrollTo(0, 0);
        }
        break;
      case "blogs":
        history.push("/blogs");
        if (process.browser) {
          window.scrollTo(0, 0);
        }
        break;
      case "faq":
        history.push("/faq");
        if (process.browser) {
          window.scrollTo(0, 0);
        }
        break;
      default:
        break;
    }
  };

  return (
    <Main>
      <Container>
        {user ? (
          <Alerts
            setAlertOpen={setAlertOpen}
            alertOpen={alertOpen}
            type="success"
            title="Welcome to IIC"
            body={`Logged in as - ${user.firstName} ${user.lastName}`}
          />
        ) : (
          <Alerts
            setAlertOpen={setAlertOpen}
            alertOpen={alertOpen}
            type="info"
            title="Thanks for Visiting"
            body="Successfully logged out."
          />
        )}
        <MainLogo />
        <Name onClick={() => handleChange("home")}>
          Institute Innovation Cell
        </Name>
      </Container>
      <Nav>
        <NavItem onClick={() => handleChange("home")}>Home</NavItem>
        <NavItem onClick={() => handleChange("events")}>Events</NavItem>
        <NavItem onClick={() => handleChange("blogs")}>Blogs</NavItem>
        <NavItem onClick={() => handleChange("faq")}>FAQ's</NavItem>
        <NavItem onClick={() => handleChange("team")}>Our Team</NavItem>
        <NavButton onClick={handleOpenLogin}>
          {user ? "Logout" : "Login"}
        </NavButton>
      </Nav>
      <LoginModal
        login={login}
        handleCloseLogin={handleCloseLogin}
        setAlertOpen={setAlertOpen}
      />
      <DrawerIcon>
        <IconButton>
          <MenuIcon style={{ color: "#fafafa" }} onClick={toggleDrawer} />
        </IconButton>
      </DrawerIcon>
      <Drawer anchor={"bottom"} open={open} onClose={toggleDrawer}>
        <DrawerStructure
          handleOpenLogin={handleOpenLogin}
          login={login}
          handleCloseLogin={handleCloseLogin}
          handleChange={handleChange}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>
    </Main>
  );
};

export default Header;

const Main = styled.div`
  width: 100%;
  position: fixed;
  z-index: 101;
  background-color: #040016;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fafafa;
  border-bottom: 1px solid #0e95d4;
`;
const Name = styled.h1`
  display: flex;
  align-items: center;
  font-size: ${getDeviceType() === "mobile" ? "16px" : "22px"};
  margin-left: 20px;
  cursor: pointer;
`;
const DrawerIcon = styled.span`
  display: ${getDeviceType() === "desktop" ? "none" : ""};
`;
const Container = styled.div`
  display: flex;
  margin-left: 30px;
  flex: 0.5;
`;
const Nav = styled.div`
  display: ${getDeviceType() === "desktop" ? "flex" : "none"};
  justify-content: space-evenly;
  flex: 1;
`;
const NavItem = styled.span`
  height: ${getDeviceType() === "desktop" ? "65px" : "40px"};
  padding: ${getDeviceType() === "desktop" ? "0 20px" : "0"};
  display: flex;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  align-items: center;
  :hover {
    background-color: ${getDeviceType() === "desktop" ? "#0e95d4" : ""};
  }
`;
const NavButton = styled.button`
  height: 35px;
  cursor: pointer;
  margin: auto 0;
  background-color: #0e95d4;
  border: 1px solid #0e95d4;
  border-radius: 20px;
  color: #fafafa;
  font-weight: 700;
  padding: 5px 10px;
  transition: 0.35s;
  :hover {
    transition: 0.4s;
    background-color: #fafafa;
    color: #0e95d4;
  }
`;
