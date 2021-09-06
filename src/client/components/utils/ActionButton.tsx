import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import SpeedDial from "@material-ui/core/SpeedDial";
import SpeedDialIcon from "@material-ui/core/SpeedDialIcon";
import SpeedDialAction from "@material-ui/core/SpeedDialAction";
import Backdrop from "@material-ui/core/Backdrop";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";

const withLink = (to, children) => <Link href={to}>{children}</Link>;

const actions = [
  {
    icon: withLink("/koi/create", <AiOutlinePlus />),
    name: "Create koi",
    src: "/koi/create",
  },
];

const Tooltip = styled.span`
  white-space: nowrap;
`;
export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: "absolute", bottom: 64, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(({ src, name, icon }) => (
          <SpeedDialAction
            key={name}
            icon={icon}
            tooltipTitle={
              <Link href={src}>
                <Tooltip>{name}</Tooltip>
              </Link>
            }
            tooltipOpen
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </>
  );
}
