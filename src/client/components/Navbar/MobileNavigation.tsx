// @ts-nocheck

import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Drawer from "@mui/material/Drawer";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { AiOutlineApartment } from "@react-icons/all-files/ai/AiOutlineApartment";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { KoiSVG, Title, media } from "../utils/styledComponents";
import { links } from "../../../pages";

const newLinks = [
  {
    title: "Home",
    path: "/",
    icon: <AiOutlineHome />,
  },
  ...links,
];
const FooterLinks = [
  {
    title: "Home",
    path: "/",
    icon: <AiOutlineHome />,
  },
  {
    title: "My koi",
    path: "/koi",
  },
  {
    title: "Varieties",
    path: "/varieties",
    icon: <AiOutlineApartment />,
  },
  {
    title: "Menu",
    icon: <AiOutlineMenu />,
  },
];

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: ${(props) => props.theme.secondaryColor} !important;
`;
const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    width: 90%;
  }
`;
const StyledTitle = styled(Title)`
  padding: 1rem;
  font-size: 1.5rem;

  ${media.lg} {
    padding: 1rem 2rem;
  }
`;

const IconContainer = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0rem;
`;

const DrawerLinkContainer = styled.div`
  font-size: 1.3rem;
  color: ${(props) =>
    props.active ? props.theme.secondaryColor : props.theme.textColor};
  background: ${(props) => props.active && "#e7f5fe"};
  border-radius: 10px;
`;
const DrawerIcon = styled.div`
  margin-right: 1rem;
`;
const DrawerText = styled.div`
  font-size: 1rem;
`;
const MenuContainer = styled.div`
  padding: 3px 0;
`;
const ButtonContainer = styled.div`
  padding: 1rem;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 90%;
`;
const Text = styled.span`
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
`;
const Bottom = styled.span`
  padding-top: 3rem;
`;
const StyledKoiIcon = styled.svg`
  margin-bottom: 0.4rem;
  width: 1.1rem;
  height: 1.1rem;
  stroke-width: 120px;
  stroke: ${(props) => props.theme.secondaryColor};
`;
const DrawerKoiIcon = styled.svg`
  margin-bottom: 0.4rem;
  margin-right: 1rem;
  width: 1.3rem;
  height: 1.3rem;
  stroke-width: 120px;
  stroke: ${(props) =>
    props.active ? props.theme.secondaryColor : props.theme.textColor};
`;
const StyledButton = styled(Button)`
  background: #fff;
`;

export const KoiIcon = (props) => <KoiSVG {...props} />;

export default function LabelBottomNavigation() {
  const router = useRouter();
  const [value, setValue] = useState("recents");
  const [drawer, setDrawer] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        {FooterLinks.map(({ title, path, icon }) =>
          path ? (
            <Link key={path} href={path}>
              <StyledBottomNavigationAction
                showLabel
                label={<Text>{title}</Text>}
                value={title}
                icon={
                  icon ? (
                    <IconContainer>{icon}</IconContainer>
                  ) : (
                    <StyledKoiIcon>
                      <KoiIcon />
                    </StyledKoiIcon>
                  )
                }
              />
            </Link>
          ) : (
            <MenuContainer key={title} onClick={() => setDrawer(true)}>
              <StyledBottomNavigationAction
                showLabel
                label={<Text>{title}</Text>}
                value={title}
                icon={
                  icon ? (
                    <IconContainer>{icon}</IconContainer>
                  ) : (
                    <StyledKoiIcon>
                      <KoiIcon />
                    </StyledKoiIcon>
                  )
                }
              />
            </MenuContainer>
          )
        )}
      </BottomNavigation>
      <StyledDrawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
      >
        <div className="cp-c-row cp-c-align-spacebetween-center">
          <StyledTitle>Menu</StyledTitle>
        </div>
        <Divider />

        <div
          className="cp-c-padding-h-3 cp-c-padding-v-3"
          onClick={() => setDrawer(false)}
        >
          {newLinks.map(({ title, path, icon }) => (
            <Link key={path} href={path}>
              <DrawerLinkContainer
                active={router.asPath == path}
                className="cp-c-row cp-c-align-start-center"
              >
                {!icon ? (
                  <>
                    <DrawerKoiIcon active={router.asPath == path}>
                      <KoiIcon />
                    </DrawerKoiIcon>
                    <DrawerText>{title}</DrawerText>
                  </>
                ) : (
                  <>
                    <DrawerIcon>{icon}</DrawerIcon>
                    <DrawerText>{title}</DrawerText>
                  </>
                )}
              </DrawerLinkContainer>
            </Link>
          ))}
        </div>
        <Bottom />
        <ButtonContainer>
          <StyledButton
            fullWidth
            onClick={() => setDrawer(false)}
            variant="outlined"
            size="large"
          >
            Close
          </StyledButton>
        </ButtonContainer>
      </StyledDrawer>
    </Paper>
  );
}
