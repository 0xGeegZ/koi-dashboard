import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";

const DeleteText = styled.span`
  color: ${(props) => props.theme.redColor};
`;
const DeleteIcon = styled.span`
  color: ${(props) => props.theme.redColor};
  margin-top: 0.2rem;
`;

const Tooltip = styled.span`
  white-space: nowrap;
`;
export default function BasicSpeedDial({ actions }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 72, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(({ src, title, icon, handleClick }) =>
          title == "Delete" ? (
            <SpeedDialAction
              key={title}
              icon={
                <Link href={src}>
                  <DeleteIcon onClick={() => handleClick()}>{icon}</DeleteIcon>
                </Link>
              }
              tooltipTitle={
                <Link href={src}>
                  <div onClick={() => handleClick()}>
                    <DeleteText>{title}</DeleteText>
                  </div>
                </Link>
              }
              tooltipOpen
              onClick={handleClose}
            />
          ) : (
            <SpeedDialAction
              key={title}
              icon={icon}
              tooltipTitle={
                <Link href={src}>
                  <Tooltip>{title}</Tooltip>
                </Link>
              }
              tooltipOpen
              onClick={handleClose}
            />
          )
        )}
      </SpeedDial>
    </>
  );
}
