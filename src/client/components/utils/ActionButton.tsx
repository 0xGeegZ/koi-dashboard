import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import toast from "react-hot-toast";
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
const Container = styled.span`
  position: fixed;
  bottom: 0;
  right: 0;
`;

const Tooltip = styled.span`
  white-space: nowrap;
`;
export default function BasicSpeedDial({ actions }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
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
                <DeleteIcon
                  onClick={() => {
                    toast
                      .promise(handleClick(), {
                        loading: `Deleting koi ...`,
                        success: `koi deleted!`,
                        error: (err) => err,
                      })
                      .then(() => {
                        router.push(src);
                      });
                  }}
                >
                  {icon}
                </DeleteIcon>
              }
              tooltipTitle={
                <div
                  onClick={() => {
                    toast
                      .promise(handleClick(), {
                        loading: `Deleting koi ...`,
                        success: `koi deleted!`,
                        error: (err) => err,
                      })
                      .then(() => {
                        router.push(src);
                      });
                  }}
                >
                  <DeleteText>{title}</DeleteText>
                </div>
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
    </Container>
  );
}
