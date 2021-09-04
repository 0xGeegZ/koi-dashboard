import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemButton from "@material-ui/core/ListItemButton";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { links, KoiIcon } from "../../../pages/app";

const StyledBox = styled(Box)`
  min-height: 100vh;
  background-color: unset !important;
  padding: 0 !important;
`;
const IconContainer = styled.div`
  font-size: 1rem;
  margin-right: 1rem;
`;
const StyledKoiIcon = styled.svg`
  width: 1rem;
  height: 1rem;
  stroke-width: 100px;
  stroke: ${(props) => props.theme.textColorDark};
  margin-right: 1rem;
`;
const Text = styled.div`
  color: ${(props) => props.theme.textColorDark};
  line-height: 1rem;
`;

const drawerWidth = 180;

export default function PermanentDrawerLeft({ children }) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
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
          <ListItemButton
            selected={router.pathname === "/app"}
            component="a"
            href="/app"
          >
            <Text className="cp-c-row cp-c-align-start-center">
              <IconContainer>
                <AiOutlineHome />
              </IconContainer>
              <ListItemText primary="Home" />
            </Text>
          </ListItemButton>
          {links.map(({ title, path, icon }) => (
            <ListItemButton
              component="a"
              href={path}
              key={title}
              selected={router.pathname === path}
            >
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
          ))}
          <Divider />
          <ListItemButton component="a" href="/api/auth/logout">
            <Text className="cp-c-row cp-c-align-start-center">
              <IconContainer>
                <AiOutlineLogout />
              </IconContainer>
              <ListItemText primary="Logout" />
            </Text>
          </ListItemButton>
        </List>
      </Drawer>
      <StyledBox
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <div>{children}</div>
      </StyledBox>
    </Box>
  );
}
