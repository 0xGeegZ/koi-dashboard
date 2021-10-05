import { SyntheticEvent, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { KoiSVG } from "../utils/styledComponents";

export const links = [
  {
    title: "Home",
    path: "/",
    icon: <AiOutlineHome />,
  },
  {
    title: "All koi",
    path: "/koi",
  },
  {
    title: "Add koi",
    path: "/koi/create",
    icon: <AiOutlinePlus />,
  },
  {
    title: "Settings",
    path: "/app/settings",
    icon: <AiOutlineUser />,
  },
];

const StyledBottomNavigationAction = styled(BottomNavigationAction)`
  color: ${(props) => props.theme.secondaryColor} !important;
`;

const IconContainer = styled.div`
  font-size: 1.1rem;
  margin-bottom: 0rem;
`;
const Text = styled.span`
  font-size: 0.9rem;
  padding-bottom: 0.5rem;
`;
const StyledKoiIcon = styled.svg`
  margin-bottom: 0.4rem;
  width: 1.1rem;
  height: 1.1rem;
  stroke-width: 120px;
  stroke: ${(props) => props.theme.secondaryColor};
`;

export const KoiIcon = (props) => <KoiSVG {...props} />;

export default function LabelBottomNavigation() {
  const [value, setValue] = useState("recents");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange}>
        {links.map(({ title, path, icon }) => (
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
        ))}
      </BottomNavigation>
    </Paper>
  );
}
