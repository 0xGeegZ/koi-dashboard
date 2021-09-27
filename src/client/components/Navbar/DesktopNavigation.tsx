import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { links, KoiIcon } from "../../../pages/app";

const StyledBox = styled(Box)`
  background-color: unset !important;
  padding: 0 !important;
`;
const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root {
    border-right: 0;
    box-shadow: 0 12px 15px -4px rgba(31, 73, 125, 0.2),
      0 -12px 8px -4px rgba(31, 73, 125, 0.8);
  }
`;
const IconContainer = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;
const StyledKoiIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke-width: 100px;
  stroke: ${(props) => props.theme.secondaryColor};
  margin-right: 1rem;
`;
const Text = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  line-height: 1rem;
`;

const drawerWidth = 180;

export default function PermanentDrawerLeft({ children }) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <StyledDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open={true}
        variant="permanent"
        anchor="left"
      >
        <List>
          <Link href="/app">
            <ListItemButton selected={router.pathname === "/app"}>
              <Text className="cp-c-row cp-c-align-start-center">
                <IconContainer>
                  <AiOutlineHome />
                </IconContainer>
                <ListItemText primary="Home" />
              </Text>
            </ListItemButton>
          </Link>
          {links.map(({ title, path, icon }) => (
            <Link key={title} href={path}>
              <ListItemButton selected={router.pathname === path}>
                <Text className="cp-c-row cp-c-align-start-center">
                  {icon ? (
                    <IconContainer>{icon}</IconContainer>
                  ) : (
                    <StyledKoiIcon>
                      <KoiIcon />
                    </StyledKoiIcon>
                  )}
                  <ListItemText primary={title} />
                </Text>
              </ListItemButton>
            </Link>
          ))}
          <Divider />
          <Link href="/api/auth/logout">
            <ListItemButton>
              <Text className="cp-c-row cp-c-align-start-center">
                <IconContainer>
                  <AiOutlineLogout />
                </IconContainer>
                <ListItemText primary="Logout" />
              </Text>
            </ListItemButton>
          </Link>
        </List>
      </StyledDrawer>
      <StyledBox
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div>{children}</div>
      </StyledBox>
    </Box>
  );
}
